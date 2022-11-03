import React from "react";
import CheckBox from "../../common/CheckBox";
import { useTranslation } from "react-i18next";
const FrequentCard = ({ item = {}, checked = false, change, index }) => {
  const { priceDiscount, name, size, color } = item;
  const onChange = (item) => {
    change(checked, item);
  };
  const {t} = useTranslation()
  return (
    <label className="frequent-cart">
      <CheckBox
        value={item}
        checked={checked}
        onChange={() => onChange(item)}
        id="frequent__checkbox"
        type="checkbox"
      />
      <div className="frequent__item">
        <span>
          <b>{index === 0 && `${t('This item')}: `}</b>
          {name} {size && <strong>size: {size}</strong>} {color && <strong>color: {color}</strong>}
        </span>
        <b>${priceDiscount}</b>
      </div>
    </label>
  );
};
export default FrequentCard;
