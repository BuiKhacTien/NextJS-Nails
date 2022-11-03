import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import Head from "next/head";
import { useEffect } from "react";
import Layout from "../layouts/Default.jsx";
import { Provider } from "react-redux";
import store from "../store";
import React from 'react'
import { appWithTranslation } from 'next-i18next';

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
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
