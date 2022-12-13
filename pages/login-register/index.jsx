import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import dynamic from "next/dynamic";

const Login = dynamic(
  () => import("../../components/LoginRegister/Login"),
  {
    ssr: false,
  }
);
const Register = dynamic(
   () => import("../../components/LoginRegister/Register"),
   {
     ssr: false,
   }
 );
import { useSelector } from 'react-redux'
import { useQuery } from '../../constants/constants'
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
   return {
     props: {
       ... (await serverSideTranslations(locale, ['translation'])),
     },
   }
 }
const Layout = ({ isMobile = false, children }) => {
   const [tab, setTab] = React.useState('0')
   const query = useQuery()
   const tabIndex = query.get('tab')
   React.useEffect(() => {
      if (tabIndex) {
         setTab(tabIndex)
      }
   }, [])
   if (isMobile) return (
      <Tabs onSelect={(k) => setTab(k)} activeKey={tab} id="uncontrolled-tab-example" className="mb-3">
         {children.map((child, index) => {
            const { title } = child.props
            return (
               <Tab key={index} eventKey={index}   title={title}>
                  {child}
               </Tab>
            )
         })}
      </Tabs>
   )
   return (
      <div className="row">
         {children.map((child, index) => (
            <div className="col-6" key={index}>
               {child}
            </div>
         ))}
      </div>
   )
}

const Index = () => {
   const {t} = useTranslation()
   const { isMobile } = useSelector(state => state.app)
   return (
      <main className="bg-light">
         <div className="container bg-white py-3">
            <Layout isMobile={isMobile}>
               <Login title={t('Sign in')} />
               <Register title="Create your account" />
            </Layout>
         </div>
      </main>
   )
}

export default Index
