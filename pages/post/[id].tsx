import React from "react";
import { useRouter } from "next/router";
import ArticlePage from "../../components/articlePage";
// import Layout from "../../components/Layout";
const Article: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const aid = id + "";

  return (
    //<Layout>
    <ArticlePage id={aid}></ArticlePage>
    //</Layout>
  );
};

export default Article;
