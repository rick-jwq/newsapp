import React from "react";
import NewsCard from "./Card";
// import "./index.css";
import { News } from "../interfaces/news";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
// import { useViewPort } from "../../../Contexts/ViewPort";
import { useViewPort } from "../contexts/ViewPort";

interface CardListProps {
  newsList: News[];
  isLoading: boolean;
}

const override = css`
  display: block;
  margin-top: 300px;
  margin-left: auto;
  margin-right: auto;
  border-color: blue;
`;

const CardList: React.FC<CardListProps> = ({ newsList, isLoading }) => {
  //   console.log(newsList);

  const { width } = useViewPort();
  const breakpoint = 970;
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
  }

  return (
    <div
      className={
        width > breakpoint ? "cardlist-container" : "mobile-cardlist-container"
      }
    >
      {newsList.map((item, index) => {
        return <NewsCard key={index} news={item} />;
      })}
    </div>
  );
};

export default CardList;
