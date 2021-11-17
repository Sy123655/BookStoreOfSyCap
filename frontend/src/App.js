import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import DashboardScreen from './screens/DashboardScreen';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';




function App() {

  const { t } = useTranslation();

  function handleClick(lang) {
    i18next.changeLanguage(lang)
  }

  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  },[dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="row">
          <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
            <h3 className="h3logo">Book<span className="spanlogo">Store</span></h3>
            </Link> 
          </div>
          <div>
            <Route render={({ history }) => (<SearchBox history={history}></SearchBox>)}></Route>
          </div>
          <div>
            <Link to="/cart">
            <i className="fa fa-cart-arrow-down" style={{fontSize: "25px"}} />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <div className="dropdown">
                <Link to="#">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrdWYbu8zDzpZfHQWugRt0URtAIYo1Qj7cg&usqp=CAU" height="30px" width="30px"/> <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <a onClick={()=>handleClick('en')}> English</a>
                  </li>
                  <li>
                  <a onClick={()=>handleClick('vi')}> Việt Nam</a>
                  </li>
                  <li>
                  </li>
                </ul>
            </div>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  <i className="fa fa-user-circle" /> {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"><i className="fa fa-user fa-fw"/>{t("User Profile")}</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory"><i className="fa fa-book"/> {t("Order History")}</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      <i className="fa fa-sign-out"/> {t("Sign Out")}
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"><i className="fa fa-sign-in"/> {t("Sign In")}</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  <i className="fa fa-user-plus"/> {t("Seller")} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller"><i className="fa fa-archive"/> {t("Products")}</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller"><i className="fa fa-credit-card"/> {t("Orders")}</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  <i className="fa fa-user-secret"/> {t("Admin")} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"><i className="fa fa-dashboard"/> {t("Dashboard")}</Link>
                  </li>
                  <li>
                    <Link to="/productlist"><i className="fa fa-archive"/> {t("Products")}</Link>
                  </li>
                  <li>
                    <Link to="/orderlist"><i className="fa fa-credit-card"/> {t("Orders")}</Link>
                  </li>
                  <li>
                    <Link to="/userlist"><i className="fa fa-user fa-fw"/> {t("Users")}</Link>
                  </li>
                  <li>
                    <Link to="/support"><i className="fa fa-support" />  {t("Support")}</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>{t("Categories")} </strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route 
            path="/search/name/:name?" 
            component={SearchScreen}
            exact
          ></Route>
          <Route 
            path="/search/category/:category" 
            component={SearchScreen}
            exact
          ></Route>
          <Route 
            path="/search/category/:category/name/:name" 
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
          <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
          <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
          <footer className="footer-distributed">

            <div className="footer-left">

              <h3>Book<span>Store</span></h3>

              <p className="footer-links">
              <a href="/" class="link-1">{t("Home")}</a>
          
                <a href="/search/name">{t("Search")}</a>
        
                <a href="/cart">{t("Cart")}</a>


              </p>

              <p className="footer-company-name">Company Name © 2021</p>
            </div>

            <div className="footer-center">

              <div>
                <i className="fa fa-map-marker"></i>
                <p><span>Số 20 Cộng Hòa</span> Phường 12, Tân Bình, Thành phố HCM</p>
              </div>

              <div>
                <i className="fa fa-phone"></i>
                <p>+84.914.789.787</p>
              </div>

              <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:sycap123@gmail.com">sycap123@gmail.com</a></p>
              </div>

            </div>

            <div className="footer-right">

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1061272290635!2d106.65024951486471!3d10.803183192303337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752e639bf01243%3A0x700ebdccb5a04987!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBHcmVlbndpY2ggVknhu4ZUIE5BTQ!5e0!3m2!1svi!2s!4v1634207683063!5m2!1svi!2s" width="600" height="400" style={{border:"0"}} allowfullscreen="" loading="lazy"></iframe>
              <div className="footer-icons">

                

              </div>

            </div>
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
            </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;