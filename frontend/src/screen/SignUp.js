import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../config/Api";
export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [location, setlocation] = useState("");
  const navigate = useNavigate("");
  // const [credentials, setcredentials] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   location: "",
  // });
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        location: location,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("enter valid creditentials");
    }
    if (json.success) {
      navigate("/login");
    }
  };

  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3 text-start">
              <label htmlFor="name" className="text-start fs-5">
                Enter Your Name:
              </label>
              <input
                type="text"
                className="form-control fs-5"
                name="name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                // value={credentials.name}

                // onChange={onchange}
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label fs-5">
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
                // value={credentials.email}
                // onChange={onchange}
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label fs-5">
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

            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="fs-5 form-label ">
                Enter Your Location:
              </label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={location}
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                // value={credentials.location}
                // onChange={onchange}
              />
            </div>
            <button
              type="submit"
              className="m-3 text-light fs-5 mx-2 btn btn-success fw-bold p-2"
            >
              Submit
            </button>
            <Link
              to="/login"
              className="m-3 text-light fs-5 mx-2 btn btn-danger fw-bold p-2"
            >
              Already a User
            </Link>
          </form>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
}
