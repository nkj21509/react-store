import React from "react";
import axios from "commons/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { email, passwords } = data;
      const res = await axios.post("/auth/login", { email, passwords });
      const jwtToken = res.data;
      console.log(jwtToken);
      global.auth.setToken(jwtToken) 
      toast.success('Login success')
      props.history.push('/');
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              name="email"
              placeholder="Email"
              ref={register({
                required: "email is required",
                pattern: {
                  value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                  message: "invalid email"
                }
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.passwords && "is-danger"}`}
              type="text"
              name="passwords"
              placeholder="Passwords"
              ref={register({
                required: true,
              })}
            />
            {errors.passwords && (
              <p className="helper has-text-danger">passwords is required</p>
            )}
          </div>
        </div>
        <button className="button is-primary is-fullwidth" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
