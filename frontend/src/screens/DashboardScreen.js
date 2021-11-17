import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useTranslation } from 'react-i18next';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>{t("Dashboard")}</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> {t("Users")}
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> {t("Orders")}
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> {t("Sales")}
                </span>
              </div>
              <div className="summary-body">
                $
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>{t("Sales")}</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>{t("No Sale")}</MessageBox>
              ) : (
                <div style={{boxShadow:"10px 10px 5px 5px #888888", width: "180rem", marginBottom: "3rem", marginLeft:"3rem"}}>
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>{t("Loading Chart")}</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2>{t("Categories")}</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>{t("No Category")}</MessageBox>
            ) : (
              <div style={{boxShadow:"10px 10px 5px 5px #888888", width: "180rem", marginBottom: "3rem", marginLeft:"3rem"}}>
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>{t("Loading Chart")}</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}