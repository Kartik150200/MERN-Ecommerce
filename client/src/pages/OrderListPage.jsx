import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col, Tab } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { refreshLogin } from "../actions/userActions";
import { listAllOrders } from "../actions/orderActions";
import getDateString from "../utils/getDateString";
import CloseIcon from "@mui/icons-material/Close";

const OrderListPage = ({ navigate }) => {
  const { pageNumber } = useParams();
  const pageNumber1 = pageNumber || 1;
  const dispatch = useDispatch();
  navigate = useNavigate();
  const orderListAll = useSelector((state) => state.orderListAll);
  const { loading, orders, error, page, pages, total } = orderListAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  // refresh access tokens aif user details are failed
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  // get all orders by pagenumber
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(listAllOrders(pageNumber1));
    else navigate("/login");
  }, [dispatch, navigate, userInfo, pageNumber1]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>ALL Orders ({`${total || 0}`})</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message dismissable variant="danger" duration={10}>
          {error}
        </Message>
      ) : (
        <Table striped bordered responsive className="table-sm text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>TOTAL</th>
              <th>DATE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>
                      {order.totalPrice.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </td>
                    <td>{getDateString(order.createdAt)}</td>
                    <td>
                      {order.isPaid ? (
                        getDateString(order.paidAt)
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        getDateString(order.delliveredAt)
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button variant="flush" className="btn-sm">
                          View Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} forOrders={true} />
    </>
  );
};

export default OrderListPage;
