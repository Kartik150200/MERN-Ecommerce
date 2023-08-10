import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listAllUsers, deleteUser, refreshLogin } from "../actions/userActions";
import Paginate from "../components/Paginate";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserListPage = ({ navigate }) => {
  const { pageNumber } = useParams();
  const pageNumber1 = pageNumber || 1; // to fetch various pages of orders
  const dispatch = useDispatch();
  navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, users, error, page, pages, total } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: userLoginError } = userDetails;

  useEffect(() => {
    if (userLoginError && userInfo && !userInfo.isSocialLogin) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user && dispatch(refreshLogin(user.email));
    }
  }, [userLoginError, dispatch, userInfo]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) dispatch(listAllUsers(pageNumber1));
    else navigate("/login");
  }, [dispatch, navigate, userInfo, successDelete, pageNumber1]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete"))
      dispatch(deleteUser(id));
  };
  return (
    <>
      <h1>Users ({`${total || 0}`})</h1>
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CONFIRMED</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <Link to={`mailto:${user.email}`}>{user.email}</Link>
                    </td>
                    <td>
                      {user.isConfirmed ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="link" className="btn-sm">
                          <EditIcon />
                        </Button>
                      </LinkContainer>
                      <Button
                        className="btn-sm"
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} forUsers={true} />
    </>
  );
};

export default UserListPage;
