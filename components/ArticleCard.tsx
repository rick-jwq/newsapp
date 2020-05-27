import React, { useState } from "react";
import { Card, Toast } from "react-bootstrap";
// import "./index.css";
import {
  FaRegBookmark,
  FaBookmark,
  FaAngleDown,
  FaAngleUp
} from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton
} from "react-share";
import { Article } from "../interfaces/article";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import CommentBox from "./comment";
import ReactTooltip from "react-tooltip";
import { useViewPort } from "../contexts/ViewPort";
interface ArticleProps {
  article: Article | undefined;
  isLoading: boolean;
}
const override = css`
  display: block;
  margin-top: 300px;
  margin-left: auto;
  margin-right: auto;
  border-color: blue;
`;

const ArticleCard: React.FC<ArticleProps> = ({ article, isLoading }) => {
  //   let savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  let savedBookmarks = JSON.parse("[]");
  const [saved, setSaved] = useState();
  const [show, setShow] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const { width } = useViewPort();
  const breakpoint = 970;
  let _title: string,
    _description: string,
    _date: string,
    _img: string,
    _url: string,
    _id: string,
    _section: string;
  _title = _description = _date = _img = _url = _id = _section = "";

  let sentences, moreToShow, period, desc4Lines, restOfLines;
  if (article) {
    const { title, description, date, img, url, id, section } = article;
    _title = title;
    _description = description;
    _date = date;
    _img = img;
    _url = url;
    _id = id;
    _section = section;

    sentences = _description.split(". ");
    moreToShow = sentences.length > 4;
    period = sentences.length > 4 ? ". " : "";
    desc4Lines = sentences.slice(0, 4).join(". ") + period;
    restOfLines = showArrow ? "" : sentences.slice(4).join(". ");
  }

  const hashtags = ["CSCI_571_NewsApp"];
  if (isLoading) {
    return (
      <div>
        <BounceLoader
          css={override}
          size={30}
          color={"#123abc"}
          loading={isLoading}
        />
        <h6 style={{ textAlign: "center", fontWeight: "bold" }}>Loading</h6>
      </div>
    );
  } else if (reloaded === false && isLoading === false) {
    const found: boolean =
      savedBookmarks.find((item: any) => {
        return article && article.id === item.id;
      }) !== undefined;
    setSaved(found);
    setReloaded(true);
  }

  const bookmarkIcon =
    saved === false && isLoading === false ? (
      <>
        <FaRegBookmark
          className="bookmarkIcon"
          data-tip="Bookmark"
          onClick={() => onChangeBookmark()}
        />
      </>
    ) : (
      <>
        <FaBookmark
          className="bookmarkIcon"
          data-tip="Bookmark"
          onClick={() => onChangeBookmark()}
        />
      </>
    );

  const onChangeBookmark = () => {
    setShow(true);
    if (saved === true) {
      savedBookmarks = savedBookmarks.filter((e: any) => {
        return e.id !== _id;
      });

      setSaved(false);
    } else {
      savedBookmarks.push({
        id: _id,
        img: _img,
        title: _title,
        url: _url,
        date: _date,
        section: _section.toUpperCase()
      });
      setSaved(true);
    }
    const newBookmarks = JSON.stringify(savedBookmarks);
    localStorage.setItem("bookmarks", newBookmarks);
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="articleCard">
        <Card style={{ width: "100%" }} id="card-container">
          <Card.Body style={{ width: "100%" }}>
            <Card.Title>{_title}</Card.Title>
            <span>{_date}</span>
            <div style={{ float: "right" }}>
              <div style={{ paddingRight: "60px", display: "inline-block" }}>
                <FacebookShareButton url={_url} hashtag="#CSCI_571_NewsApp">
                  <FacebookIcon round={true} size={30} />
                </FacebookShareButton>
                <TwitterShareButton url={_url} hashtags={hashtags}>
                  <TwitterIcon round={true} size={30} />
                </TwitterShareButton>
                <EmailShareButton url={_url}>
                  <EmailIcon round={true} size={30} />
                </EmailShareButton>
              </div>

              {bookmarkIcon}
              <ReactTooltip place="bottom" effect="solid" />
            </div>
          </Card.Body>
          <img
            alt=""
            className={width > breakpoint ? "articleImg" : "mobile-articleImg"}
            src={_img}
          ></img>
          <Card.Body className="more">{desc4Lines}</Card.Body>
          <Card.Body className="more">{restOfLines}</Card.Body>
          <Card.Body className="more">
            {moreToShow ? (
              showArrow ? (
                <FaAngleDown
                  className="moreIcon"
                  onClick={() => setShowArrow(false)}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {moreToShow ? (
              showArrow ? (
                ""
              ) : (
                <FaAngleUp
                  className="moreIcon"
                  onClick={() => setShowArrow(true)}
                />
              )
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
        <CommentBox id={_id} />
      </div>
      <Toast
        onClose={() => setShow(false)}
        autohide
        show={show}
        delay={3000}
        className={
          width > breakpoint || width > 420 ? "pc-toast" : "mobile-toast"
        }
        id={
          show
            ? width > breakpoint || width > 420
              ? "pc-setTop"
              : "mobile-setTop"
            : ""
        }
      >
        <Toast.Header style={{ color: "black" }}>
          {saved === false ? "Removing - " : "Saving - "} {_title}
        </Toast.Header>
      </Toast>
    </div>
  );
};

export default ArticleCard;
