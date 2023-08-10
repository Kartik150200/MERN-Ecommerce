import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, InputGroup, FloatingLabel } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { resetUserPassword } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const PasswordResetPage = ({ navigate }) => {
  const [name, setName] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [message, setMessage] = useState(null);
  const [confirmPassword, setConfrimPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  navigate = useNavigate();
  const { token } = useParams();
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, resetPassord, error } = userResetPassword;

  // get the name stored in the local storage and ask that user to reset password
  useEffect(() => {
    const nameFromLocalStorage = localStorage.getItem("EcommerceUserName");
    if (nameFromLocalStorage) {
      setName(nameFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (resetPassord) {
      setTimeout(() => {
        navigate("/login");
      }, 10000);
    }
  }, [navigate, resetPassord]);

  const showHidePassword = (e) => {
    e.preventDefault();
    e.stopPrapagation();
    setTypePassword(typePassword === "password" ? "text" : "password");
  };

  const showHideConfirmPassword = (e) => {
    e.preventDefault();
    e.stopPrapagation();
    setTypeConfirmPassword(
      typeConfirmPassword === "password" ? "text" : "password"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please retry");
    } else {
      dispatch(resetUserPassword(token, password));
    }
  };
  return (
    <FormContainer>
      <h1>{name ? `${name}, reset password` : `Reset Password`}</h1>
      {message && (
        <Message dismissable duration={8} variant="warning">
          {message}
        </Message>
      )}
      {resetPassord && (
        <Message dismissable variant="success" duration={8}>
          {error}
        </Message>
      )}
      {error && (
        <Message dismissable variant="danger">
          {error}
        </Message>
      )}
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit} style={{ width: "33em" }}>
          <Form.Group className="mb-2">
            <InputGroup style={{ width: "100%" }}>
              <FloatingLabel
                controlId="passwordinput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  size="lg"
                  type={typePassword}
                  placeholder="Enter your password"
                  value={password}
                  style={{
                    borderRight: "none",
                    width: "205%",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
              <div className="input-group-append">
                <InputGroup.Text
                  onClick={showHidePassword}
                  style={{
                    paddingLeft: "1em",
                    fontSize: "1rem",
                    width: "17.5%",
                    height: "78%",
                    marginLeft: "15rem",
                    background: "transparent",
                  }}
                >
                  {typePassword === "text" ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputGroup.Text>
              </div>
            </InputGroup>
          </Form.Group>
          <Form.Group className="my-2">
            <InputGroup style={{ width: "100%" }}>
              <FloatingLabel
                controlId="confirmpasswordinput"
                label="Confrim Password"
                className="mb-3"
              >
                <Form.Control
                  size="lg"
                  type={typeConfirmPassword}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  style={{ borderRight: "none", width: "205%" }}
                  onChange={(e) => setConfrimPassword(e.target.value)}
                />
              </FloatingLabel>
              <div className="input-group-append">
                <InputGroup.Text
                  onClick={showHideConfirmPassword}
                  style={{
                    paddingLeft: "1em",
                    fontSize: "1rem",
                    width: "17.5%",
                    height: "78%",
                    marginLeft: "15rem",
                    background: "transparent",
                  }}
                >
                  {typeConfirmPassword === "text" ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </InputGroup.Text>
              </div>
            </InputGroup>
          </Form.Group>
          <Button
            type="submit"
            style={{
              padding: "0.5em 1em",
              width: "8rem",
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default PasswordResetPage;
