// file: /page/RegisterPage.js
import { useState, useEffect, useRef } from "react";
import {
  redirect,
  Link,
  useActionData,
  Form,
} from "react-router-dom";
import ROLES_LIST from "../utils/rolesList";

const RegisterPage = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const error = useActionData();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <>
      <div>
        <Form replace method="POST" className="login-form">
          <h1>Register New User</h1>
          <p ref={errRef} className={error?.msg ? "errmsg" : "hide"}>
            {error?.msg}
          </p>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              ref={emailRef}
              placeholder="youremail@site.com"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
                if (error?.msg) delete error.msg;
              }}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Your name"
              onChange={(e) => {
                setName(e.target.value);
                if (error?.msg) delete error.msg;
              }}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
                if (error?.msg) delete error.msg;
              }}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="rePassword">Retype-Password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={rePassword}
              placeholder="retype your password"
              autoComplete="off"
              onChange={(e) => {
                setRePassword(e.target.value);
                if (error?.msg) delete error.msg;
              }}
              required
            />
          </div>
          <button type="submit">Register</button>
        </Form>
      </div>
      <div>
        or <Link to="/login">Login</Link> if you alreay have an account.
      </div>
    </>
  );
};

export default RegisterPage;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");
  const rePassword = formData.get("rePassword");
  const error = {};
  if (rePassword !== password) {
    error.msg = "Error. password not match to the retype-password!";
  } else {
    try {
      let response = await fetch("/auth/register", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email,
          name,
          password,
          roles: { User: ROLES_LIST.User },
        }), // data type match "Content-Type" header
      });
      if (response.ok) {
        const data = await response.json();
        return redirect("/login");
      } else {
        let msgError = "Register new user: Failed ";
        if (response.status === 409) {
          msgError += "Email is already taken!";
        } else {
          msgError = (await response.json()).message;
          console.log(msgError);
        }
        error.msg = msgError;
      }
    } catch (error) {
      error.msg = "Error. Try again later (" + error + ")!";
    }
  }
  if (Object.keys("error").length) {
    return error;
  }
};
