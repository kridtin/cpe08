import React, { useState, useEffect } from "react";
import Image from "next/image";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/login.module.css";
import Head from "next/head";
import user from "./use_student";

export default function login() {
  const router = useRouter();
  function signIn() {
    //------Request---------//
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;

    // send reauest (userid,password) => response({ loginstat:(true/false), userid:"xxxxxxxx", role:(student/teacher/admin) })

    sessionStorage.login = true; //res.loginstat
    sessionStorage.useID = "60360197"; //res.userid
    var role = "student"; //res.role
    /////////////////
    if (sessionStorage.login) {
      if (role == "student") {
        router.push("/");
      } else if (role == "teacher") {
        router.push("/teacher");
      } else if (role == "admin") {
        router.push("/admin");
      }
    } else {
      window.alert("login fail");
    }
  }
  return (
    <div className={styles.display}>
      <Head>
        <title>Login</title>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      {/*--------------------------topbar--------------------------*/}
      <div className={styles.topbar}>
        <div className={styles.topbar_img}>
          <a href="/">
            <Image src="/logo.jpg" width="65" height="65" />
          </a>
        </div>
        <div className={styles.topbar_title}>
          <p>The Student Project Management System</p>
          <p className={styles.university}>
            Department of Electrical and Computer Engineering Naresuan
            University
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.box}>
          <div className={styles.box_title}>
            <p>เข้าสู่ระบบ</p>
            <br />
            <Image src="/logo.png" width="200" height="200" />
          </div>
          <div className={styles.content}>
            <input id="userid" placeholder="รหัสประจำตัว" />
            <input type="password" id="password" placeholder="รหัสผ่าน" />
            <button onClick={signIn}>เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
      {/*-------------------------------------------------------------*/}
      <div className={styles.footer}>foot</div>
    </div>
  );
}
