import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { useTranslation } from 'react-i18next';

export default function PaymentMethodScreen(props) {
    const { t } = useTranslation();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispacth = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispacth(savePaymentMethod(paymentMethod));
        props.history.push('placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{t("Payment Method")}</h1>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id="paypal" 
                            value="Paypal"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            id="stripe" 
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">{t("Traditional")}</label>
                    </div>
                </div>
                <div>
                    <button className="primarysubmit" type="submit">{t("Continue")}</button>
                </div>
            </form>
        </div>
    )
}