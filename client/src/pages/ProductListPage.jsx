import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import { refreshLogin, getUserDetails } from "../actions/userActions";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductListPage = ({ navigate }) => {
  const { pageNumber } = useParams();
  const pageNumber1 = pageNumber || 1;
  const dispatch = useDispatch();
  navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  // fetch user login info
  useEffect(() => {
    userInfo
      ? userInfo.isSocialLogin
        ? dispatch(getUserDetails(userInfo.id))
        : dispatch(getUserDetails("profile"))
      : dispatch(getUserDetails("profile"));
  }, [userInfo, dispatch]);

  // refresh token for expired access tokens
  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo.isAdmin) navigate("/login");
    dispatch({ type: PRODUCT_CREATE_RESET }); //reset the new product detail
    if (successCreate) navigate(`/admin/product/${createdProduct._id}/edit`);
    else dispatch(listProducts("", pageNumber1, 10)); // 3rd parameter is the no of products to be listed per page
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber1,
  ]);

  // delete product after confirming
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?"))
      dispatch(deleteProduct(id));
  };

  // create a new dummy product
  const handleCreateProduct = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="my-3"
            style={{ padding: "0.5em 1em" }}
            onClick={handleCreateProduct}
          >
            <AddIcon /> Create Product
          </Button>
        </Col>
      </Row>
      {errorDelete && (
        <Message dismissable variant="danger" duration={10}>
          {errorDelete}
        </Message>
      )}
      {errorCreate && (
        <Message dismissable variant="danger" duration={10}>
          {errorCreate}
        </Message>
      )}
      {loading || loadingCreate || loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message dismissable variant="danger" duration={10}>
          {error}
        </Message>
      ) : (
        <>
          <Table striped bordered responsive className="table-sm text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>
                        {product.price &&
                          product.price.toLocaleString("en-IN", {
                            maximumFractionDigits: 2,
                            style: "currency",
                            currency: "INR",
                          })}
                      </td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>

                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button variant="link" className="btn-sm">
                            <EditIcon />
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn-sm"
                          onClick={() => handleDelete(product._id)}
                          variant="danger"
                        >
                          <DeleteIcon
                            style={{ padding: "0", fontSize: "0.9em" }}
                          />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListPage;
