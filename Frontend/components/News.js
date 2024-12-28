import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const News = () => {
  const [news, setnews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/news")
      .then((res) => {
        // handle success
        console.log(res.data);
        setnews(res.data);
        //  console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const logout = (e) => {
    console.log("logging out");
    navigate("/signin");
  };
  return (
    <>
      <div className="container">
        <div class="row justify-content-between">
          <div class="col-11">
            <h1> Welcome to News Application</h1>
          </div>
          <div class="col-1">
            <button
              type="button"
              className="btn btn-dark mt-2"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row text-center">
          {news.map((val) => {
            return (
              <div className="col my-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={val.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{val.headline}</h5>
                    <p className="card-text">{val.description}</p>
                    <a
                      href={val.link}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Know More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
