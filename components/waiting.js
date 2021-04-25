import React, { useEffect } from "react";
import styles from "../styles/waiting.module.scss";
import Propose from "./Propose";

export default function waiting(props) {
  const ID = props.userid; //userID
  /*ใช้ ID ส่งไปหา propose ได้ responseมาเป็น 
    {
      id,
      projectname_th,
      projectname_en,
      teacher,sub_teacher,
      committee["xxxx","xxxx"],
      member["xxxx","xxxx"],
      comfirem[0,0,0,0,0])
    

    }*/
  //var propose = response หรืออาจใช้ usesate
  var propose = {
    id: "",
    projectname_th: "",
    projectname_en: "",
    teacher: "",
    sub_teacher: "",
    committee: ["xxxx", "xxxx"],
    member: ["xxxx", "xxxx"],
    confirm: [1, 0, 1, 2, 0],
    project_id: "",
  };

  if (propose.confirm.length < 5) {
    document.getElementById("subteacher").style.display = "none";
  } else {
    document.getElementById("subteacher").style.display = "block";
  }

  var request = propose.confirm;
  if (request[0] == 1) {
    var label0 = styles.approve;
    var label_text0 = "ยืนยันแล้ว";
  } else if (request[0] == 0) {
    var label0 = styles.onprocess;
    var label_text0 = "ยังไม่ได้รับการยืนยัน";
  } else {
    var label0 = styles.reject;
    var label_text0 = "ปฏิเสธหัวข้อโครงงาน";
  }
  if (request[1] == 1) {
    var label1 = styles.approve;
    var label_text1 = "ยืนยันแล้ว";
  } else if (request[1] == 0) {
    var label1 = styles.onprocess;
    var label_text1 = "ยังไม่ได้รับการยืนยัน";
  } else {
    var label1 = styles.reject;
    var label_text1 = "ปฏิเสธหัวข้อโครงงาน";
  }
  if (request[2] == 1) {
    var label2 = styles.approve;
    var label_text2 = "ยืนยันแล้ว";
  } else if (request[2] == 0) {
    var label2 = styles.onprocess;
    var label_text2 = "ยังไม่ได้รับการยืนยัน";
  } else {
    var label2 = styles.reject;
    var label_text2 = "ปฏิเสธหัวข้อโครงงาน";
  }
  if (request[3] == 1) {
    var label3 = styles.approve;
    var label_text3 = "ยืนยันแล้ว";
  } else if (request[3] == 0) {
    var label3 = styles.onprocess;
    var label_text3 = "ยังไม่ได้รับการยืนยัน";
  } else {
    var label3 = styles.reject;
    var label_text3 = "ปฏิเสธหัวข้อโครงงาน";
  }
  if (request[4] == 1) {
    var label4 = styles.approve;
    var label_text4 = "ได้รับรหัสโครงงานแล้ว";
  } else if (request[4] == 0) {
    var label4 = styles.onprocess;
    var label_text4 = "กำลังรอรหัสโครงงาน";
  } else {
    var label4 = styles.reject;
    var label_text4 = "ปฏิเสธหัวข้อโครงงาน";
  }
  function showSubmit() {
    if (process.browser) {
      var count = 0;
      var submit = document.getElementById("submit");
      if (submit != null) {
        for (let i = 0; i < request.length; i++) {
          if (request[i] == 1) {
            count = count + 1;
          }
        }
        if (count == request.length) {
          submit.style.display = "block";
        } else {
          submit.style.display = "none";
        }
      }
      var reject = 0;
      var back = document.getElementById("back");
      if (back != null) {
        for (let i = 0; i < request.length; i++) {
          if (request[i] == 2) {
            reject = reject + 1;
          }
        }
        if (reject > 0) {
          back.style.display = "block";
        } else {
          back.style.display = "none";
        }
      }
    }
  }
  function nextState() {
    //ลบข้อมูลใน user_propose
    //ลบproposeในDB
    //update ข้อมูลproject
    //update database project state +1
  }
  function fallback() {
    //ลบproposeในDB
    //update database project state -1
  }

  showSubmit();
  return (
    <div className={styles.waiting}>
      <div className={styles.header}>เอกสารรอการยืนยัน</div>
      <div className={styles.body}>
        <p>
          <label className={styles.topic}>{props.info.topic}</label>
        </p>
        <p>
          <label className={styles.indent}>อาจารย์ที่ปรึกษา:</label>
          <label id="w0" className={label0}>
            {label_text0}
          </label>
        </p>
        <p id="subteacher">
          <label className={styles.indent}>อาจารย์ที่ปรึกษาร่วม:</label>{" "}
          <label id="w1" className={label1}>
            {label_text1}
          </label>
        </p>
        <p>
          <label className={styles.indent}>กรรมการ1:</label>
          <label id="w2" className={label2}>
            {label_text2}
          </label>
        </p>
        <p>
          <label className={styles.indent}>กรรมการ2:</label>
          <label id="w3" className={label3}>
            {label_text3}
          </label>
        </p>
        <p>
          <label className={styles.indent}>รหัสโครงงาน:</label>
          <label id="w4" className={label4}>
            {label_text4}
          </label>
        </p>
        <div id="submit" className={styles.submit}>
          <button onClick={nextState}>ดำเนินการต่อ</button>
        </div>
        <div id="back" className={styles.submit}>
          <button onClick={fallback}>ย้อนกลับ</button>
        </div>
      </div>
    </div>
  );
}
