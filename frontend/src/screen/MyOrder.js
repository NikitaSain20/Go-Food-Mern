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

      <div className="container py-4">
        <h2 className="text-center mb-4">jhjdfhdrder History</h2>
        <h2 className="text-center mb-4">jhjdfhdrder History</h2>

        {orderData &&
          Array.isArray(orderData) &&
          orderData.map(
            (data, index) =>
              data.orderData?.order_data &&
              data.orderData.order_data
                .slice(0)
                .reverse()
                .map((items, i) => (
                  <div key={`order-group-${index}-${i}`} className="mb-5">
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
                              key={`card-${index}-${i}-${j}`}
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
                                    {
                                      items.find((i) => i.Order_date)
                                        ?.Order_date
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                ))
          )}
      </div>

      <Footer />
    </div>
  );
}
