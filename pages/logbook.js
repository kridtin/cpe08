import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/logbook.module.scss";

export default function logbook() {
  React.useEffect(() => {
    if (sessionStorage.login == undefined) {
      window.location.href = "/login";
    }
  });
  const [user, setUser] = useState({});
  React.useEffect(() => {
    setUser(JSON.parse(sessionStorage.user));
  });

  function sendLogbook() {
    var date = document.getElementById("date").value;
    var conclude = document.getElementById("conclude").value;
    var topic = document.getElementById("topic").value;
    var jobs = document.getElementById("่jobs").value;
    var time = document.getElementById("time").value;
    var nextdate = document.getElementById("nextdate").value;

    window.alert(
      date +
        "\n" +
        conclude +
        "\n" +
        topic +
        "\n" +
        jobs +
        "\n" +
        time +
        "\n" +
        nextdate
    );
  }

  return (
    <Layout user={{ username: user.thname, role: "" }}>
      <div className={styles.body}>
        <div className={styles.header}>แบบฟอร์มบันทึกความก้าวหน้า</div>
        <p>วันที่</p>
        <input id="date" className={styles.date} type="date"></input>
        <p>สรุปความคืบหน้าของงานที่ได้รับมอบหมาย</p>
        <textarea id="conclude" />
        <p>ปัญหาที่พบหรือหัวข้อที่เข้ารับคำปรึกษา</p>
        <textarea id="topic" />
        <p>แนวทางการแก้ปัญหา หรือ งานที่ได้รับมอบหมาย</p>
        <textarea id="่jobs" />
        <p>ระยะเวลาที่คาดว่าจะใช้สำหรับงานชิ้นนี้</p>
        <input id="time" />
        <p>กำหนดการนัดหมายครั้งต่อไป</p>
        <input id="nextdate" className={styles.date} type="date" />
        <button onClick={sendLogbook}>ส่ง</button>
      </div>
    </Layout>
  );
}
