import React from "react";
//

//
//
import { useTranslation } from 'next-i18next'
const Index = ({
  label,
  value,
  checked,
  onChange,
  className,
  type = "checkbox",
  name = "",
}) => {
  const { t } = useTranslation("translation")
  return (
    <label className={`nails-checkbox__wrapper ${className}`}>
      <div className="nails__checkbox">
        <input
          value={value}
          onChange={onChange}
          id="frequent__checkbox"
          type={type}
          name="name"
          checked={checked}
        />
        <i className="fas fa-check"></i>
      </div>
      <div className="nails-checkbox__label">{t(label)}</div>
    </label>
  );
};

export default Index;
