import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownRenderer from "../UI/CountdownRenderer";
import axios from "axios";

const ExploreItems = () => {
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [loadCounter, setLoadCounter] = useState(8);
  const [sortOption, setSortOption] = useState();

  useEffect(() => {
    async function fetchNfts() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${sortOption ? "?filter=" + sortOption : ""}`,
      );
      setNfts(data);
      setLoading(false);
    }
    setLoading(true);
    fetchNfts();
  }, [sortOption]);

  function handleSort(event) {
    setSortOption(event.target.value);
  }

  function handleLoadMore(event) {
    event.preventDefault(); // Prevents page reload if using a Link tag
    setLoadCounter((prevCount) => prevCount + 4);
  }

  return (
    <>
      <div>
        <select id="filter-items" value={sortOption} onChange={handleSort}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading &&
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div
                className="author_list_pp skeleton-box"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50px",
                }}
              ></div>
              <div className="nft__item_wrap" style={{ height: "240px" }}>
                <div
                  className="skeleton-box"
                  style={{
                    height: "270px",
                    width: "270px",
                    borderRadius: "8px",
                  }}
                >
                  <img className="lazy nft__item_preview" alt="" />
                </div>
              </div>
              <div
                className="nft__item_info"
                style={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="skeleton-box"
                  style={{ height: "18px", width: "140px" }}
                ></div>
                <div
                  className="nft__item_price skeleton-box"
                  style={{ height: "18px", width: "60px", marginTop: "10px" }}
                ></div>
              </div>
            </div>
          </div>
        ))}

      {nfts.length > 0 &&
        nfts.slice(0, loadCounter).map((nft) => (
          <div
            key={nft.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${nft.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
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
                      <a href="/" target="_blank" rel="noreferrer" alt="">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="/" target="_blank" rel="noreferrer" alt="">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="/" alt="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${nft.nftId}`}>
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
                  <span>{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="col-md-12 text-center">
        <Link
          to=""
          id="loadmore"
          className="btn-main lead"
          onClick={handleLoadMore}
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
