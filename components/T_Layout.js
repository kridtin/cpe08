import React, { useState, useEffect } from "react";
import Image from "next/image";
import Alarm from "../public/bell.svg";
import UserMenu from "../public/userMenu.svg";
import NavHome from "../public/home.svg";
import NavSearch from "../public/search.svg";
import NavDoc from "../public/text.svg";
import NavLogbook from "../public/logbook.svg";
import NavLogout from "../public/logout.svg";
import NavUserI from "../public/user.svg";
import NavUser from "../public/person.svg";
import styles from "../styles/css2.module.scss";
import Link from "next/link";

export default function T_Layout(props) {
  const [svgColor1, updateSvgColor1] = useState("black");
  const [svgColor2, updateSvgColor2] = useState("black");

  const [Notic, setNotic] = useState([
    {
      topic: "เสนอหัวข้อโครงงาน",
      sender: "Student 1",
      des: "ระบบจัดการการทำโครงงาน",
    },
  ]);

  function dropdownShow(id) {
    if (id == "noctic_box") {
      if (document.getElementById(id).style.display == "none") {
        if (document.getElementById("userMenu").style.display == "none") {
          document.getElementById(id).style.display = "block";
          updateSvgColor1("#cc184e");
        } else {
          document.getElementById("userMenu").style.display = "none";
          document.getElementById(id).style.display = "block";
          updateSvgColor2(" #423034");
          updateSvgColor1("#cc184e");
        }
      } else {
        document.getElementById(id).style.display = "none";
        updateSvgColor1(" #423034");
      }
    }
    if (id == "userMenu") {
      if (document.getElementById(id).style.display == "none") {
        if (document.getElementById("noctic_box").style.display == "none") {
          document.getElementById(id).style.display = "block";
          updateSvgColor2("#cc184e");
        } else {
          document.getElementById("noctic_box").style.display = "none";
          document.getElementById(id).style.display = "block";
          updateSvgColor1(" #423034");
          updateSvgColor2("#cc184e");
        }
      } else {
        document.getElementById(id).style.display = "none";
        updateSvgColor2(" #423034");
      }
    }
  }
  function logOut() {
    sessionStorage.clear();
  }
  return (
    <div className={styles.display}>
      {/*--------------------------topbar--------------------------*/}
      <div className={styles.topbar}>
        <div className={styles.topbar_img}>
          <a href="/">
            <Image src="/logo.jpg" width="67" height="67" />
          </a>
        </div>
        <div className={styles.topbar_title}>
          The Student Project Management System
        </div>
        <div className={styles.topMenu_box}>
          <div className={styles.topMenu_text}>
            <a href="/user">
              <div className={styles.topMenu_name}>{props.user.username}</div>
            </a>
          </div>
          <div
            className={styles.topMenu}
            onClick={(e) => {
              dropdownShow("noctic_box");
            }}
          >
            <Alarm width="" height="20" fill={svgColor1} />
            <div id="noctic_box" className={styles.topMenu_content}>
              {Notic.map((val) => {
                return (
                  <a>
                    <p className={styles.head}>{val.topic}</p>
                    <p>{val.des}</p>
                    <button>ยอมรับ</button>
                    <button>ปฎิเสธ</button>
                  </a>
                );
              })}
            </div>
          </div>
          <div
            className={styles.topMenu}
            onClick={(e) => {
              dropdownShow("userMenu");
            }}
          >
            <UserMenu width="" height="20" fill={svgColor2} />
            <div id="userMenu" className={styles.topMenu_content}>
              <Link href="/user">
                <a>ข้อมูลผู้ใช้</a>
              </Link>
              <Link href="/password">
                <a>รหัสผ่าน</a>
              </Link>
              <Link href="/">
                <a onClick={logOut}>ออกจากระบบ</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------sidebar--------------------------------*/}
      <div className={styles.sidebar}>
        <Link href="/">
          <a>
            <NavHome className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>หน้าหลัก</p>
          </a>
        </Link>
        <Link href="/user">
          <a>
            <NavUser className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ข้อมูลผู้ใช้</p>
          </a>
        </Link>
        <Link href="/logbook">
          <a>
            <NavLogbook
              className={styles.sidebar_icon}
              width="30"
              height="30"
            />
            <p className={styles.sidebar_text}>ประวัตินักศึกษา</p>
          </a>
        </Link>
        <Link href="/">
          <a>
            <NavSearch className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ค้นหาโครงงาน</p>
          </a>
        </Link>
        <Link href="/">
          <a>
            <NavDoc className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ไฟล์เอกสาร</p>
          </a>
        </Link>
        <Link href="/">
          <a onClick={logOut}>
            <NavLogout className={styles.sidebar_icon} width="30" height="30" />
            <p className={styles.sidebar_text}>ออกจากระบบ</p>
          </a>
        </Link>
      </div>
      {/*---------------------------content-------------------------------*/}
      <div className={styles.content}>{props.children}</div>
      {/*-------------------------------------------------------------*/}
      <div className={styles.footer}></div>
    </div>
  );
}
