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
  // let foodItem = props.foodItems;
  const handleAddToCart = async () => {
    alert("please logoin first");
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
        return;
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
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

  // setBtnEnable(true)
  const finalPrice = qty * parseInt(Options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      {" "}
      <div className="container">
        <div
          className="card my-5 mx-4"
          style={{ width: "18rem", minHeight: "380px" }}
        >
          <img
            style={{ height: "170px", objectFit: "fill" }}
            src={props.foodItem.img}
            class="card-img-top "
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{props.foodItem.name}</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="container w-100 ">
              <select
                className="m-2 h-100 bg-success rounded"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
                {/* <option value="half">Half</option>
                <option value="full">Full</option> */}
              </select>
              <div className="d-inline fs-5">Rs{finalPrice}/-</div>
              <hr className="text-dark fw-bolder"></hr>
              <div className="d-flex flex-row">
                <button className="btn btn-danger" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
