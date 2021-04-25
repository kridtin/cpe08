import React, { useState } from "react";
import styles from "../styles/t_index.module.scss";
import Close from "../public/close.svg";

export default function T_index() {
  const [showProject, setshowProject] = useState({
    id: "",
    name: "",
    member: [],
    logbook: "",
    state: "",
  });
  var Advis_project = [
    {
      id: "CPE01",
      name: "ระบบจัดการการทำโครงงานของนิสิต",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE02",
      name: "ระบบรดน้ำต้นไม้ตามความชื้นในดิน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE03",
      name: "หุ่นไล่กาอัตโนมัติ",
      stat: "สอบหัวข้อโครงงาน",
    },
  ];
  var Commit_project = [
    {
      id: "CPE04",
      name: "ไม้วิเศษตรวจสอบความสุขของทุเรียน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE05",
      name: "ระบบตรวจจับฝุ่นPM2.5",
      stat: "สอบหัวข้อโครงงาน",
    },
  ];
  var project_list = [
    {
      id: "CPE01",
      name: "ระบบจัดการการทำโครงงานของนิสิต",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE02",
      name: "ระบบรดน้ำต้นไม้ตามความชื้นในดิน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE03",
      name: "หุ่นไล่กาอัตโนมัติ",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE04",
      name: "ไม้วิเศษตรวจสอบความสุขของทุเรียน",
      stat: "สอบหัวข้อโครงงาน",
    },
    {
      id: "CPE05",
      name: "ระบบตรวจจับฝุ่นPM2.5",
      stat: "สอบหัวข้อโครงงาน",
    },
  ];
  function projectOn(val) {
    var modal = document.getElementById("projectModal");
    modal.style.display = "block";
    setshowProject({
      id: val.id,
      name: val.name,
      member: ["std1", "std2"],
      logbook: 5,
      state: val.stat,
    });
  }
  function projectOff() {
    var modal = document.getElementById("projectModal");
    modal.style.display = "none";
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>จัดการโครงงาน</div>
      </div>
      <div className={styles.project_list}>
        <div className={styles.title_table}>รายชื่อโครงงานที่เป็นที่ปรึกษา</div>
        <div className={styles.project_title}>
          <div className={styles.project_i_title}>ID</div>
          <div className={styles.project_name_title}>ชื่อโครงงาน</div>
          <div className={styles.project_stat_title}>สถานะโครงงาน</div>
        </div>
        {Advis_project.map((val) => {
          return (
            <div className={styles.project} onClick={() => projectOn(val)}>
              <div className={styles.project_i}>{val.id}</div>
              <div className={styles.project_name}>{val.name}</div>
              <div className={styles.project_stat}>{val.stat}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.project_list}>
        <div className={styles.title_table_green}>
          รายชื่อโครงงานที่เป็นกรรมการ
        </div>
        <div className={styles.project_title}>
          <div className={styles.project_i_title}>ID</div>
          <div className={styles.project_name_title}>ชื่อโครงงาน</div>
          <div className={styles.project_stat_title}>สถานะโครงงาน</div>
        </div>
        {Commit_project.map((val) => {
          return (
            <div className={styles.project} onClick={() => projectOn(val)}>
              <div className={styles.project_i}>{val.id}</div>
              <div className={styles.project_name}>{val.name}</div>
              <div className={styles.project_stat}>{val.stat}</div>
            </div>
          );
        })}
      </div>
      <div id="projectModal" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2>ข้อมูลโครงงาน</h2>
            <div className={styles.close} onClick={projectOff}>
              <Close width="30" height="30" />
            </div>
          </div>
          <div className={styles.modal_body}>
            <p>
              <label>รหัสโครงงาน:{showProject.id}</label>
            </p>
            <p>
              <label>ชื่อ:{showProject.name}</label>
            </p>
            <p>
              <label>
                สมาชิก:{showProject.member[0]} , {showProject.member[1]}
              </label>
            </p>
            <p>
              <label>รายงานความคืบหน้า:{showProject.logbook}</label>
            </p>
            <p>
              <label>สถานะ:{showProject.state}</label>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
