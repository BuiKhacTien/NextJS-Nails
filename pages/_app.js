import Head from "next/head";
import Script from 'next/script'
import { useEffect } from "react";
import Layout from "../layouts/Default.jsx";
import { Provider } from "react-redux";
import store from "../store";
import React from "react";
import { SSRProvider } from '@react-aria/ssr';

import { appWithTranslation } from 'next-i18next'

import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: "729577734340382",
        xfbml: true,
        version: "v12.0",
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });

  return (
    <SSRProvider>
      <Provider store={store}>
        <Layout>
          <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-2L2Y4GQ1KB" />
          <Script
            id='google-analytics'
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-2L2Y4GQ1KB', {
                    page_path: window.location.pathname,
                    });
                    `,
            }}
          />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SSRProvider>
  );
}

export default appWithTranslation(MyApp);
