import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import appApi from '../../api/appApi'
import { showSuccess } from '../../utils/app'
//

//
//
import { useTranslation } from 'next-i18next'
const FooterActions = () => {
   const { t } = useTranslation("translation")
   const [email, setEmail] = React.useState('')
   const sendMailInviteFriend = (e) => {
      e.preventDefault()
      appApi.sendMailInviteFriends({ email }).then(res => {
         showSuccess("send email success")
      })
   }
   const onShare = () => {
      const url = `https://nailsbeautysupply.com`
      window.FB.ui(
        {
          display: "dialog",
          method: "share",
          href: url,
        },
        (response) => {
          if (response) {
            showSuccess("Shared successful")
          }
        }
      );
    }
   return (
      <div>
         <h4 className="footer-list__title d-none d-md-block">{t("Enter your email to receive new saving offers")}</h4>
         <form onSubmit={sendMailInviteFriend}>
            <InputGroup className="d-none d-md-flex footer-form__email mb-3">
               <FormControl
                  className="form-input__email"
                  placeholder={`${t("Recipient's username")}`}
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <Button className="btn-email__send" variant="secondary" type="submit" id="button-addon2">
                  <span>{t("Send")}</span><i className="mx-1 far fa-arrow-right"></i>
               </Button>
            </InputGroup>
            <div className="footer-action__share-social mb-3">
               <Button onClick={onShare}><i className="fab fa-facebook-square"></i> {t("Share on Facebook")}</Button>
            </div>
         </form>
         {/* <div className="footer-actions__app mb-2">
            <div className="row no-gutters">
               <div className="col-6 mb-2">
                  <a href="#"><img src={IOS_APP} alt="IOS_APP" /></a>
               </div>
               <div className="col-6 mb-2">
                  <a href="#"><img src={ANDROID_APP} alt="ANDROID_APP" /></a>
               </div>
            </div>
         </div> */}
      </div>
   )
}

export default FooterActions
