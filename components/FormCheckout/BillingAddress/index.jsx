import React, { useState, useEffect } from "react";
//

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import userApi from "../../../api/userApi"

import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
//
//

export default function Index() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLogin, user } = useSelector((state) => state.user);
  const [defaultAddress, setDefaultAddress] = useState({})
  const [checked, setChecked] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    state: "",
  });
  useEffect(() => {
    if (isLogin) {
        userApi.defaultShippingAddress().then(res => {
            if (res) {
                setDefaultAddress(res)
            }
        })
    }
  },[isLogin]);
  
  useEffect(() => {
    if (checked === true) {
        if (isLogin) {
            setBillingAddress({
                firstName: user.firstName,
                lastName: user.lastName,
                address: defaultAddress.address,
                zip: defaultAddress.zip_Code,
                city: defaultAddress.city,
                state: defaultAddress.country
            })
        }
    } else {
        setBillingAddress({
            firstName: "",
            lastName: "",
            address: "",
            zip: "",
            city: "",
            state: "",
        })
    }
  }, [checked])

  const handleContinuePayment = () => {
    if (isLogin) {
      if (
        billingAddress.firstName !== "" &&
        billingAddress.lastName !== "" &&
        billingAddress.address !== "" &&
        billingAddress.zip !== "" &&
        billingAddress.city !== "" &&
        billingAddress.state !== "" &&
        billingAddress.firstName !== ""
      ) {
        localStorage.setItem("Billing_Address", JSON.stringify(billingAddress));
        router.push("/form-checkout/payment/card");
      } else {
        alert(t("Please complete all information"));
      }
    } else {
      router.push("/check-out-guest");
    }
  };
  
  return (
    <div className="billing_address_container">
      <div className="billing_address_title">Billing Address</div>
      <div className="check_box_same_as_shipping">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={e => setChecked(e.target.checked)} />}
            label={t("Same as shipping")}
          />
        </FormGroup>
      </div>
      <div className="billing_address_box">
        <TextField
          sx={{ m: 1 }}
          fullWidth
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={billingAddress.firstName}
          onChange={(e) =>
            setBillingAddress({ ...billingAddress, firstName: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1 }}
          fullWidth
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          value={billingAddress.lastName}
          onChange={(e) =>
            setBillingAddress({ ...billingAddress, lastName: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1 }}
          fullWidth
          id="outlined-basic"
          label="Adress"
          variant="outlined"
          value={billingAddress.address}
          onChange={(e) =>
            setBillingAddress({ ...billingAddress, address: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1 }}
          fullWidth
          id="outlined-basic"
          label="Zip"
          variant="outlined"
          value={billingAddress.zip}
          onChange={(e) =>
            setBillingAddress({ ...billingAddress, zip: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1 }}
          fullWidth
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={billingAddress.city}
          onChange={(e) =>
            setBillingAddress({ ...billingAddress, city: e.target.value })
          }
        />
        <TextField
          sx={{ m: 1 }}
          fullWidth
          id="outlined-basic"
          label="State"
          variant="outlined"
          value={billingAddress.state}
          onChange={(e) =>
            setBillingAddress({ ...billingAddress, state: e.target.value })
          }
        />
      </div>
      <div style={{ textAlign: "center" }} className="p-4">
        <Button variant="secondary" onClick={handleContinuePayment}>
          {t("Continue Payment")}
        </Button>
      </div>
    </div>
  );
}
