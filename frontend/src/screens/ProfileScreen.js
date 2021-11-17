import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { 
    success: successUpdate, 
    error: errorUpdate, 
    loading: loadingUpdate, 
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if(!user){
      dispatch({ type: USER_UPDATE_PROFILE_RESET});
      dispatch(detailsUser(userInfo._id));    
    } else {
      setName(user.name);
      setEmail(user.email);
      if(user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and Confirm Password Are Not Matched');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{t("User Profile")}</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
          <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {successUpdate && (
          <MessageBox>
            {t("Profile Updated Successfully")}
            </MessageBox>
          )}
            <div>
              <label htmlFor="name">{t("Name")}</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">{t("Email")}</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">{t("Password")}</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">{t("Confirm Password")}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            {
              user.isSeller && (
                <>
                  <h2>{t("Seller")}</h2>
                  <div>
                    <label htmlFor="sellerName">{t("Seller Name")}</label>
                    <input 
                    id="sellerName" 
                    type="text" 
                    placeholder="Enter Seller Name" 
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="sellerLogo">{t("Seller Logo")}</label>
                    <input 
                    id="sellerLogo" 
                    type="text" 
                    placeholder="Enter Seller Logo" 
                    value={sellerLogo}
                    onChange={(e) => setSellerLogo(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="sellerDescription">{t("Seller Description")}</label>
                    <input 
                    id="sellerDescription" 
                    type="text" 
                    placeholder="Enter Seller Description" 
                    value={sellerDescription}
                    onChange={(e) => setSellerDescription(e.target.value)}
                    ></input>
                  </div>
                </>
              )
            }
            <div>
              <label />
              <button className="primarysubmit" type="submit">
                {t("Update")}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}