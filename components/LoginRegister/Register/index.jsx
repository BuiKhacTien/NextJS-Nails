import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputPassword from "../../common/InputPassword";
import userApi from "../../../api/userApi";
import { showError, showSuccess } from "../../../utils/app";
import { nextStepCheckout } from "../../../store/app/appActions";
import { useState } from "react";
import { useRouter } from "next/router";

//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//
const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rules, setRules] = useState(false);
  const {t} = useTranslation()
  const { stepCheckout } = useSelector((state) => state.app);
  const registerFB = () => {
    window.FB.login(
      (response) => {
        if (response && response.status === "connected") {
          // const { authResponse } = response
          const accessToken = response?.authResponse?.accessToken;
          userApi.loginSocial(accessToken).then((res) => {
            if (res) {
              dispatch({ type: "user/login", payload: res.accessToken });
              showSuccess("Login success");
              router.push("/home");
            }
          });
        }
      },
      { scope: "email, public_profile", return_scopes: true }
    );
  };
  const register = (e) => {
    e.preventDefault();
    // let { firstName, lastName, emailOrPhone, password, confirmPassword, isCheckTerm } = this.state
    if (
      (firstName === "" ||
        lastName === "" ||
        emailOrPhone === "" ||
        password === "",
        confirmPassword === "")
    ) {
      showError("Fields * do not be blank");
      return;
    }

    if (password === "" || confirmPassword === "") {
      showError("You must enter a password");
      return;
    }
    if (password !== confirmPassword) {
      showError("Confirm password not same password");
      return;
    }
    if (rules === false) {
      showError("You must checkbox to receive notification");
      return;
    }
    // let friendCode = ""
    // if (this.props.match.params.referAFriendCode) {
    //    friendCode = this.props.match.params.referAFriendCode
    // }
    let param = {
      firstName,
      lastName,
      emailOrPhone,
      password,
      confirmPassword,
      rules,
      referAFriendCode: "",
    };
    userApi.register(param).then((res) => {
      if (res) {
        const params = {
          userName: emailOrPhone,
          password,
        };
        userApi.login(params).then((res) => {
          if (res) {
            dispatch({ type: "user/login", payload: res.accessToken });
            showSuccess("Login success");
            if (stepCheckout !== 0)
              return dispatch(nextStepCheckout(0)).then(
                ({ nextPath }) => router.push(nextPath)
              );
            return router.push("/");
          }
        });
      }
    });
  };
  return (
    <div>
      <h3>{t("Let's create your account")}</h3>
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name*"
            controlId="register__firstName*"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name*"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email-phone">
          <Form.Control
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Phone or email*"
          />
        </Form.Group>
        <InputPassword
          idForm="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password*"
        />
        <InputPassword
          idForm="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password*"
        />
        <div className="my-3">
          <label htmlFor="checkTerm">
            <input
              value={rules}
              onChange={(e) => setRules(!rules)}
              id="checkTerm"
              type="checkbox"
            />
            <span className="check-term__text">
              {t("By clicking Sign up, you are agreeing to our Terms. You can receive our notifications via Email.")}
            </span>
          </label>
        </div>
        <Button className="btn-submit mb-2" variant="secondary" type="submit">
          {t("Create Account & Continue")}
        </Button>
        <Button onClick={registerFB} className="btn-submit mb-2 d-block">
          <i className="fab fa-facebook"></i> {t("Register with facebook account")}
        </Button>
      </Form>
    </div>
  );
};

export default Index;
