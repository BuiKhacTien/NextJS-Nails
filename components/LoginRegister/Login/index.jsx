import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import Link from "next/link";
import { showSuccess } from "../../../utils/app";
import { getProfile, loginUser } from "../../../store/user/userActions";
import InputPassword from "../../common/InputPassword";
//

import { clearInfoComments } from "../../../store/user/userActions";
import productApi from "../../../api/productApi";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const Index = ({ title = "Good to see you again!" }) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const infoComments = useSelector((state) => state.user.infoComments);
  const linkComment = useSelector((state) => state.user.link);
  const { pathname } = router;
  const { t } = useTranslation();
  const login = (e) => {
    e.preventDefault();
    let param = { userName, password };
    if (typeof window !== "undefined") {
      dispatch(loginUser(param)).then((status) => {
        if (status) {
          dispatch(getProfile());
          if (Object.keys(infoComments).length > 0) {
            productApi.addComment(infoComments).then((res) => {
              if (res) {
                showSuccess("Add comment success");
                dispatch(clearInfoComments());
                return router.push(linkComment);
              } else if (pathname === "/check-out-guest") {
                return router.push("/form-checkout/address-default");
              } else {
                return router.push("/");
              }
            });
          } else if (pathname === "/check-out-guest") {
            return router.push("/form-checkout/address-default");
          } else {
            return router.push("/");
          }
        }
      });
    }
  };
  return (
    <div>
      <h3>{title}</h3>
      <Form onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Control
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder={t("Enter your phone or email")}
          />
        </Form.Group>
        <Form.Group
          className="mb-3 form__password"
        >
          <InputPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder={t("Password")}
          />
        </Form.Group>
        <Button className="btn-submit mb-2" variant="secondary" type="submit">
          {t("Sign in")}
        </Button>
        <Link href="/forgot-password" className="link-forgot">
          <div className="login_forgot_password">{t("Forgot your password")} ?</div>
        </Link>
      </Form>
    </div>
  );
};

export default Index;
