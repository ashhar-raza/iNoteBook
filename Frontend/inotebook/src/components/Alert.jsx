import React, { useContext } from "react";
import AlertContext from "../context/alert/alertContext";
function Alert() {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  const capitalize = (word) => {
    if(word === "danger")
    {
      word = "error";
    }
    if(word === "info")
    {
      word = "";
      return;
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + '!';
  };
  return (
    <>
      <div style={{ height: "50px" }}>
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(alert.type)} </strong>{alert.msg}

          </div>
        )}
      </div>
    </>
  );
}

export default Alert;
