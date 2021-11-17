import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useTranslation } from 'react-i18next';

export default function OrderHistoryScreen(props) {
    const { t } = useTranslation();
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            <h1>{t("Order History")}</h1>
            {loading? <LoadingBox></LoadingBox>:
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{t("Date")}</th>
                            <th>{t("Total")}</th>
                            <th>{t("Pail")}</th>
                            <th>{t("Delivered")}</th>
                            <th>{t("Action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            
            }
        </div>
    )
}