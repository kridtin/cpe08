import React from "react";
import styles from "../styles/waiting.module.scss";
import Close from "../public/close.svg";

export default function resconf(props) {
  /*ต้องมีดาต้าเบส เก็บสถานะการรอการยืนยันไว้ [id,userid(รหัสนิสิต),conf(สถะนะการรอการยืนยัน int0/1)] */
  var userID = props.user.id; //user ID เอาไว้คิวรี่หา สถานะการรอการยืนยัน
  //คิวรี่มาเป็น response 0หรือ 1 เก็บไว้ในตัวแปร conf
  var conf = 1;

  function updateState() {
    var state = props.state + 1;
    // นำ state ไป query update update state ใน data base
    // รีหน้าเว็บใหม่
    window.location.href = "/"; //รีเฟรชหน้า
  }

  if (props.state == 5) {
    var nextState = "ประเมิณความคืบหน้า";
  } else if (props.state == 7) {
    var nextState = "ขอสอบจบ";
  } else if (props.state == 11) {
    var nextState = "ส่งรูปเล่มโครงงาน";
  } else if (props.state == 13) {
    var nextState = "จบ";
  }

  if (conf == "0") {
    var text = "กำลังรอการยืนยัน";
    var c = "0";
    if (process.browser) {
      var submit = document.getElementById("submit");
      var h = document.getElementById("head");
      if (submit != null) {
        submit.style.display = "none";
        if (h != null) {
          h.style.backgroundColor = "#f93154";
        }
      }
    }
  } else {
    var text = "ได้รับการยืนยันแล้ว";
    var c = "1";
    if (process.browser) {
      var submit = document.getElementById("submit");
      var h = document.getElementById("head");
      if (submit != null) {
        submit.style.display = "block";
        if (h != null) {
          h.style.backgroundColor = "#00b74a";
        }
      }
    }
  }
  function modalOn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  function modalOff() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  return (
    <div className={styles.waiting}>
      <div id="head" className={styles.header}>
        {text}
      </div>
      <div className={styles.body}>
        <p>
          <label className={styles.indent}>
            การยืนยันจากอาจารย์ที่ปรึกษา {c}/1
          </label>
        </p>
        <div id="submit" className={styles.submit}>
          <button onClick={modalOn}>ดำเนินการต่อ</button>
        </div>
      </div>
      <div id="myModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2>ไปยังขั้นตอนถัดไป</h2>
            <div className={styles.close} onClick={modalOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className={styles.modal_body}>
            <p>
              <label>{nextState}</label>
            </p>
            <button onClick={updateState}>ดำเนินการต่อ</button>
          </div>
        </div>
      </div>
    </div>
  );
}
