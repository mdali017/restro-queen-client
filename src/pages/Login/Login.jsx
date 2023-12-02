import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogIn from "../Home/Shared/SocialLogin/SocialLogIn";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";
  // console.log(from);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {/* <div className="hero bg-base-200"> */}
      <div>
        {/* <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"> */}
        <div className="w-4/12 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body bg-gray-600 w-11/12"
          >
            <h1 className="bg-gray-300 py-3 text-center font-semibold text-xl uppercase ">
              Please Log In
            </h1>
            <div className="form-control]">
              <label>
                <span className="text-black">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="w-full input input-bordered "
                required
              />
            </div>
            <div className="form-control">
              <label>
                <span className="text-black">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                className="w-full input input-bordered"
                required
              />
              <label className="label mt-0">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control ">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <small>
              New Here?
              <Link to="/signup" className="text-blue-500 ml-1 font-semibold">
                Please Register
              </Link>
            </small>
            <SocialLogIn />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
