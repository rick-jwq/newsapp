import React, { useEffect, useState, useCallback } from "react";
import { News, GuardianNews, NYTimesNews } from "../interfaces/news";
import CardList from "./CardList";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { NewsTypeContext } from "../contexts/NewsType";

type Props = {
  section: string;
};

import { url } from "../constants";
const FetchData: React.FC<Props> = ({ section }) => {
  const [newsList, setNewsList] = useState<News[]>([]);
  // const { type } = useContext(NewsTypeContext);
  const type = "Guardian";
  const [loading, setLoading] = useState(true);

  // const { listen } = useHistory();
  let path = section;
  // listen((location: any) => {
  //   path = location.pathname;
  // });

  // const url = "http://localhost:4000/";

  const fetchData = useCallback((type: string) => {
    // const pathname = path === "/" ? "/home" : path;
    console.log(url + type.toLowerCase() + "/list" + section);

    fetch(url + type.toLowerCase() + "/list" + section)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (type.localeCompare("Guardian") === 0) {
          loadGuardianData(data);
        } else {
          loadNYTData(data);
        }
      });
  }, []);

  const loadGuardianData = (data: any) => {
    let newsList: Array<News> = [];
    const defImg =
      "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    data.forEach((element: GuardianNews) => {
      let imgLink =
        element.blocks !== undefined
          ? element.blocks.main !== undefined
            ? element.blocks.main.elements[0] !== undefined
              ? element.blocks.main.elements[0].assets !== undefined
                ? element.blocks.main.elements[0].assets[
                    element.blocks.main.elements[0].assets.length - 1
                  ] !== undefined
                  ? element.blocks.main.elements[0].assets[
                      element.blocks.main.elements[0].assets.length - 1
                    ].file !== null
                    ? element.blocks.main.elements[0].assets[
                        element.blocks.main.elements[0].assets.length - 1
                      ].file
                    : defImg
                  : defImg
                : defImg
              : defImg
            : defImg
          : defImg;
      var news: News = {
        id: element.id,
        url: element.webUrl,
        title: element.webTitle,
        img: imgLink,
        date: element.webPublicationDate,
        description: element.blocks.body[0].bodyTextSummary,
        section: element.sectionId.toUpperCase()
      };
      newsList.push(news);
    });
    if (path !== "/") {
      newsList = newsList.slice(0, 10);
    }
    setNewsList(newsList);
    setLoading(false);
  };

  const loadNYTData = (data: any) => {
    let newsList: Array<News> = [];

    /*
      NYTimes returns other sections for one particular section, 
      so need to filter out other sections
    */
    if (path !== "/") {
      data = data.filter((e: any) => {
        return "/" + e.section === path || "/" + e.subsection === path;
      });
    }

    data.forEach((element: NYTimesNews) => {
      let imgs = element.multimedia;
      const defImg =
        "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      let img = imgs ? imgs.find(element => element.width >= 2000) : null;
      if (img && img.url.search("https://") === -1) {
        img.url = "https://nyt.com" + img.url;
      }
      const news = {
        id: element.url,
        url: element.url,
        title: element.title,
        img: img ? img.url : defImg,
        date: element.published_date,
        description: element.abstract,
        section:
          path === "/"
            ? element.section.toUpperCase()
            : "/" + element.section === path
            ? element.section.toUpperCase()
            : element.subsection.toUpperCase()
      };
      newsList.push(news);
    });
    if (path !== "/") {
      newsList = newsList.slice(0, 10);
    }
    setNewsList(newsList);
    setLoading(false);
  };

  useEffect(() => {
    setNewsList([]);
    setLoading(true);
    fetchData(type);
  }, [type, setNewsList, fetchData, path]);

  return <CardList newsList={newsList} isLoading={loading} />;
};

export default FetchData;
