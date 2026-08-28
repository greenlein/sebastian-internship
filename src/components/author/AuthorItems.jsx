import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

const AuthorItems = () => {
  const { authorId } = useParams();
  const [nfts, setNfts] = useState([]);
  const [authorImage, setAuthorImage] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
    );
    setNfts(data.nftCollection);
    setAuthorImage(data.authorImage);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading &&
            new Array(12).fill(0).map((_, index) => (
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

          {new Array(8).fill(0).map((_, index) => "")}
          {nfts.length > 0 &&
            nfts.map((nft) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={nft.id}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to="">
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
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
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img
                        src={nft.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nft.nftId}`}>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
