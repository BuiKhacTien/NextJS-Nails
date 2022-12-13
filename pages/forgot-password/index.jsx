import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import userApi from "../../api/userApi";
import ModalSuccess from "../../components/LoginRegister/ModalSuccess";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export async function getStaticProps({ locale }) {
  return {
     props: {
        ... (await serverSideTranslations(locale, ['translation'])),
     },
  }
}

const Index = ({ title = "Forgot Password" }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const router = useRouter();
  const { t } = useTranslation("translation")
  const handleClose = (status) => {
    setOpenSuccess(status)
    //   router.push('/')
  }
  const onSubmit = (e) => {
    e.preventDefault();
    let param = { username: userName };
    userApi.forgotPassword(param).then((res) => {
      if (res) {
        setOpenSuccess(true);
      }
    });
  };
  return (
    <div className="content_box">
      <h3>{title}</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Enter email or phone"
          />
        </Form.Group>
        <div>
          <Button
            className="btn-submit mb-2 w-100"
            variant="secondary"
            type="submit"
          >
            Send me password reset link
          </Button>
        </div>
        <Link href="/login-register" className="link-forgot">
         {t('Return Login ?')} 
        </Link>
      </Form>
      <ModalSuccess show={openSuccess} setShow={handleClose} />
    </div>
  );
};

export default Index;
