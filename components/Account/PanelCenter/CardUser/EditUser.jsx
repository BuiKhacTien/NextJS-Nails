import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../../api/userApi";
import { showError, showSuccess } from "../../../../utils/app";
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const EditUser = ({ open, setOpen }) => {
  const [loading, setLoading] = React.useState(false)
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(user);
  const dispatch = useDispatch()
  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    address2,
    city,
    country,
    company,
  } = info;
  const onChange = (nameKey, v) => {
    setInfo({ ...info, [nameKey]: v });
  };
  const {t} = useTranslation();
  const onSubmit = (e) => {
    e.preventDefault();
    const params = {
      address: address,
      address2: address2,
      city: city,
      company: company,
      country: country,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };
    if (phone.length < 10) {
      showError(t("Your phone is not correct!"));
      return;
    }
    if (
      params.firstName !== "" ||
      params.lastName !== "" ||
      params.email !== "" ||
      params.address !== "" ||
      params.address2 !== "" ||
      params.city !== "" ||
      params.company !== "" ||
      params.country !== "" ||
      params.phone !== ""
    ) {
      setLoading(true)
      userApi.update(params).then((res) => {
        if (res) {
          dispatch({ type: 'user/update', payload: true })
          showSuccess(t("Update profile success."));
          setOpen(false);
          setLoading(false)
        }
      }).catch(e => setLoading(false));
    }
  };
  return (
    <div>
      <div className="edit-user__title">
        <p>{t("Edit Name")}</p>
        <Button
          onClick={() => setOpen(!open)}
          className="btn__link"
          variant="link"
        >
          Cancel
        </Button>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="First name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Address"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress2">
          <Form.Label>Address2</Form.Label>
          <Form.Control
            value={address2}
            onChange={(e) => onChange("address2", e.target.value)}
            placeholder="Address2"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="City"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="Country"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control
            value={company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Company"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            type="email"
            placeholder="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Phone"
          />
        </Form.Group>
        <Button disabled={loading} className="btn-submit mb-3" variant="secondary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditUser;
