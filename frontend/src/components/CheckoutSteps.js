import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CheckoutSteps(props) {
    const { t } = useTranslation();
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active':''}>{t("Sign In")}</div>
            <div className={props.step2 ? 'active':''}>{t("Shipping")}</div>
            <div className={props.step3 ? 'active':''}>{t("Payment")}</div>
            <div className={props.step4 ? 'active':''}>{t("Place Order")}</div>
        </div>
    )
}