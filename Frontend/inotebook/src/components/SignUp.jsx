import React, { useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/alertContext";
function SignUp() {
  const [data, setData] = useState(null);
  let navigate = useNavigate();
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POSt",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        navigate("/login");
        showAlert("success" , "Account created Successfully")
      }
      else
      {
        showAlert("danger" , "Invalid value");
      }
    } catch (error) {
      console.log(error);
  
    }
  };

  const onChange = (e) => {
    setData((prevInp) => ({
      ...prevInp,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="container mt-3">
      <h2>Create an Account and Start Storing Your Ideas Securely</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
