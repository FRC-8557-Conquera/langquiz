import config from "@app/lib/config"
import "@app/styles/globals.css"
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (<>
    <Head>
      <title>{config.appName}</title>
    </Head>
    <Component {...pageProps} />
  </>)
}
