import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "../interfaces/article";
import { url } from "../constants";

type Props = {
  id: string;
};

const ArticlePage: React.FC<Props> = ({ id }) => {
  //   let params = new URL(window.location.href).searchParams;
  //   let id = params.get("id") || "";
  const type = "guardian";
  // window.location.href.search("https://www.nytimes.com") >= 0
  //   ? "nytimes"
  //   : "guardian";

  id = id.replace(/\//gi, "*");
  // const url = "http://localhost:4000/";

  const [article, setArticle] = useState<Article>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url + type + "/article/" + id)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // if (type === "nytimes") loadNYTArticle(data);
        // else
        loadGuardianArticle(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [type, id]);

  const loadNYTArticle = (data: any) => {
    const title = data.docs[0].headline.main;
    const date = data.docs[0].pub_date;
    const img = data.docs[0].multimedia.find((e: any) => e.width >= 2000);
    const defImg =
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const description = data.docs[0].abstract;
    const url = data.docs[0].web_url;
    const id = data.docs[0].web_url;
    const section = data.docs[0].section_name;

    let article: Article = {
      title: title,
      description: description,
      date: date.slice(0, 10),
      img: img ? "https://www.nytimes.com/" + img.url : defImg,
      url: url,
      id: id,
      section: section
    };
    setArticle(article);
    setIsLoading(false);
  };

  const loadGuardianArticle = (data: any) => {
    const title = data.webTitle;
    const date = data.webPublicationDate.slice(0, 10);
    const url = data.webUrl;
    const defImg =
      "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    const img =
      data.blocks !== undefined
        ? data.blocks.main !== undefined
          ? data.blocks.main.elements[0] !== undefined
            ? data.blocks.main.elements[0].assets !== undefined
              ? data.blocks.main.elements[0].assets[
                  data.blocks.main.elements[0].assets.length - 1
                ] !== undefined
                ? data.blocks.main.elements[0].assets[
                    data.blocks.main.elements[0].assets.length - 1
                  ].file !== null
                  ? data.blocks.main.elements[0].assets[
                      data.blocks.main.elements[0].assets.length - 1
                    ].file
                  : defImg
                : defImg
              : defImg
            : defImg
          : defImg
        : defImg;
    const description = data.blocks.body[0].bodyTextSummary;
    const id = data.id;
    const section = data.sectionId;
    let article: Article = {
      title: title,
      description: description,
      date: date,
      img: img,
      url: url,
      id: id,
      section: section
    };
    setArticle(article);
    setIsLoading(false);
  };
  return <ArticleCard article={article} isLoading={isLoading} />;
};

export default ArticlePage;
