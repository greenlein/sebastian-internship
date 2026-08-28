import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const TopSellers = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    setNfts(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-12"
            data-aos="fade-in"
            data-aos-delay="0"
            data-aos-duration="1000"
          >
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading &&
                new Array(12).fill(null).map((_, index) => (
                  <li key={index}>
                    <div style={{ display: "flex" }}>
                      <div
                        className="author_list_pp skeleton-box"
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50px",
                          overflow: "visible",
                        }}
                      >
                        <i className="fa fa-check"></i>
                      </div>
                      <div
                        className="author_list_info"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: "10px",
                        }}
                      >
                        <div
                          className="skeleton-box"
                          style={{ width: "100px", height: "20px" }}
                        ></div>
                        <span
                          className="skeleton-box"
                          style={{
                            width: "50px",
                            height: "20px",
                            marginTop: "10px",
                          }}
                        ></span>
                      </div>
                    </div>
                  </li>
                ))}

              {nfts &&
                nfts.map((nft) => (
                  <li key={nft.id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${nft.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={nft.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${nft.authorId}`}>
                        {nft.authorName}
                      </Link>
                      <span>{nft.price} ETH</span>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
