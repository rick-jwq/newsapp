import React, { useState } from "react";
import { Card, Badge, Modal } from "react-bootstrap";
// import "./index.css";
import { MdShare } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import { News } from "../interfaces/news";
// import { useHistory } from "react-router-dom";
import { useRouter } from "next/router";
import { useViewPort } from "../contexts/ViewPort";
import Link from "next/link";

interface CardProps {
  news: News;
  key: number;
}

const NewsCard: React.FC<CardProps> = props => {
  const { id, url, title, img, date, description, section } = props.news;
  const [show, setShow] = useState(false);
  const { width } = useViewPort();
  const breakpoint = 970;
  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    e.preventDefault();
    setShow(true);
    e.stopPropagation();
    return false;
  };

  const articleID = id.replace(/\//gi, "*");

  const router = useRouter();

  const badgeColors = new Map();
  badgeColors.set("WORLD", "rgb(137,75,255)");
  badgeColors.set("POLITICS", "rgb(0,148,136)");
  badgeColors.set("BUSINESS", "rgb(0,150,238)");
  badgeColors.set("TECHNOLOGY", "rgb(201,221,46)");
  badgeColors.set("SPORT", "rgb(255,194,58)");
  badgeColors.set("SPORTS", "rgb(255,194,58)");
  badgeColors.set("GUARDIAN", "rgb(0,40,75)");
  badgeColors.set("NYTIMES", "rgb(221,221,221)");
  const textColor =
    section === "SPORT" || section === "SPORTS" || section === "TECHNOLOGY"
      ? "black"
      : "white";
  const badgeColor = badgeColors.get(section)
    ? badgeColors.get(section)
    : "rgb(106,117,124)";
  const badgeName = section.localeCompare("SPORT") === 0 ? "SPORTS" : section;
  const hashtags = ["CSCI_571_NewsApp"];

  return (
    <>
      <Link href={"/post/" + [articleID]}>
        <Card
          onClick={() => router.push("/post/" + [articleID])}
          className={
            width > breakpoint ? "card-container" : "mobile-card-container"
          }
        >
          <Card.Body className="imgBody">
            <Card.Img
              className={width > breakpoint ? "pc-card-img" : "mobile-card-img"}
              src={img}
            ></Card.Img>
          </Card.Body>
          <Card.Body className={width > breakpoint ? "noMargin" : "moveTop"}>
            <Card.Title className="card-title">
              {title}
              <MdShare onClick={handleShow} />
            </Card.Title>
            <Card.Text className="card-description">{description}</Card.Text>
            <Card.Text>
              {date.slice(0, 10)}
              <Badge
                variant={"primary"}
                id={width > breakpoint ? "cardBadge" : "mobileCardBadge"}
                style={{ background: badgeColor, color: textColor }}
              >
                {badgeName}
              </Badge>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <p>Share via</p>
          <div style={{ display: "flex" }}>
            <FacebookShareButton
              url={url}
              style={{ flex: "1" }}
              hashtag="#CSCI_571_NewsApp"
            >
              <FacebookIcon round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              style={{ flex: "1" }}
              hashtags={hashtags}
            >
              <TwitterIcon round={true} />
            </TwitterShareButton>
            <EmailShareButton url={url} style={{ flex: "1" }}>
              <EmailIcon round={true} />
            </EmailShareButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewsCard;
