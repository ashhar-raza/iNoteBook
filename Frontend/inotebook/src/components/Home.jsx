import React, { useContext, useEffect } from "react";
import Notes from "./Notes";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";

function Home() {
  let navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      showAlert("info", "You need to log in to view your notes.");
    }
  }, []); // Only runs once when the component mounts

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="container my-3">
        {localStorage.getItem("token") ? (
          <Notes />
        ) : (
          <>
            <h2>Welcome Back! Sign In to Access Your Notes</h2>
            <div className="d-flex my-3">
              <h4>Click to login...</h4>
              <button className="btn btn-primary mx-4" onClick={handleClick}>
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
