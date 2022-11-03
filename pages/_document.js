import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
        <meta
          name="google-site-verification"
          content="qpjD5uarrxfV_gxV4E3KEhjPJyz6OG9Hnm1lo67HR-Y"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}