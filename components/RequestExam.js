import React, { useState } from "react";
import styles from "../styles/request.module.scss";
import Close from "../public/close.svg";

export default function RequestExam(props) {
  const [Filename, setFilename] = useState("ไม่ได้เลือกไฟล์ใด");
  function onChangeHandler(event) {
    setFilename(event.target.files[0].name);
    const data = new FormData();
    data.append("file", event.target.files[0]);
  }
  function confirmOn() {
    var modal = document.getElementById("confirmModal");
    modal.style.display = "block";
  }
  function confirmOff() {
    var modal = document.getElementById("confirmModal");
    modal.style.display = "none";
  }

  //-------------------------------------------------------//
  function sendExam() {
    //เขียน axios
    //update state +1
    var project_id = props.project.id;
    var file_url = "";
    //บันทึกในตาราง examrequest [id,projectid,file_url]
  }
  return (
    <div className={styles.request}>
      <div className={styles.header}>{props.topic}</div>
      <div className={styles.body}>
        <p className={styles.head}>{props.topic}</p>
        <p>
          <label className={styles.topic}>
            รหัสโครงงาน:{" "}
            <label className={styles.indent}>{props.project.id}</label>
          </label>
        </p>
        <p>
          <label className={styles.topic}>
            ชื่อโครงงาน:
            <label className={styles.indent}>{props.project.name}</label>
          </label>
        </p>
        <p>
          <label className={styles.topic}>
            สมาชิก:
            {props.member.map((val) => {
              return <label className={styles.indent}>{val.name},</label>;
            })}{" "}
          </label>
        </p>
        <p>
          <label className={styles.topic}>
            อาจารย์:{" "}
            <label className={styles.indent}>{props.project.teacher}</label>
          </label>
        </p>
        <p>
          <label className={styles.topic}>
            กรรมการ:
            {props.commit.map((val) => {
              return <label className={styles.indent}>{val.name}</label>;
            })}
          </label>
        </p>
        <p className={styles.upload}>
          <label className={styles.topic}>
            <label className={styles.title}>อัพโหลดไฟล์รายงาน</label>
          </label>
        </p>
        <p>
          <input
            type="file"
            name="file"
            id="file"
            accept=".pdf"
            className={styles.file}
            onChange={onChangeHandler}
          ></input>
          <label for="file">เลือกไฟล์</label>
          <label className={styles.filename}>{Filename}</label>
        </p>
        <p>
          <button onClick={confirmOn}>ส่งแบบขอสอบ</button>
        </p>
      </div>
      <div id="confirmModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2>{props.topic}</h2>
            <div className={styles.close} onClick={confirmOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className={styles.modal_body}>
            <p>
              <label>รหัสโครงงาน: {props.project.id}</label>
            </p>
            <p>
              <label>ชื่อโครงงาน: {props.project.name}</label>
            </p>
            <p>
              <label>สมาชิก: </label>
            </p>
            <p>
              <label>อาจารย์ที่ปรึกษา:</label>
            </p>
            <p>
              <label>{props.project.teacher}</label>
            </p>
            <p>
              <label>กรรมการ:</label>
            </p>
            <p>
              <label>ไฟล์รายงาน: {Filename}</label>
            </p>
            <button onClick={sendExam}>ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>
  );
}
