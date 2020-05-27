import App from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/navbar.css";
import "../static/home.css";
import "../static/article.css";
// import { ViewPortProvider } from "../contexts/ViewPort";
// import { NewsTypeContextProvider } from "../contexts/NewsType";
// import { BrowserRouter } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import createStore from "../configure/store";
import Layout from "../components/Layout";
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <ReduxProvider store={createStore()}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ReduxProvider>
      </>
    );
  }
}
