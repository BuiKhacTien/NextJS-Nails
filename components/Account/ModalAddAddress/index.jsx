import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PanelResidential from "./PanelResidential";
import PanelBusiness from "./PanelBusiness";
import { useSelector } from "react-redux";
import userApi from "../../../api/userApi";
//
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
//

const defaultParams = {
  address: "", address2: "", city: "", company: "", country: "", is_Default: "", zip_Code: ""
}

const Index = ({ show, onSubmit, edit, setEdit }) => {
  const [params, setParams] = useState(defaultParams);
  const [isBusiness, setIsBusiness] = useState("residential");
  const { user } = useSelector((state) => state.user);
  const{t} = useTranslation()
  const handleClose = () => {
    setParams(defaultParams);
    onSubmit(false, false);
    setEdit({ status: false, params: defaultParams });
  };
  React.useEffect(() => {
    setParams(edit.params);
  }, [edit.status === true]);

  const submit = (e) => {
    e.preventDefault();
    if (edit) {
      const _params = { ...params, phone: null };
      userApi.updateAddress(_params).then((res) => {
        if (res && res.status === 200) {
          onSubmit(false, true);
          setParams(defaultParams);
        }
      });
    } else {
      const _params = { ...params, user_Id: user.id };
      userApi.addAddress(_params).then(() => {
        onSubmit(false, true);
        setParams(defaultParams);
      });
    }
  };
  const handleChangeForm = (v) => {
    // setParams(defaultParams);
    setIsBusiness(v);
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Shipping Address')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <div>
            <input
              onChange={(e) => handleChangeForm(e.target.value)}
              id="residential-address"
              type="radio"
              name="address"
              value="residential"
              checked={isBusiness === 'residential'}
            />
            <label
              style={{ marginLeft: 10, marginBottom: 4, fontSize: '16px' }}
              htmlFor="residential-address"
            >
             {t("Residential Address")} 
            </label>
          </div>
          <br/>
          <div>
            <input
              onChange={(e) => handleChangeForm(e.target.value)}
              id="business-address"
              type="radio"
              name="address"
              value="business"
              checked={isBusiness === 'business'}
            />
            <label
              style={{ marginLeft: 10, marginBottom: 5, fontSize: '16px' }}
              htmlFor="business-address"
            >
             {t("Business Address")} 
            </label>
          </div>
          <br/>
        </Form.Group>
        <Form onSubmit={submit}>
          {isBusiness === "business" ? (
            <PanelBusiness state={params} setState={setParams} />
          ) : (
            <PanelResidential state={params} setState={setParams} />
          )}
          <Button
            className="w-100 mb-3"
            size="lg"
            variant="secondary"
            type="submit"
          >
            {edit ? t("Update Address") : t("Save & Continue")}
          </Button>
          <Button
            onClick={handleClose}
            className="w-100"
            size="lg"
            variant="outline-secondary"
          >
            {t("Cancel")}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Index;
