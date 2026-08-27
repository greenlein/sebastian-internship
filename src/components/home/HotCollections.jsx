import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import sliderSettings from "../UI/sliderSettings";

const HotCollections = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`,
    );
    setNfts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading &&
            new Array(4).fill(null).map((_, i) => (
              <div
                className="nft_coll"
                key={i}
                style={{ flex: "1 1 0", height: "100%", padding: "0" }}
              >
                <div
                  className="nft_wrap skeleton-box"
                  style={{ height: "200px" }}
                >
                  <img className="lazy img-fluid" alt="" />
                </div>
                <div
                  className="nft_coll_pp skeleton-box"
                  style={{ height: "60px", borderRadius: "50px" }}
                ></div>
                <div
                  className="nft_coll_info"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="skeleton-box"
                    style={{ width: "30%", marginBottom: "8px" }}
                  ></div>
                  <span
                    className="skeleton-box"
                    style={{ width: "20%" }}
                  ></span>
                </div>
              </div>
            ))}

          {nfts.length > 0 && (
            <OwlCarousel {...sliderSettings}>
              {nfts.map((nft) => (
                <div className="nft_coll" key={nft.id}>
                  <div className="nft_wrap">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img
                        src={nft.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${nft.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={nft.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nft.title}</h4>
                    </Link>
                    <span>ERC-{nft.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
