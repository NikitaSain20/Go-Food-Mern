import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./CardReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  let data = useCart();
  let Options = props.options || {};
  const priceRef = useRef();
  let priceOptions = Object.keys(Options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [showMessage, setShowMessage] = useState(false); // For toast message

  const finalPrice = qty * parseInt(Options[size]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please Sign Up or log in first to add items to the cart.");
      return;
    }
    // Your existing add-to-cart logic
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }

    // Show success message
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="container">
      <div
        className="card my-5 mx-4"
        style={{ width: "18rem", minHeight: "380px", position: "relative" }}
      >
        <img
          style={{ height: "170px", objectFit: "fill" }}
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="container w-100">
            <select
              className="m-2 p-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 p-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline fs-5">Rs{finalPrice}/-</div>
            <hr className="text-dark fw-bolder"></hr>
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showMessage && (
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#d4edda",
              color: "#155724",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "16px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            ✅ Item added to cart
          </div>
        )}
      </div>
    </div>
  );
}
