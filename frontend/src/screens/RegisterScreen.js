import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useTranslation } from 'react-i18next';

export default function RegisterScreen(props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';


    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        alert('Password and confirm password are not match');
    } else {
        dispatch(register(name, email, password));
    }
    dispatch(register(name, email, password));
  };
  useEffect(() =>{
      if (userInfo){
        props.history.push(redirect);
      }
  }, [props.history,redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{t("Create Account")}</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">{t("Name")}</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">{t("Email Address")}</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">{t("Password")}</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">{t("Confirm Password")}</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primarysubmit" type="submit">
            {t("Register")}
          </button>
        </div>
        <div>
          <label />
          <div>
            {t("Already have an account")}? <Link to={`/signin?redirect=${redirect}`}>{t("Sign In")}</Link>
          </div>
        </div>
      </form>
    </div>
  );
}