import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apiUrl } from "../config/Api";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch(`${apiUrl}/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const response = await res.json();
      console.log(response, "response");

      // Store only the actual order array
      setOrderData(response.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Header />

      <div className="container py-4">
        <h2 className="text-center mb-4">Order History</h2>

        {orderData.length > 0 ? (
          orderData
            .slice(0)
            .reverse()
            .map((items, i) => (
              <div key={`order-group-${i}`} className="mb-5">
                {items.some((item) => item.Order_date) && (
                  <div className="text-center">
                    <h4 className="text-primary fw-bold">
                      {items.find((item) => item.Order_date)?.Order_date}
                    </h4>
                    <hr className="w-25 mx-auto" />
                  </div>
                )}

                <div className="row g-4 justify-content-center">
                  {items.map(
                    (item, j) =>
                      !item.Order_date && (
                        <div
                          className="col-12 col-sm-6 col-md-4 col-lg-3"
                          key={`card-${i}-${j}`}
                        >
                          <div className="card shadow-sm border-0 h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                              <h5 className="card-title text-truncate">
                                {item.name}
                              </h5>
                              <div className="d-flex flex-wrap justify-content-between my-2">
                                <span className="badge bg-secondary">
                                  Qty: {item.qty}
                                </span>
                                <span className="badge bg-info text-dark">
                                  Size: {item.size}
                                </span>
                                <span className="badge bg-success">
                                  ₹{item.price}/-
                                </span>
                              </div>
                              <div className="text-end text-muted small">
                                <i className="bi bi-calendar3"></i>{" "}
                                {items.find((i) => i.Order_date)?.Order_date}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>
            ))
        ) : (
          <p className="text-center text-muted">No orders found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
