import React from 'react';
import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader.js'
import axios from "axios";



const Page = () => {
    const loader = new Rhino3dmLoader()
    loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/')
    const data = {}
    let scene, camera, renderer, controls
    let rhino, doc

    const getInputs = () => {
        const inputs = {}
        for (const input of $('input')) {
            if (input.classList.contains('tabs__tab__button')) continue
            switch (input.type) {
                case 'number':
                    inputs[input.id] = input.valueAsNumber
                    input.onChange = onSliderChange
                    break
                case 'range':
                    inputs[input.id] = input.valueAsNumber
                    // input.onmouseup = onSliderChange
                    // input.ontouchend = onSliderChange
                    input.onChange = onSliderChange
                    break
                case 'checkbox':
                    inputs[input.id] = input.checked
                    input.onClick = onSliderChange
                    break
                default:
                    break
            }
        }
        console.log('get inputs' + inputs)
        return inputs
    }

    const onSliderChange = () => {
        showSpinner(true)
        // get slider values
        let inputs = {}
        for (const input of $('input')) {
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

        data.inputs = inputs;
        compute(false)
    }

    const uploadFile = (e) => {
        console.log(e.target.files);
        if (e.target.files && e.target.files[0]) {
            showSpinner(true)
            const file = e.target.files[0]
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
    }

    const download = () => {
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

    function arrayBufferToBase64(buffer) {
        var binary = ''
        var bytes = new Uint8Array(buffer)
        var len = bytes.byteLength
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return window.btoa(binary)
    }

    function showSpinner(enable) {
        console.log($("#loader")[0].style)
        if (enable) $('#loader')[0].style.display = 'block'
        else $('#loader')[0].style.display = 'none'
    }


    async function compute(zoom) {
        console.log('start function compute')

        try {
            
            const headers = {
                "Content-Type": "application/json",
            }
            const url = "http://localhost:9001/solve";
            console.log(data);
            const response = await axios.post(url, data, { headers: headers })

            console.log(response)

            const responseJson = await response.json()

            collectResults(responseJson, zoom)
        } catch (error) {
            console.error(error)
        }
        console.log('end compute')
    }

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

    function decodeItem(item) {
        const data = JSON.parse(item.data)
        if (item.type === 'System.String') {
            // hack for draco meshes
            try {
                return rhino.DracoCompression.decompressBase64String(data)
            } catch { } // ignore errors (maybe the string was just a string...)
        } else if (typeof data === 'object') {
            return rhino.CommonObject.decode(data)
        }
        return null
    }

    function init() {
        let container = $('#container')

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

    function onWindowResize() {
        let container = document.getElementById('container')
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
        animate()
    }

    function animate() {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
    }

    useEffect(() => {
        data = {
            definition: 'updown.gh',
            inputs: getInputs(),
            key: $("#rhino-render").data('key')
        }

        console.log(data)
        rhino3dm().then(async (m) => {
            console.log('Loaded rhino3dm.')
            rhino = m // global

            // enable download button
            upload.disabled = false
            //upload.hidden = true

            init()
        })
    }, [])

    return (

        <main id="gh-main" className="gh-main">
            <article className="gh-article">
            </article>


            {/* {access&& */}
            <section className="gh-content gh-canvas">
                <div className="rhino-section" id="rhino-render" data-key="RhdDYr!J36oX*A">
                    <div id="loader"></div>
                    <div id="container">
                        <button id="toggle-full-screen" className="toggle-screen">
                            <span className="toggle-screen__maximize">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                            </span>
                            <span className="toggle-screen__minimize not-active">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                            </span>
                        </button>

                        <div id="overlay" className="tabs">
                            <div className="tabs__button tabs__button--upload">
                                <label for="upload">
                                    <span>
                                        Upload
                                    </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                    </span>
                                </label>
                                <input type="file" accept=".stl, .obj, .fbx" id="upload" onChange={uploadFile} />
                            </div>

                            <div className="tabs__tab">
                                <label for="tab1">Scan</label>
                                <input className="tabs__tab__button" type="checkbox" name="tabs" id="tab1" />
                                <div className="tabs__tab__content">
                                    <div className="tabs__tab__content__inner">
                                        <div className="rhino-controls__inputs">
                                            <div className="rhino-controls__inputs__row">
                                                <label for="slider1">slider1</label>
                                                <div className="range-wrap">
                                                    <input type="range" id="slider1" min="0" max="10" value="5" step="1" className="range" />
                                                    <output className="bubble"></output>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tabs__tab">
                                <label for="tab2">Shape</label>
                                <input className="tabs__tab__button" type="checkbox" name="tabs" id="tab2" />
                                <div className="tabs__tab__content">
                                    <div className="tabs__tab__content__inner">
                                        <div className="rhino-controls__inputs">
                                            <div className="rhino-controls__inputs__row">
                                                <label for="slider2">slider2</label>
                                                <div className="range-wrap">
                                                    <input type="range" id="slider2" min="0" max="10" value="5" step="0.1" className="range" />
                                                    <output className="bubble"></output>
                                                </div>
                                            </div>
                                            <div className="rhino-controls__inputs__row">
                                                <label for="slider3">slider3</label>
                                                <div className="range-wrap">
                                                    <input type="range" id="slider3" min="0" max="10" value="5" step="1" className="range" />
                                                    <output className="bubble"></output>
                                                </div>
                                            </div>
                                            <div className="rhino-controls__inputs__row">
                                                <label for="slider4">slider4</label>
                                                <div className="range-wrap">
                                                    <input type="range" id="slider4" min="0" max="10" value="5" step="0.1" className="range" />
                                                    <output className="bubble"></output>
                                                </div>
                                            </div>
                                            <div className="rhino-controls__inputs__row">
                                                <label for="slider5">slider5</label>
                                                <div className="range-wrap">
                                                    <input type="range" id="slider5" min="0" max="10" value="5" step="1" className="range" />
                                                    <output className="bubble"></output>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="tabs__button tabs__button--download">
                                <button id="downloadButton" onClick={download} disabled>
                                    <span>
                                        Download
                                    </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* } */}
        </main>
    )
}

export default Page;
