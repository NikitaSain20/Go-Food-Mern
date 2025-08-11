import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "react-bootstrap/Carousel";
import { apiUrl } from "../config/Api";

export default function Home() {
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      let response = await fetch(`${apiUrl}/display`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      setfoodItem(response[0]);
      setfoodCat(response[1]);
    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Header />

      {/* Carousel Section */}
      <div>
        <Carousel
          data-bs-theme="dark"
          style={{ objectFit: "contain !important" }}
        >
          {[
            "assets/images/concept-oriental-cuisine-uzbek-food-600nw-1748580797.webp",
            "assets/images/hot-fried-chicken-burger-banner-600nw-1508393192.webp",
            "assets/images/The_10_Best_Pizza_Toppings_and_Why_They_Reign_Supreme.webp",
          ].map((src, index) => (
            <Carousel.Item key={index}>
              <img
                style={{ maxHeight: "550px" }}
                className="d-block w-100"
                src={src}
                alt={`Slide ${index + 1}`}
              />
              <Carousel.Caption>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Food Categories & Items */}
      <div className="container m-3">
        {loading ? (
          // Skeleton while loading
          <>
            <Skeleton height={30} width={200} style={{ marginBottom: 10 }} />
            <div className="row">
              {[...Array(4)].map((_, i) => (
                <div className="col-12 col-md-6 col-lg-3 mb-3" key={i}>
                  <Skeleton height={200} />
                </div>
              ))}
            </div>
          </>
        ) : (
          // Actual data after loading
          foodCat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 text-start">{data.CategoryName}</div>
              <hr />
              {foodItem
                .filter(
                  (item) =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filterItems) => (
                  <div
                    key={filterItems._id}
                    className="col-12 col-md-6 col-lg-3"
                  >
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                    />
                  </div>
                ))}
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}
