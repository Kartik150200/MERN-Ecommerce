import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import googleLogo from "../assets/googleLogo.png";
import githubLogo from "../assets/githubLogo.png";
import twitterLogo from "..//assets/twitterLogo.png";
import linkedinLogo from "../assets/linkedinLogo.png";
import "../styles/social-login-options.css";

const SocialLoginOptions = () => {
  //   const baseURL = process.env.REACT_APP_BASE_URL;
  //   console.log(process.env.REACT_APP_BASE_URL);
  return (
    <div
      id="social-login"
      style={{
        margin: "1em 0",
        padding: "0",
      }}
    >
      <div className="social-login-container">
        <div className="social-login-line" />
        <p className="social-login-content">or Connect With</p>
        <div className="social-login-line" />
      </div>
      <Card.Body
        style={{
          margin: "0",
          padding: "0",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Link to="http://localhost:5000/api/auth/google/redirect">
          <Image
            rounded
            style={{
              width: "2.5em",
              height: "2.5em",
              objectFit: "cover",
            }}
            src={googleLogo}
          />
        </Link>
        <Link to="http://localhost:5000/api/auth/github/redirect">
          <Image
            rounded
            style={{
              width: "2.5em",
              height: "2.5em",
              objectFit: "cover",
            }}
            src={githubLogo}
          />
        </Link>
        <Link to="http://localhost:5000/api/auth/twitter/redirect">
          <Image
            rounded
            style={{
              width: "2.5em",
              height: "2.5em",
              objectFit: "cover",
            }}
            src={twitterLogo}
          />
        </Link>
        <Link to="https://www.linkedin.com">
          <Image
            rounded
            style={{
              width: "2.5em",
              height: "2.5em",
              objectFit: "cover",
            }}
            src={linkedinLogo}
          />
        </Link>
      </Card.Body>
    </div>
  );
};

export default SocialLoginOptions;
