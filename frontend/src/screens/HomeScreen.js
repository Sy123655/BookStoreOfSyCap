import React, { useEffect } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { listTopSellers } from '../actions/userActions';
import { useTranslation } from 'react-i18next';



export default function HomeScreen() {
const { t } = useTranslation();
const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
const { loading, error, products } = productList;

const userTopSellersList = useSelector((state) => state.userTopSellersList);
const { 
  loading: loadingSellers, 
  error: errorSellers, 
  users: sellers,
} = userTopSellersList;


  useEffect(() =>{
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <h1>{t("Top Sellers")}</h1>
      {loadingSellers ? (
      <LoadingBox></LoadingBox>
    ) : errorSellers ? (
      <MessageBox variant="danger">{errorSellers}</MessageBox>
    ) : (
      <>
      {sellers.length === 0 && <MessageBox>{t("No Seller Found")}</MessageBox>}
      <div className="carousel">
      <Carousel showArrows autoPlay showThumbs={false}>
        {sellers.map((seller) =>(
          <div key={seller._id}>
            <Link to={`/seller/${seller._id}`}>
              <img src={seller.seller.logo} alt={seller.seller.name} style={{marginTop:"2.5rem", marginBottom: "2.5rem"}} />
              <p className="legend">{seller.seller.name}</p>
            </Link>
          </div>
        ))}
      </Carousel>
      </div>
      </>
      )}
      <h1>{t("Featured Products")}</h1>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <>
      {products.length === 0 && <MessageBox>{t("No Product Found")}</MessageBox>}
      <div className="row center">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      </>
    )}
  </div>
);
}