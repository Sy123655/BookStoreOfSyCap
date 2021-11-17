import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Rating(props) {
    const { t } = useTranslation();
    const { rating, numReviews, caption } = props;
    return (
    <div className="rating">
        <span> <i className={
            rating >=1
            ?"fa fa-star"
            : rating>=0.5
            ?'fa fa-star-half-o'
            :'fa fa-star-o'}>
                </i> 
        </span>
        <span> <i className={
            rating >=2
            ?"fa fa-star"
            : rating>=1.5
            ?'fa fa-star-half-o'
            :'fa fa-star-o'}>
                </i> 
        </span>
        <span> <i className={
            rating >=3
            ?"fa fa-star"
            : rating>=2.5
            ?'fa fa-star-half-o'
            :'fa fa-star-o'}>
                </i> 
        </span>
        <span> <i className={
            rating >=4
            ?"fa fa-star"
            : rating>=3.5
            ?'fa fa-star-half-o'
            :'fa fa-star-o'}>
                </i> 
        </span>
        <span> 
            <i className={
            rating >=5
            ?"fa fa-star"
            : rating>=4.5
            ?'fa fa-star-half-o'
            :'fa fa-star-o'}>
                </i> 
        </span>
        {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + ' ' + t("Reviews")}</span>
      )}
    </div>


    )
}