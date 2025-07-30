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
  console.log(search);
  const loadData = async () => {
    let response = await fetch(`${apiUrl}/display`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response[0], response[1]);
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Header />

      <div>
        <Carousel
          data-bs-theme="dark"
          style={{ objectFit: "contain !important" }}
        >
          <Carousel.Item>
            <img
              style={{ maxHeight: "550px" }}
              className="d-block w-100"
              src="assets/images/concept-oriental-cuisine-uzbek-food-600nw-1748580797.webp"
              alt="First slide"
            />
            <Carousel.Caption>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="bg-danger text-white p-2 px-4 fs-5 fw-bold rounded"
                  type="submit"
                >
                  Search
                </button> */}
              </form>
              {/* <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ maxHeight: "550px" }}
              className="d-block w-100"
              src="assets/images/hot-fried-chicken-burger-banner-600nw-1508393192.webp"
              alt="Second slide"
            />
            <Carousel.Caption>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="bg-danger text-white p-2 px-4 fs-5 fw-bold rounded"
                  type="submit"
                >
                  Search
                </button> */}
              </form>
              {/* <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ maxHeight: "550px" }}
              className="d-block w-100"
              src="assets/images/The_10_Best_Pizza_Toppings_and_Why_They_Reign_Supreme.webp"
              alt="Third slide"
            />
            <Carousel.Caption>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="bg-danger text-white p-2 px-4 fs-5 fw-bold rounded"
                  type="submit"
                  name="search"
                >
                  Search
                </button> */}
              </form>
              {/* <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* <div>
        <Carusel />
      </div> */}
      <div className="container m-3">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div className="fs-3 text-start" key={data._id}>
                  {" "}
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            // foodName={filterItems.name}
                            options={filterItems.options[0]}
                            // imgSrc={filterItems.img}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>""</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""</div>
        )}
      </div>

      <Footer />
    </>
  );
}
