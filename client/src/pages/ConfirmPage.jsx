import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { confirmUser } from "../actions/userActions";
import Meta from "../components/Meta";

const ConfirmPage = ({ navigate }) => {
  const dispatch = useDispatch();
  navigate = useNavigate();
  const { token } = useParams();
  const userConfrim = useSelector((state) => state.userConfrim); // get the userInfo to check if user is confirmed or not
  const { loading, error, isConfirmed } = userConfrim;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // confirm user once the email token is available
    dispatch(confirmUser(token, isLoggedIn));
  }, [dispatch, token, isLoggedIn]);

  if (loading || (!isConfirmed && !error)) {
    return <Loader />;
  } else if (error) {
    // redirect to login page after a 10 seconds
    setTimeout(() => {
      navigate("/login");
    }, 10000);
    return (
      <Message dismissable variant="danger" duration={10}>
        Verification Failed. Please try to loagin again.
      </Message>
    );
  } else if (isConfirmed) {
    // set a variable in local storage to fill email aftrer redirecting to login page after email confirmation
    localStorage.setItem("fillEmailOnLoginPage", "true");
    return (
      <Card style={{ border: "none", margin: "0 auto" }}>
        <Meta title="Confirm Password |Kosells" />
        <Card.Body>
          <Card.Text>Account Confirmed</Card.Text>
          <Card.Text>
            {setIsLoggedIn
              ? "Your account has been successfully verified! Go on and shop for the best deals of the day!"
              : `Your account has been successfully verified! Please login and start exploring the best deals on all your favorite products`}
          </Card.Text>
          {!setIsLoggedIn ? <Link to="/login">Login</Link> : null}
        </Card.Body>
      </Card>
    );
  }
};

export default ConfirmPage;
