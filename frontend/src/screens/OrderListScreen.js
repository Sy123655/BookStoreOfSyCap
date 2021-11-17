import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import { useTranslation } from 'react-i18next';

export default function OrderListScreen(props){
    const { t } = useTranslation();
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const { 
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete
    } = orderDelete;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
    const deleteHandler = (order) =>{
        if(window.confirm('Are you sure to delete')) {
            dispatch(deleteOrder(order._id));
        }
    }
    return (
        <div>
            <div>
            <h1>{t("Orders")}</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading? <LoadingBox></LoadingBox>:
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{t("User")}</th>
                            <th>{t("Date")}</th>
                            <th>{t("Total")}</th>
                            <th>{t("Paid")}</th>
                            <th>{t("Delivered")}</th>
                            <th>{t("Action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt}</td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>{order.isDelivered
                                ? order.deliveredAt.substring(0, 10)
                                : 'No'}
                                </td>
                                <td>
                                    <button type="button" className="small"
                                        onClick={() => {props.history.push(`/order/${order._id}`)}}>
                                            {t("Details")}
                                    </button>
                                    <button 
                                        type="button"
                                        className="small"
                                        onClick={() =>deleteHandler(order)}
                                    >{t("Delete")}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            
            }
        </div>
        </div>
    )
}