import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
        <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.3.min.js" />
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/rhino3dm@0.12.0/rhino3dm.min.js"></script>
        <script type="text/javascript" src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js" />
        <script type="text/javascript" src="https://unpkg.com/three@0.140.2/build/three.module.js"/>
        <script type="text/javascript" src="https://unpkg.com/three@0.140.2/examples/jsm/controls/OrbitControls.js" />
        <script type="text/javascript" src="https://unpkg.com/three@0.140.2/examples/jsm/loaders/3DMLoader.js"/>
      </Html>
    )
  }
}

export default MyDocument
