import React from "react";
import styles from "../styles/waiting.module.scss";
import Close from "../public/close.svg";

export default function Asses(props) {
  var user = props.user;
  var project = props.project;

  function modalOn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  function modalOff() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  function sendAsses() {
    window.location.href = "/";
  }
  return (
    <div className={styles.waiting}>
      <div id="head" className={styles.header}>
        ขอรับการประเมิน
      </div>
      <div className={styles.body}>
        <p>
          <label className={styles.indent}>
            ส่งแบบฟอร์มประเมินโครงงานให้อาจารย์ที่ปรึกษา
          </label>
        </p>
        <div id="submit" className={styles.submit}>
          <button onClick={modalOn}>ดำเนินการต่อ</button>
        </div>
      </div>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2>ยืนยันการส่งแบบฟอร์ม</h2>
            <div className={styles.close} onClick={modalOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className={styles.modal_body}>
            <p>
              <label>ชื่อโครงงาน</label>
            </p>
            <p>
              <label>รหัสโครงงาน</label>
            </p>
            <p>
              <label>อาจารย์ที่ปรึกษา</label>
            </p>
            <p>
              <label>สมาชิก</label>
            </p>
            <button onClick={sendAsses}>ยืนยันการส่ง</button>
          </div>
        </div>
      </div>
    </div>
  );
}
