import {Html, Head, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* CSS for leaflet */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
          integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14="
          crossOrigin=""
        />
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}