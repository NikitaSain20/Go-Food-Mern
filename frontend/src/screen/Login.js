import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config/Api";
export default function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("authtoken", json.authtoken);
      navigate("/");
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3 text-start">
              <label
                htmlFor="email"
                className="form-label fs-5 text-white align"
              >
                Enter Your Email address:
              </label>
              <input
                type="email"
                className="form-control fs-5"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 align text-start">
              <label
                htmlFor="password"
                className="form-label fs-5 text-white text-start"
                // style={{ textAlign: "left" }}
              >
                Enter Your Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                // value={credentials.password}
                // onChange={onchange}
              />
            </div>

            <button
              type="submit"
              className="m-3 text-white fs-5 mx-2 btn btn-success fw-bold p-2"
            >
              Submit
            </button>
            <Link
              to="/signup"
              className="m-3 text-light fs-5 mx-2 btn btn-danger fw-bold p-2"
            >
              I am a new user
            </Link>
          </form>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
}
