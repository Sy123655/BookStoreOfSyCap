import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { useTranslation } from 'react-i18next';

export default function ShippingAddressScreen(props) {
    const { t } = useTranslation();
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('signin');
    }
    const [ fullName, setFullName ] = useState(shippingAddress.fullName);
    const [ address, setAddress ] = useState(shippingAddress.address);
    const [ city, setCity ] = useState(shippingAddress.city);
    const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
    const [ country, setCountry ] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
        //TODO: dispacth save shipping address action
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>{t("Shipping Address")}</h1>
                </div>
                <div>
                    <label htmlFor="fullName">{t("Full Name")}</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        placeholder={t("Enter Full Name")} 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        ></input>
                </div>
                <div>
                    <label htmlFor="address">{t("Address")}</label>
                    <input 
                        type="text" 
                        id="address" 
                        placeholder={t("Enter Address")} 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        ></input>
                </div>
                <div>
                    <label htmlFor="city">{t("City")}</label>
                    <input 
                        type="text" 
                        id="city" 
                        placeholder={t("Enter City" )}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        ></input>
                </div>
                <div>
                    <label htmlFor="postalCode">{t("Postal Code")}</label>
                    <input 
                        type="text" 
                        id="postalCode" 
                        placeholder={t("Enter Postal Code")} 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        ></input>
                </div>
                <div>
                    <label htmlFor="country">{t("Country")}</label>
                    <input 
                        type="text" 
                        id="country" 
                        placeholder={t("Enter Country")} 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        ></input>
                </div>
                <div>
                    <label/>
                    <button className="primarysubmit" type="submit">
                        {t("Continue")}
                    </button>
                </div>
                
            </form>
        </div>
    )
}