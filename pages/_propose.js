import React from "react";
import styles from "../styles/propose.module.css";
import Axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function propose() {
  const [memberlist, setMember] = useState([]);
  const [project, setProject] = useState("");
  const [engproject, setEngProject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [subT, setSubT] = useState("");

  const addProject = () => {
    const project = document.getElementById("project").value;
    setProject(project);
  };

  const addEngProject = () => {
    const engproject = document.getElementById("engproject").value;
    setEngProject(engproject);
  };

  const addTeacher = () => {
    const teacher = document.getElementById("teacher").value;
    setTeacher(teacher);
  };

  const addMember = () => {
    const member = document.getElementById("member").value;
    setMember([...memberlist, member]);
  };

  const sendPropose = () => {
    Axios.put("http://localhost:3001/sendpropose", {
      project: project,
      engproject: engproject,
      teacherid: teacher,
      studentList: memberlist,
    }).then((response) => {
      if (response.data == "success") {
        window.alert("success");
      }
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}></div>
      <div className={styles.sidebar}>
        <Link href="/use_student">
          <a>User Info</a>
        </Link>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.info}>
            ชื่อโครงงานภาษาไทย:{project}
            <br />
            ชื่อโครงงานภาษาอังกฤษ:{engproject}
            <br />
            อาจารย์ที่ปรึกษา:{teacher}
            <br />
            อาจารย์ที่ปรึกษาร่วม:
            <br />
            สมาชิก:
            {memberlist.map((val) => {
              return <div>{val}</div>;
            })}
            <br />
            <button onClick={sendPropose}>Submit</button>
          </div>
          <div>
            <input type="text" placeholder="ชื่อโครงงานภาษาไทย" id="project" />
            <button onClick={addProject}>add</button>
            <br />
            <input
              type="text"
              placeholder="ชื่อโครงงานภาษาอังกฤษ"
              id="engproject"
            />
            <button onClick={addEngProject}>add</button>
            <br />
            <input type="text" placeholder="รหัสอาจารย์" id="teacher" />
            <button onClick={addTeacher}>add</button>
            <br />
            <input type="text" placeholder="รหัสนิสิต" id="member" />
            <button onClick={addMember}>add</button>
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}
