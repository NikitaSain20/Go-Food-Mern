import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CardReducer";
import Modal from "../Modal";
import Cart from "../screen/Cart";

export default function Header() {
  const data = useCart();
  const nav = useNavigate();
  const [cartView, setCartView] = useState(false);
  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    nav("/");
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-danger">
        <div class="container-fluid">
          <Link
            class="navbar-brand text-success fs-1 fst-italic fw-bold"
            to="/"
          >
            GO FOOD
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            {/* <div class="navbar-nav"> */}
            <ul className="navbar-nav me-auto">
              <li>
                <Link
                  class="nav-link text-white fs-4 fw-bold"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authtoken") ? (
                <div>
                  <Link
                    class="nav-link text-white fs-4 mx-2 fw-bold"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </ul>
            {!localStorage.getItem("authtoken") ? (
              <div className="d-flex me-5">
                <Link
                  class="text-success fs-5 mx-2 btn btn-light fw-bold p-2"
                  to="/signup"
                >
                  SignUp
                </Link>
                <Link
                  class="text-success fs-5 mx-2 btn btn-light fw-bold p-2"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="d-flex me-5">
                <Link
                  class="text-white fs-2 mx-2 btn  fw-bold p-2"
                  to="/"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  <i class="bi bi-cart-dash-fill f-3 position-relative"></i>
                  {/* <ShoppingCarzzt /> */}
                  {/* <Badge bg="danger" className="ms-2"> */}
                  <span className="text-success fs-4 position-absolute top-25 mb-5  p-1">
                    {data.length}
                  </span>
                  {/* </Badge> */}
                </Link>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart className="h-5"></Cart>
                  </Modal>
                ) : (
                  ""
                )}

                <button
                  class="text-white fs-5 mx-2 btn  fw-bold p-2"
                  onClick={handlelogout}
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
