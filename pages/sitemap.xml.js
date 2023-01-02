
import { BASE_API } from "../constants/appSetting";
import productApi from "../api/productApi";
const EXTERNAL_DATA_URL = 'https://nailsbeautysupply.com';

function generateSiteMap(categories, dealsCenter) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://nailsbeautysupply.com</loc>
     </url>
     ${categories
       .map(({ value }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/category/${value.slug_Name}`}</loc>
       </url>
       ${value.subCatalogModels.length > 0 ? 
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/category/${value.slug_Name}/${value.subCatalogModels.slug_Name}`}</loc>
        </url> : 
        ''}
     `;
       })
       .join('')}
       ${dealsCenter
        .map(({ value }) => {
          return `
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/deals-center/${value.slug_Name}`}</loc>
        </url>
      `;
        })
        .join('')}
     <url>
        <loc>https://nailsbeautysupply.com/cart</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/check-out-guest</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/details</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/forgot-password</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/form-checkout</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/form-checkout/address-default</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/form-checkout/billing-address</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/form-checkout/payment</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/login-register</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/account</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/address</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/your-order</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/discount-code</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/reward</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/payment</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/my-account/communication-preferences</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/order-details</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/return</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/search</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/shipping</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/track-order</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/view</loc>
     </url>
     <url>
        <loc>https://nailsbeautysupply.com/view-invoice</loc>
     </url>
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const requestCategory = await fetch(BASE_API + productApi.catalog);
  const categories = await requestCategory.json();

  const requestdeals = await fetch(BASE_API + productApi.dealsCenterSiteMap);
  const dealsCenter = await requestdeals.json();
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(dealsCenter);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;