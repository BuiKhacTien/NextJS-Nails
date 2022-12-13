import React from "react";
import Button from "react-bootstrap/Button";
import Login from "../../components/LoginRegister/Login";
import ModalConfirm from "../../components/common/ModalConfirm";
import { useRouter } from "next/router"
import { Col, Form, Row } from "react-bootstrap";
import { showError } from "../../utils/app";
import cartApi from "../../api/cartApi";
import { useSelector } from "react-redux";
import { ORDER_ID } from "../../constants/appSetting";
//
//
export async function getStaticProps({ locale }) {
   return {
      props: {
         ... (await serverSideTranslations(locale, ['translation'])),
      },
   }
}
//

const params = {
  Address: "",
  Address2: "",
  City: "",
  Company: "",
  Email: "",
  FirstName: "",
  LastName: "",
  Phone: "",
  States: "",
  ZipCode: "",
  States1: "",
  Email1: "",
  Phone1: "",
  FirstName1: "",
  LastName1: "",
  Company1: "",
  Address1: "",
  Address2_1: "",
  City1: "",
  ZipCode1: "",
  CheckAddress: 0,
  Name1: ''
};
const checkParams = (params) => {
  const {
    Address,
    Address2,
    City,
    Company,
    Email,
    FirstName,
    LastName,
    Phone,
    States,
    ZipCode,
    States1,
    Email1,
    Phone1,
    FirstName1,
    LastName1,
    Company1,
    Address1,
    Address2_1,
    City1,
    ZipCode1,
    CheckAddress,
  } = params
  if (
    FirstName === "" || FirstName1 === "" || LastName === "" || LastName1 === "" ||
    Address === "" || Phone === "" || Phone1 === "" ||
    ZipCode === "" || ZipCode1 === "" || City === "" || City1 === "" ||
    States === "" || States1 === ""
  ) return false;
  return true;
};
const Index = () => {
  const router = useRouter()
  const [show, setShow] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [shipping, setShipping] = React.useState(params);
  const { cart } = useSelector((state) => state.cart);
  const { Address, Address2, City, Company, Email, FirstName, LastName, Phone, States, ZipCode } = shipping

  const getAddress = (code) => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        code +
        "&key=AIzaSyDVQ61RzI2QMnqP7l3r717W3OMR-a93cto"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.results && data.results.length > 0) {
            let currentAddress = data.results[0];
            let city = currentAddress.address_components.find((item) =>
              item.types.find((type) => type === "locality")
            );
            let state = currentAddress.address_components.find((item) =>
              item.types.find((type) => type === "administrative_area_level_1")
            );
            const res = {
              City: city.long_name || "",
              States: state.long_name || "",
            };
            resolve(res);
          }
        });
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const validate = checkParams(shipping);
    if (!validate) return showError("Fields * do not be blank");
    cartApi.checkOutNotLogin(shipping).then((res) => {
      if (res) {
        const { userIdNoAccount } = res;
        localStorage.setItem("USER_NO_ACCOUNT", userIdNoAccount)
        router.push("/cart");
      }
    });
    setShow(false);
  };
  const onClose = () => {
    setShowForm(true);
    setShow(false);
  };
  const onOpenModal = () => {
    setShow(true);
  };
  const handleChangeShipping = (nameKey, e) => {
    const v = e.target.value;
    setShipping({ ...shipping, [nameKey]: v });
  };
  const onCopyAddress = (e) => {
    const isChecked = e.target.checked;
    const value = isChecked ? 1 : 0
    if (isChecked) {
      const formCopyAddress = {
        Address1: Address,
        Address2_1: Address2,
        City1: City,
        Company1: Company,
        Email1: Email,
        FirstName1: FirstName,
        LastName1: LastName,
        Phone1: Phone,
        States1: States,
        ZipCode1: ZipCode,
        CheckAddress: value
      }
      setShipping({ ...shipping, ...formCopyAddress });
    }
  };
  const getAddressByZipCodeShipping = async (code, nameCity, nameState) => {
    const { City, States } = await getAddress(code);
    setShipping({ ...shipping, [nameCity]: City, [nameState]: States });
  };
  const { t } = useTranslation()
  return (
    <main className="bg-light">
      <div className="container bg-white py-3">
        <div className="row">
          <div className="col-md-6">
            <Login
              title={
                !showForm ? t("Good to see you again!") : t("Have you have account?")
              }
            />
          </div>
          <div className="col-md-6">
            {!showForm && (
              <div>
                <h3>{t("New to Nails Beauty Supply?")}</h3>
                <Button
                  onClick={onOpenModal}
                  className="w-100"
                  variant="outline-secondary"
                >
                 {t("Check out as Guest")} 
                </Button>
                <Button
                  onClick={() => router.push("/login-register")}
                  className="w-100 mt-3"
                  variant="outline-secondary"
                >
                  {t("Create your account")}
                </Button>
              </div>
            )}
            {showForm && (
              <div>
                <h3>{t("Guest check out")}</h3>
                <Form onSubmit={onSubmit}>
                  <Row className="mb-3">
                    <Form.Label>{t("Address")}</Form.Label>
                    <Form.Group as={Col} controlId="formFirstName">
                      <Form.Control
                        value={FirstName}
                        onChange={(e) => handleChangeShipping("FirstName", e)}
                        placeholder={t("First Name") + " *"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                      <Form.Control
                        value={LastName}
                        onChange={(e) => handleChangeShipping("LastName", e)}
                        placeholder={t("Last Name") + " *"}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCompany">
                      <Form.Control
                        value={Company}
                        onChange={(e) => handleChangeShipping("Company", e)}
                        placeholder={t("Company")}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control
                        value={Email}
                        onChange={(e) => handleChangeShipping("Email", e)}
                        type="email"
                        placeholder={t("Email")}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCellPhone">
                      <Form.Control
                        value={Phone}
                        onChange={(e) => handleChangeShipping("Phone", e)}
                        placeholder={t("Cell Phone") + " *"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAddress">
                      <Form.Control
                        value={Address}
                        onChange={(e) => handleChangeShipping("Address", e)}
                        placeholder={t("Address") + " *"}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formAddress2">
                      <Form.Control
                        value={Address2}
                        onChange={(e) => handleChangeShipping("Address2", e)}
                        placeholder={t("Address") + "  2: apt#, ste 101"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formZipCode">
                      <Form.Control
                        value={ZipCode}
                        onChange={(e) => handleChangeShipping("ZipCode", e)}
                        placeholder={t("Zip code") + " *"}
                        onBlur={() => getAddressByZipCodeShipping(ZipCode, 'City', 'States')}
                        name="ZipCode"
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formState">
                      <Form.Control
                        value={States}
                        onChange={(e) => handleChangeShipping("States", e)}
                        placeholder={t("State") + " *"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCity">
                      <Form.Control
                        value={City}
                        onChange={(e) => handleChangeShipping("City", e)}
                        placeholder={t("City") + " *"}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                      <Form.Check
                        onChange={onCopyAddress}
                        type="checkbox"
                        label="Same as billing address"
                        name="CheckAddress"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label>{t('Shipping Address')}</Form.Label>
                    <Form.Group as={Col} controlId="formFirstName">
                      <Form.Control
                        value={shipping.FirstName1}
                        onChange={(e) => handleChangeShipping("FirstName1", e)}
                        placeholder={t("First Name") + " *"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                      <Form.Control
                        value={shipping.LastName1}
                        onChange={(e) => handleChangeShipping("LastName1", e)}
                        placeholder={t("Last Name") + " *"}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCompany">
                      <Form.Control
                        value={shipping.Company1}
                        onChange={(e) => handleChangeShipping("Company1", e)}
                        placeholder={t("Company")}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Control
                        value={shipping.Email1}
                        onChange={(e) => handleChangeShipping("Email1", e)}
                        type="email"
                        placeholder={t("Email")}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCellPhone">
                      <Form.Control
                        value={shipping.Phone1}
                        onChange={(e) => handleChangeShipping("Phone1", e)}
                        placeholder={t("Cell Phone") + " *"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAddress">
                      <Form.Control
                        value={shipping.Address1}
                        onChange={(e) => handleChangeShipping("Address1", e)}
                        placeholder={t("Address")}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formAddress2">
                      <Form.Control
                        value={shipping.Address2_1}
                        onChange={(e) => handleChangeShipping("Address2_1", e)}
                        placeholder={t("Address") + "  2: apt#, ste 101"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formZipCode">
                      <Form.Control
                        value={shipping.ZipCode1}
                        onChange={(e) => handleChangeShipping("ZipCode1", e)}
                        placeholder={t("Zip code") + " *"}
                        onBlur={() =>
                          getAddressByZipCodeShipping(shipping.ZipCode1, 'City1', 'States1')
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formState">
                      <Form.Control
                        value={shipping.States1}
                        onChange={(e) => handleChangeShipping("States1", e)}
                        placeholder={t("State") + " *"}
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formCity">
                      <Form.Control
                        value={shipping.City1}
                        onChange={(e) => handleChangeShipping("City1", e)}
                        placeholder={t("City") + " *"}
                      />
                    </Form.Group>
                  </Row>
                  <Button variant="secondary" type="submit">
                    <i className="fas fa-sign-in-alt"></i> {t("Continue to checkout")}
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
        <ModalConfirm
          title="Do you want to create an account?"
          show={show}
          setShow={setShow}
          onSubmit={() => router.push("/login-register")}
          onClose={onClose}
        />
      </div>
    </main>
  );
};

export default Index;
