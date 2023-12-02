import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";
  //   console.log(from);

  const handleGoogleSingnIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div className="text-center ">
      <div className="divider"></div>
      <button
        onClick={handleGoogleSingnIn}
        className="btn btn-circle btn-warning btn-outline"
      >
        <FaGoogle />
      </button>
    </div>
  );
};

export default SocialLogIn;
