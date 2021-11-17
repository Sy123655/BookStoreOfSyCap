import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { useTranslation } from 'react-i18next';

export default function ProductScreen(props) {
  const { t } = useTranslation();
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() =>{
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
          }
        dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
          dispatch(
            createReview(productId, { rating, comment, name: userInfo.name })
          );
        } else {
          alert('Please enter comment and rating');
        }
      };
    return (
        <div>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
        <Link to="/"><h3><i className="fa fa-arrow-circle-left"/> {t("Back to Result")}</h3></Link>
        <div className="row top">
            <div className="col-2" style={{flex: "1 1 50rem", textAlign:"center"}}>
                <img className="large" src={product.image} alt={product.name}></img>
            </div>
            <div className="col-1">
                <ul>
                    <li>
                        <h1>{product.name}</h1>
                    </li>
                    <li>
                        
                    </li>
                    <div className="col-1">
               <div className="card card-body">
                <ul>
                <li>
                    {t("Seller")}{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating 
                        rating={product.rating}
                        numReviews={product.numReviews}
                        ></Rating>
                  </li>
                    <li>
                        <div className="row">
                            <div>{t("Price")}</div>
                            <div className="price">${product.price}</div>
                        </div>
                    </li>
                    <li>
                    <div className="row">
                            <div>{t("Status")}</div>
                            <div>
                                {product.countInStock > 0 ? (
                                    <span className="success">{t("In Stock")}</span>
                                ) : (
                                    <span className="danger">{t("Unavailable")}</span>
                                )}
                            </div>
                        </div>
                    </li>
                    {
                        product.countInStock > 0 && (
                        <>
                        <li>
                            <div className="row">
                                <div>{t("Qty")}</div>
                                <div>
                                    <select 
                                    value={qty}
                                     onChange={(e) => setQty(e.target.value)}
                                     >
                                         {[...Array(product.countInStock).keys()].map(
                                             (x) =>(
                                                 <option key={x + 1} value={x + 1}>{x + 1}</option>
                                             )
                                         )}
                                     </select>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button onClick={addToCartHandler} className="primary block">{t("Add to Cart")}</button>
                        </li>
                        </>
                        )
                    }
                </ul>   
                </div> 
            </div>
                </ul>
            </div>
            
        </div>
        <p 
          style={{textAlign:"center", marginTop:"30px"}}
        >
          -------------------------------------------------------------
          <h1>{t("Description")}</h1> 
        </p>
            <h3>{product.description}</h3>
        <div>
        <p 
          style={{textAlign:"center", marginTop:"30px"}}
        >
          -------------------------------------------------------------
          <h1 id="reviews">{t("Reviews")}</h1>
        </p>
            {product.reviews.length === 0 && (
              <MessageBox>{t("There is no review")}</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>{t("Write a customer review")}</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">{t("Rating")}</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">{t("Select")}...</option>
                        <option value="1">1- {t("Poor")}</option>
                        <option value="2">2- {t("Fair")}</option>
                        <option value="3">3- {t("Good")}</option>
                        <option value="4">4- {t("Very Good")}</option>
                        <option value="5">5- {t("Excelent")}</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">{t("Comment")}</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primarysubmit" type="submit">
                        {t("Submit")}
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    {t("Please")} <Link to="/signin">{t("Sign In")}</Link> {t("to write a review")}
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
    </div> 
    )}
  </div>
    
    );
}