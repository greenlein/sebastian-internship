import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import sliderSettings from "../UI/sliderSettings";
import axios from "axios";
import { useState, useEffect } from "react";
import CountdownRenderer from "../UI/CountdownRenderer";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const NewItems = () => {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`,
    );
    setNfts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      id="section-items"
      className="no-bottom"
      data-aos="fade-in"
      data-aos-delay="0"
      data-aos-duration="1000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading &&
            new Array(4).fill(0).map((_, index) => (
              <div
                className="nft__item"
                style={{
                  flex: "1 1 0",
                  height: "100%",
                  padding: "0",
                  marginRight: "10px",
                  flexDirection: "column",
                  display: "flex",
                }}
                key={index}
              >
                <div
                  className="author_list_pp skeleton-box"
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50px",
                    marginLeft: "1.5vw",
                    marginTop: "10px",
                  }}
                >
                  <div
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" alt="" />
                  </div>
                </div>

                <div
                  className="nft__item_wrap skeleton-box"
                  style={{
                    height: "230px",
                    width: "230px",
                    margin: "10px auto",
                    borderRadius: "12px",
                  }}
                >
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer"></a>
                        <a href="" target="_blank" rel="noreferrer"></a>
                        <a href=""></a>
                      </div>
                    </div>
                  </div>

                  <div className="skeleton-box">
                    <img
                      className="lazy nft__item_preview skeleton-box"
                      alt=""
                    />
                  </div>
                </div>

                <div
                  className="skeleton-box"
                  style={{
                    width: "150px",
                    margin: "0 0 10px 20px",
                    borderRadius: "3px",
                  }}
                ></div>
                <div
                  className="nft__item_price skeleton-box"
                  style={{
                    width: "80px",
                    margin: "0 0 20px 20px",
                    borderRadius: "3px",
                  }}
                ></div>
                <div className="nft__item_like"></div>
              </div>
            ))}
          {nfts.length > 0 && (
            <OwlCarousel {...sliderSettings}>
              {nfts &&
                nfts.map((nft) => (
                  <div className="nft__item" key={nft.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${nft.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={nft.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {nft.expiryDate && (
                      <CountdownRenderer expiryDate={nft.expiryDate} />
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${nft.authorId}`}>
                        <img
                          src={nft.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{nft.title}</h4>
                      </Link>
                      <div className="nft__item_price">{nft.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>69</span>
                      </div>
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

export default NewItems;
