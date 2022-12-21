import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
//
import { useSelector } from "react-redux";
import Link from "next/link"
import { useRouter } from "next/router"
import cartApi from "../../../api/cartApi";
import userApi from "../../../api/userApi";
import { ORDER_ID } from "../../../constants/appSetting";
import ModalAddAddress from "../ModalAddAddress";
import ModalConfirm from "../../common/ModalConfirm";
//
import { useTranslation } from 'next-i18next'
//

const Item = ({ item, setReLoad, onEdit }) => {
  const { name = "", company, address, address2, city, zip_Code, country, is_Default, id } = item;
  const [showWarning, setShowWarning] = useState(false);
  const { t } = useTranslation("translation")
  const onDefault = () => {
    userApi.defaultAddress(id).then((res) => {
      if (res && res.status === 200) {
        setReLoad(true);
      }
    });
  };
  const onDelete = () => {
    userApi.deleteAddress(id).then((res) => {
      if (res && res.status === 200) {
        setReLoad(true);
      }
    });
  };
  // console.log({item})
  return (
    <li className="mb-3">
      <div className="address__item">
        <div className="item-address">
          <p className="address__item-name">{name}</p>
          <div className="address__item-city">
            <p>{company && company + ","}</p>
            <p>{address && address}</p>
            <p>{address2 && address2}</p>
            <p>{city && city + ","}</p>
            <p>{country && country}</p>
            <p>{zip_Code && " - " + zip_Code}</p>
          </div>
        </div>
        <div className="address__item-action">
          <Button
            onClick={() => onEdit(item)}
            variant="link"
            className="address__item-action-link"
          >
            {" "}
            {t("Edit")}
          </Button>
          <Button
            onClick={() => setShowWarning(true)}
            variant="link"
            className="address__item-action-link"
          >
            {t("Delete")}
          </Button>
          <Button
            onClick={onDefault}
            disabled={is_Default}
            variant="link"
            className="address__item-action-link"
          >
            {" "}
            {is_Default ? t("Default shipping") : t("Make default")}
          </Button>
        </div>
      </div>
      <ModalConfirm
        show={showWarning}
        setShow={setShowWarning}
        onSubmit={onDelete}
      />
    </li>
  );
};

const Index = () => {
  const { t } = useTranslation("translation")
  const [address, setAddress] = useState([]);
  const [show, setShow] = useState(false);
  const [reLoad, setReLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ status: false, params: {} });
  const { cart } = useSelector((state) => state.cart);
  const { isLogin } = useSelector((state) => state.user);
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    userApi.shippingAddress().then((res) => {
      if (res) {
        setAddress(res);
        setReLoad(false);
        setLoading(false);
      }
    });
  }, [reLoad === true]);
  const handleCheckout = () => {
    const params = {
      cart_id: cart.id,
      userIdNoAccount: null,
    };
    if (isLogin) {
      // cartApi.checkOut(params).then((res) => {
      //   if (res) {
      //     localStorage.setItem(ORDER_ID, res.orderId);
      //     // router.push("/form-checkout/payment/card");
      //     router.push("/form-checkout/billing-address");
      //   }
      // });
      router.push("/form-checkout/billing-address");
    } else {
      router.push("/check-out-guest");
    }
  };
  const handleSubmit = (show, reLoad) => {
    setShow(show);
    setReLoad(reLoad);
    setEdit({ status: false, params: {} });
  };
  const handleEdit = (v) => {
    setEdit({ status: true, params: v });
    return setShow(true);
  };
  const showAddModal = () => {
    setEdit(false)
    return setShow(!show)
  }
  const isShowButtonPayment = pathname === "/form-checkout/address-default";
  return (
    <main>
      <h1 className="account__title">{t('Shipping Address')}</h1>
      <Button
        onClick={showAddModal}
        variant="outline-secondary"
        className="border-dark"
      >
        + {t("Add new shipping address")}
      </Button>
      <div>
        <div className="box-list border-top mt-3">
          <ul className="list-address">
            {address.map((v, i) => (
              <Item
                key={i}
                item={v}
                setReLoad={setReLoad}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        </div>
        {isShowButtonPayment && (
          <div style={{ textAlign: "right" }} className="mb-4">
            <Button variant="secondary" onClick={handleCheckout}>
              {t("Continue Payment")}
            </Button>
          </div>
        )}
        {!loading && address.length === 0 && (
          <>
            <p className="address__no-orders">
              <i className="fas fa-parachute-box"></i>
            </p>
            <h3 className="text-center mb100">
              Bạn chưa có địa chỉ nhận hàng nào
            </h3>
          </>
        )}
      </div>
      <ModalAddAddress
        edit={edit}
        setEdit={setEdit}
        show={show}
        setShow={setShow}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default Index;
