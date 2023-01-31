import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/loaders/3DMLoader.js'
import rhino3dm from 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js'

// set up loader for converting the results to threejs
const loader = new Rhino3dmLoader()
loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/')

// initialise 'data' object that will be used by compute()
const data = {
  definition: 'enochtest.gh',
  inputs: getInputs(),

  key: document.getElementById('rhino-render').getAttribute('data-key'),

}
console.log(data)

// setup upload change events
const upload = document.getElementById('upload')

upload.addEventListener('change', function () {
  if (this.files && this.files[0]) {
    showSpinner(true)
    const file = this.files[0]
    data.inputs.extension = file.name.substring(file.name.lastIndexOf('.'))
    data.fileName = file.name.substring(0, file.name.lastIndexOf('.'))

    const reader = new FileReader()

    reader.readAsArrayBuffer(file)

    reader.addEventListener('load', function (e) {
      const buffer = new Uint8Array(e.target.result)
      const b64ba = arrayBufferToBase64(buffer)
      data.inputs.encodedFile = b64ba
      console.log('EventListener')
      compute()
    })
  }
})

// globals
let rhino, doc
rhino3dm().then(async (m) => {
  console.log('Loaded rhino3dm.')
  rhino = m // global

  // enable download button
  upload.disabled = false
  //upload.hidden = true

  init()
})

const downloadButton = document.getElementById('downloadButton')
downloadButton.onclick = download

/////////////////////////////////////////////////////////////////////////////
//                            HELPER  FUNCTIONS                            //
/////////////////////////////////////////////////////////////////////////////

/**
 * Gets <input> elements from html and sets handlers
 * (html is generated from the grasshopper definition)
 */
 function getInputs() {
  const inputs = {}
  for (const input of document.getElementsByTagName('input')) {
    if (input.classList.contains('tabs__tab__button')) continue
    switch (input.type) {
      case 'number':
        inputs[input.id] = input.valueAsNumber
        input.onchange = onSliderChange
        break
      case 'range':
        inputs[input.id] = input.valueAsNumber
        // input.onmouseup = onSliderChange
        // input.ontouchend = onSliderChange
        input.onchange = onSliderChange
        break
      case 'checkbox':
        inputs[input.id] = input.checked
        input.onclick = onSliderChange
        break
      default:
        break
    }
  }
  console.log('get inputs'+ inputs )
  return inputs
}

// more globals
let scene, camera, renderer, controls

/**
 * Sets up the scene, camera, renderer, lights and controls and starts the animation
 */
function init() {
  let container = document.getElementById('container')

  // Rhino models are z-up, so set this as the default
  THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1)

  // create a scene and a camera
  scene = new THREE.Scene()
  scene.background = new THREE.Color(1, 1, 1)
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    1,
    1000
  )
  camera.position.set(1, -1, 1) // like perspective view

  // very light grey for background, like rhino
  scene.background = new THREE.Color('whitesmoke')

  // create the renderer and add it to the html
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(container.devicePixelRatio)
  renderer.setSize(container.clientWidth, container.clientHeight)
  document.getElementById('container').appendChild(renderer.domElement)

  // add some controls to orbit the camera
  controls = new OrbitControls(camera, renderer.domElement)

  // add a directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.intensity = 1
  scene.add(directionalLight)

  const ambientLight = new THREE.AmbientLight()
  ambientLight.intensity = 6
  scene.add(ambientLight)

  // // //grid
  // const gridHelper = new THREE.GridHelper( 400, 40 );
  // gridHelper.rotation.x = Math.PI/2;
  // gridHelper.position.x = 200;

  // scene.add( gridHelper )


  // handle changes in the window size
  window.addEventListener('resize', onWindowResize, false)

  // Toggle full screen on 3d render container
  document
    .getElementById('toggle-full-screen')
    .addEventListener('click', function () {
      let screen = document.getElementById('rhino-render')
      if (screen.classList.contains('full-screen')) {
        screen.classList.remove('full-screen')
      } else {
        screen.classList.add('full-screen')
      }
      onWindowResize()
    })

  animate()
}

/**
 * Call appserver
 */
async function compute(zoom) {
  console.log('start function compute')

  console.log(data)

  // use POST request
  const request = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  }

  try {
    const response = await fetch(
      'https://testhenningtest.herokuapp.com/solve',
      request
    )

    if (!response.ok) {
      // TODO: check for errors in response json
      throw new Error(response.statusText)
    }

    const responseJson = await response.json()

    collectResults(responseJson, zoom)
  } catch (error) {
    console.error(error)
  }
  console.log('end compute' )
}

/**
 * Parse response
 * @param {object} responseJson
 * @param {boolean} zoom
 */
function collectResults(responseJson, zoom = true) {
  const values = responseJson.values

  // clear doc
  if (doc !== undefined) doc.delete()

  //console.log(values)
  doc = new rhino.File3dm()

  // for each output (RH_OUT:*)...
  for (let i = 0; i < values.length; i++) {
    // ...iterate through data tree structure...
    for (const path in values[i].InnerTree) {
      const branch = values[i].InnerTree[path]
      // ...and for each branch...
      for (let j = 0; j < branch.length; j++) {
        // //for specific output
        //if (values[i].ParamName === "RH_OUT:mesh") {
        //console.log("RH_Output exists");

        // ...load rhino geometry into doc
        const rhinoObject = decodeItem(branch[j])
        if (rhinoObject !== null) {
          doc.objects().add(rhinoObject, null)
        }
      }
    }
  }

  if (doc.objects().count < 1) {
    console.error('No rhino objects to load!')
    showSpinner(false)
    return
  }

  // load rhino doc into three.js scene
  const buffer = new Uint8Array(doc.toByteArray()).buffer
  loader.parse(buffer, function (object) {
    // debug
    /*
        object.traverse(child => {
          if (child.material !== undefined)
            child.material = new THREE.MeshNormalMaterial()
        }, false)
        */

    // clear objects from scene. do this here to avoid blink
    scene.traverse((child) => {
      if (!child.isLight) {
        scene.remove(child)
      }
    })

    // add object graph from rhino model to three.js scene
    scene.add(object)

    // hide spinner and enable download button
    showSpinner(false)
    downloadButton.disabled = false

    // zoom to extents
    if (zoom) {
      zoomCameraToSelection(camera, controls, scene.children)
    }



  })
}

/**
 * Attempt to decode data tree item to rhino geometry
 */
function decodeItem(item) {
  const data = JSON.parse(item.data)
  if (item.type === 'System.String') {
    // hack for draco meshes
    try {
      return rhino.DracoCompression.decompressBase64String(data)
    } catch {} // ignore errors (maybe the string was just a string...)
  } else if (typeof data === 'object') {
    return rhino.CommonObject.decode(data)
  }
  return null
}

/**
 * Called when a slider value changes in the UI. Collect all of the
 * slider values and call compute to solve for a new scene
 */
function onSliderChange() {
  showSpinner(true)
  // get slider values
  let inputs = {}
  for (const input of document.getElementsByTagName('input')) {
    if (input.classList.contains('tabs__tab__button')) continue
    switch (input.type) {
      case 'number':
        inputs[input.id] = input.valueAsNumber
        break
      case 'range':
        inputs[input.id] = input.valueAsNumber
        break
      case 'checkbox':
        inputs[input.id] = input.checked
        break
    }
  }

  data.inputs = inputs

  console.log('onSliderChange')
  compute(false)
}

/**
 * The animation loop!
 */
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

/**
 * Helper function for window resizes (resets the camera pov and renderer size)
 */
function onWindowResize() {
  let container = document.getElementById('container')
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  animate()
}

/**
 * Helper function that behaves like rhino's "zoom to selection", but for three.js!
 */
function zoomCameraToSelection(camera, controls, selection, fitOffset = 1.2) {
  const box = new THREE.Box3()

  for (const object of selection) {
    if (object.isLight) continue
    box.expandByObject(object)
  }

  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  const maxSize = Math.max(size.x, size.y, size.z)
  const fitHeightDistance =
    maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360))
  const fitWidthDistance = fitHeightDistance / camera.aspect
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance)

  const direction = controls.target
    .clone()
    .sub(camera.position)
    .normalize()
    .multiplyScalar(distance)
  controls.maxDistance = distance * 10
  controls.target.copy(center)

  camera.near = distance / 100
  camera.far = distance * 100
  camera.updateProjectionMatrix()
  camera.position.copy(controls.target).sub(direction)

  controls.update()
  console.log('zoomSelection' )
}

/**
 * This function is called when the download button is clicked
 */
 function download() {
  // write rhino doc to "blob"
  const bytes = doc.toByteArray()
  const blob = new Blob([bytes], { type: 'application/octect-stream' })

  // use "hidden link" trick to get the browser to download the blob
  const filename = data.definition.replace(/\.gh$/, '') + '.3dm'
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()
}


/**
 * Shows or hides the loading spinner
 */
function showSpinner(enable) {
  if (enable) document.getElementById('loader').style.display = 'block'
  else document.getElementById('loader').style.display = 'none'
}

function arrayBufferToBase64(buffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}
