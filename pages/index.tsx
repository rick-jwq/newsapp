import React, { useEffect } from "react";
// import Layout from "../components/Layout";
import FetchData from "../components/FetchData";
import { useDispatch } from "react-redux";
import newsTypeSlice from "../redux/newsType";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const type: string = localStorage.getItem("newsType") || "Guardian";
    if (type === "Guardian" || type === "NYTimes")
      dispatch(newsTypeSlice.actions.init(type));
  }, []);

  return (
    // <Layout>
    <FetchData section="/home" />
    // </Layout>
  );
};

export default Home;
