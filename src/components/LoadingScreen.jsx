import React from "react";
import "../styles/loadingScreen.css";
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
  return (
    <div className="overlay">
      <Spinner animation="grow" variant="secondary" style={{color: "green"}} />
    </div>
  );
};

export default LoadingScreen;