import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apiUrl } from "../config/Api";
export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    await fetch(`${apiUrl}/myOrderData`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="container">
        <div className="row">
          {orderData &&
            Array.isArray(orderData) &&
            orderData.map(
              (data, index) =>
                data.orderData?.order_data &&
                data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((items, i) => (
                    <React.Fragment key={`${index}-${i}`}>
                      {items.map((arrayData, j) => {
                        if (arrayData.Order_date) {
                          return (
                            <div
                              className="col-12 mt-5"
                              key={`date-${index}-${i}-${j}`}
                            >
                              <h5 className="text-center">
                                {arrayData.Order_date}
                              </h5>
                              <hr />
                            </div>
                          );
                        } else {
                          return (
                            <div
                              className="col-12 col-md-6 col-lg-3"
                              key={`card-${index}-${i}-${j}`}
                            >
                              <div
                                className="card mt-3"
                                style={{ width: "16rem", maxHeight: "360px" }}
                              >
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {arrayData.name}
                                  </h5>
                                  <div
                                    className="container w-100 p-0 d-flex justify-content-between align-items-center"
                                    style={{ height: "38px" }}
                                  >
                                    <span>{arrayData.qty}</span>
                                    <span>{arrayData.size}</span>
                                    <span>₹{arrayData.price}/-</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </React.Fragment>
                  ))
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
