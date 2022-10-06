import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import productApi from "../../api/productApi";
import { useRouter } from "next/router";

export default function Detail() {
  const [info, setInfo] = useState([]);
  const [id, setId] = useState(0);
  const [feature_id, setFeatureId] = useState(0);
  const router = useRouter();
  const slug = router.query;
  useEffect(() => {
    if (slug.slug) {
      setId(slug.slug[1]);
      setFeatureId(slug.slug[2]);
    }
  }, [slug]);
  // const feature_id = router.query.slug[2]
  // useEffect(() => {
  //   productApi.info()
  // },[])
  console.log(id, feature_id);
  return (
    <>
      <Head>
        <title>Details</title>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta name="theme-color" content="#000000" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:title" content="Bui Khac Tien title" />
        <meta property="og:description" content="Bui Khac Tien Description" />
        <meta property="fb:app_id" content="729577734340382" />
        <meta property="og:type" content="article" />
        <meta property="og:image:width" content="1230" />
        <meta property="og:image:height" content="600" />
        <meta
          name="google-site-verification"
          content="qpjD5uarrxfV_gxV4E3KEhjPJyz6OG9Hnm1lo67HR-Y"
        />
      </Head>
      <div className={styles.container}>This is Detail page</div>
    </>
  );
}
