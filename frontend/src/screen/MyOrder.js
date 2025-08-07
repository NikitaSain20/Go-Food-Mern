// import React, { useEffect, useState } from "react";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import { apiUrl } from "../config/Api";
// export default function MyOrder() {
//   const [orderData, setorderData] = useState({});

//   const fetchMyOrder = async () => {
//     await fetch(`${apiUrl}/myOrderData`, {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: localStorage.getItem("userEmail"),
//       }),
//     }).then(async (res) => {
//       let response = await res.json();
//       await setorderData(response);
//     });
//   };

//   useEffect(() => {
//     fetchMyOrder();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Header />
//       </div>

//       <div className="container py-4">
//         <h2 className="text-center mb-4">jhjdfhdrder History</h2>
//         <h2 className="text-center mb-4">jhjdfhdrder History</h2>

//         {orderData &&
//           Array.isArray(orderData) &&
//           orderData.map(
//             (data, index) =>
//               data.orderData?.order_data &&
//               data.orderData.order_data
//                 .slice(0)
//                 .reverse()
//                 .map((items, i) => (
//                   <div key={`order-group-${index}-${i}`} className="mb-5">
//                     {items.some((item) => item.Order_date) && (
//                       <div className="text-center">
//                         <h4 className="text-primary fw-bold">
//                           {items.find((item) => item.Order_date)?.Order_date}
//                         </h4>
//                         <hr className="w-25 mx-auto" />
//                       </div>
//                     )}
//                     <div className="row g-4 justify-content-center">
//                       {items.map(
//                         (item, j) =>
//                           !item.Order_date && (
//                             <div
//                               className="col-12 col-sm-6 col-md-4 col-lg-3"
//                               key={`card-${index}-${i}-${j}`}
//                             >
//                               <div className="card shadow-sm border-0 h-100">
//                                 <div className="card-body d-flex flex-column justify-content-between">
//                                   <h5 className="card-title text-truncate">
//                                     {item.name}
//                                   </h5>
//                                   <div className="d-flex flex-wrap justify-content-between my-2">
//                                     <span className="badge bg-secondary">
//                                       Qty: {item.qty}
//                                     </span>
//                                     <span className="badge bg-info text-dark">
//                                       Size: {item.size}
//                                     </span>
//                                     <span className="badge bg-success">
//                                       ₹{item.price}/-
//                                     </span>
//                                   </div>
//                                   <div className="text-end text-muted small">
//                                     <i className="bi bi-calendar3"></i>{" "}
//                                     {
//                                       items.find((i) => i.Order_date)
//                                         ?.Order_date
//                                     }
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )
//                       )}
//                     </div>
//                   </div>
//                 ))
//           )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apiUrl } from "../config/Api";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
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
    setOrderData(response);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Header />

      <div
        className="container py-5"
        style={{ backgroundColor: "#f1f3f5", borderRadius: "12px" }}
      >
        <h2 className="text-center mb-4 fw-bold display-6 text-dark">
          My Order History
        </h2>
        <hr className="w-25 mx-auto mb-4 text-primary" />

        {orderData && Array.isArray(orderData) && orderData.length > 0 ? (
          orderData.map(
            (data, index) =>
              data.orderData?.order_data &&
              data.orderData.order_data
                .slice(0)
                .reverse()
                .map((items, i) => (
                  <div key={`order-group-${index}-${i}`} className="mb-5">
                    {items.some((item) => item.Order_date) && (
                      <div className="text-center mb-3">
                        <h4
                          className="fw-semibold"
                          style={{ color: "#5c7cfa" }}
                        >
                          {items.find((item) => item.Order_date)?.Order_date}
                        </h4>
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
                              <div
                                className="card shadow-sm border-0 h-100"
                                style={{
                                  borderRadius: "16px",
                                  backgroundColor: "#fff3bf",
                                }}
                              >
                                <div className="card-body d-flex flex-column justify-content-between">
                                  <h5 className="card-title text-truncate text-danger fw-bold mb-3">
                                    {item.name}
                                  </h5>
                                  <div className="d-flex flex-wrap gap-2 mb-3">
                                    <span className="badge bg-dark text-light">
                                      Qty: {item.qty}
                                    </span>
                                    <span className="badge bg-warning text-dark">
                                      Size: {item.size}
                                    </span>
                                    <span className="badge bg-success">
                                      ₹{item.price}/-
                                    </span>
                                  </div>
                                  <div className="text-end text-muted small">
                                    <i className="bi bi-calendar3 me-1"></i>
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
          )
        ) : (
          <div className="text-center mt-5 text-muted fs-5">
            <i className="bi bi-emoji-frown me-2"></i>No order history found.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
