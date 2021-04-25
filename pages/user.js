import React from "react";
import Layout from "../components/Layout";
import STD from "../components/std_info";
import Head from "next/head";

export default function user() {
  if (true) {
    return (
      <div>
        <Head>
          <title>User Info</title>
          <link rel="shortcut icon" href="/logo.ico" />
        </Head>
        <STD />
      </div>
    );
  } else if (false) {
    return (
      <div>
        <Layout user={{ username: user.thname, role: "" }}></Layout>
      </div>
    );
  } else if (false) {
    return (
      <div>
        <Layout user={{ username: user.thname, role: "" }}></Layout>
      </div>
    );
  }
}
