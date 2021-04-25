import React from "react";
import Layout from "../components/T_Layout";
import Index from "../components/T_index";
import Head from "next/head";

export default function teacher() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      <Layout user={{ username: "test", role: "" }}>
        <Index />
      </Layout>
    </div>
  );
}
