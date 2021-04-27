import React, { useState, useEffect } from "react";
import styles from "../styles/css2.module.scss";
import Layout from "../components/Layout";
import Propose from "../components/Propose";
import Examresult from "../components/Examresult";
import Waiting from "../components/waiting";
import Testing from "../components/Testing";
import Confirm from "../components/resconf";
import Asses from "../components/Asses";
import Book from "../components/Book";
import Head from "next/head";
import ReqExam from "../components/RequestExam";
import { useRouter } from "next/router";
import Axios from "axios";

export default function Home() {
  const router = useRouter();

  const [ID, setID] = useState(0); //ID ใช้เป็น requset เพื่อดึงข้อมูลทุกอย่างมา

  React.useEffect(() => {
    if (sessionStorage.login == undefined) {
      sessionStorage.clear();
      window.location.href = "/login";
    } else if (sessionStorage.login == false) {
      sessionStorage.clear();
      window.location.href = "/login";
    }
    setID(sessionStorage.useID);
  });

  /*requset send (ID) => response= {id:xxxxxxxx, 
                                    thname:ชื่อไทย, 
                                    thlastname:นามสกุลไทย, 
                                    enname:ชื่ออังกฤษ, 
                                    enlastname:นามสกุลอังกฤษ, 
                                    nickname:ชื่อเล่น, 
                                    email:อีเมลล์, 
                                    tel:เบอร์โทร, 
                                    teacher:ที่ปรึกษา}*/
  //ข้อมูลบางอันที่ยังไม่มีเช่น ชื่อเล่น ให้ส่งกลับมาเป็น สตริงเปล่า nickname:""
  // const [user, setUser] = useState(0)
  // จากนั้น setUser(response)

  //----------test date-----------------------------
  const [user, setUser] = useState({
    id: "60360197",
    thname: "กฤติน",
    thlastname: "เพิ่มพูล",
    enname: "Kridtin",
    enlastname: "Permpoon",
    nickname: "เคน",
    email: "email",
    tel: "เบอร์โทร",
    teacher: "ที่ปรึกษา",
  });
  //-------------------------------------------------

  //set sessionStorage.user = user
  //ต้องทำเป็น JSON.stringify(json_data)
  //วิธีเรียกใช้ JSON.parse(session_data)
  // เช่น  user = JSON.parse(sessionStorage.user)
  React.useEffect(() => {
    sessionStorage.user = JSON.stringify(user);
  });

  /*send request ด้วย ID responseคือข้อมูลโปรเจ็คแบบด้านล้าง 
  response = {id: "CPEXX",
              name: "ProjectX",
              descript: "----",
              teacher: "Teacher ABC",
              state: 0,
              statename: "บันทึกผลสอบ",
              request: "",
              logbook: 11,
              member: ["xxxxxxxx", "xxxxxxxx"],
              committee: ["xxxxx", "xxxxx"],}
  ****ถ้ายังไม่มีโปรเจ็คให้ส่งกลับมาเป็นstringเปล่าทั้งหมดเช่น
  response = {id: "",
              name: "",
              descript: 
              teacher: "",
              state: 0,
              statename: "",
              request: "",
              logbook: 0,
              member: [],
              committee: [],}
              
              */

  const [project, setProject] = useState({
    id: "CPEXX",
    name: "ProjectX",
    descript: "----",
    teacher: "Teacher ABC",
    state: 10,
    statename: "บันทึกผลสอบ",
    request: "",
    logbook: 11,
    member: ["xxxxxxxx", "xxxxxxxx"],
    committee: ["xxxxx", "xxxxx"],
  });
  //สร้างarrayไว้เก็บชื่อสมาชิก
  //const Member=[]
  for (let i = 0; i < project.member.length; i++) {
    const memID = project.member[i];
    // ส่งmemID ไปที่่เก็บข้อมูลนิสิต รับresponseกลับมาเป็น response = {id:xxxxxxxx,name:"{thname} {thlastname}"}
    //Member.push(response)
  }
  //สร้างarrayไว้เก็บชื่อกรรมการ
  //const Committee=[]
  for (let j = 0; j < project.committee.length; j++) {
    const commitID = project.committee[j];
    // ส่งmemID ไปที่่เก็บข้อมูลอาจารย์ รับresponseกลับมาเป็น response = {id:xxxxxxxx,name:"{thname} {thlastname}"}
    //Committee.push(response)
  }
  //==========================test data===================================//
  const Member = [
    { id: "0001", name: "std1name" },
    { id: "0001", name: "std2name" },
  ];
  const Committee = [
    { id: "0001", name: "Teacher1" },
    { id: "0001", name: "Teacher2" },
  ];
  //------------------CHECK STATE--------------------------//
  var stateContent = null;
  //state 0 เสนอหัวข้อโคางงาน o
  //state 1 รออาจารย์ตอบรับ o
  //state 2 ขอสอบหัวข้อ o
  //state 3 หน้ากำลังสอบหรือจะหน้ารออาจารย์ยืนยันให้สอบดี? x
  //state 4 บันทึกผลสอบ o
  //state 5 รออาจารย์ยืนยันให้บันทึกผลสอบได้ o
  //state 6 ขอให้อาจารย์ประเมินความคืบหน้า --(เกือบเสร็จ)
  //state 7 รออาจารย์ประเมิน o
  //state 8 ขอสอบจบ o
  //state 9 กำลังสอบ x
  //state 10 บันทึกผลสอบ o
  //state 11 รออาจารย์ยืนยันผลสอบ o
  //state 12 ส่งรูปเล่ม x
  //state 13 รออาจารย์ยืนยันเล่ม o
  //state 14 end ??????

  if (project.state == 0) {
    stateContent = <Propose user={user} />;
  } else if (project.state == 1) {
    stateContent = (
      <Waiting
        userid={user.id}
        info={{
          topic: "เสนอหัวข้อโครงงาน",
          request: [1, 0, 1, 2, 0],
        }}
      />
    );
  } else if (project.state == 2) {
    stateContent = (
      <ReqExam
        state="2"
        project={project}
        member={Member}
        commit={Committee}
        topic="ขอสอบหัวข้อโครงงาน"
      />
    );
  } else if (project.state == 3) {
    stateContent = <Testing state={project.state} />; //กำลังสอบ
  } else if (project.state == 4) {
    stateContent = <Examresult user={user} state={4} />; //บันทึกผลสอบกำหนดเลขstate เพื่อบอกdatabaseว่าเป็นผลสอบหัวข้อ
  } else if (project.state == 5) {
    stateContent = <Confirm user={user} state={5} conf={0} />; //รอ อาจารย์ยืนยัน
  } else if (project.state == 6) {
    stateContent = <Asses project={project} user={user} />; //ขอให้อาจารย์ประเมินความคืบหน้า
  } else if (project.state == 7) {
    stateContent = <Confirm user={user} state={7} conf={1} />; //รออาจารย์ประเมิน
  } else if (project.state == 8) {
    stateContent = (
      <ReqExam
        state="8"
        project={project}
        member={Member}
        commit={Committee}
        topic="ขอสอบโครงงาน"
      />
    ); //ขอสอบจบ
  } else if (project.state == 9) {
    stateContent = <Testing state={project.state} />; //กำลังสอบ
  } else if (project.state == 10) {
    stateContent = <Examresult state={10} />; //บันทึกผลสอบ กำหนดเลขstate เพื่อบอกdatabaseว่าเป็นผลสอบจบ
  } else if (project.state == 11) {
    stateContent = <Confirm user={user} state={11} conf="1" />; //รอ อาจารย์ยืนยัน
  } else if (project.state == 12) {
    stateContent = (
      <Book project={project} member={Member} topic="ส่งเล่มโครงงาน" />
    ); //ส่งรูปเล่ม
  } else if (project.state == 13) {
    stateContent = <Confirm state={13} conf="1" />; //รออาจารย์ยืนยัน
  } else if (project.state == 14) {
    stateContent = null; //จบ
  }

  const [notic, setNotic] = useState([{ topic: "", descript: "" }]);
  var status_style = styles.status;
  var status_request = "ไม่มีเอกสารรอการยืนยัน";
  if (project.request != "") {
    status_style = styles.wait;
    status_request = project.request;
  }
  function sendLogbook() {
    router.push("/logbook");
  }
  /*progressbar*/
  var progress_style1 = styles.blank;
  var progress_style2 = styles.blank;
  var progress_style3 = styles.blank;
  var progress_style4 = styles.blank;
  var progress_style5 = styles.blank;
  if (project.state == 0) {
    progress_style1 = styles.now;
  } else if (project.state <= 5) {
    progress_style1 = styles.active;
    progress_style2 = styles.now;
  } else if (project.state <= 7) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.now;
  } else if (project.state <= 11) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.active;
    progress_style4 = styles.now;
  } else if (project.state <= 13) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.active;
    progress_style4 = styles.active;
    progress_style5 = styles.now;
  } else if (project.state == 14) {
    progress_style1 = styles.active;
    progress_style2 = styles.active;
    progress_style3 = styles.active;
    progress_style4 = styles.active;
    progress_style5 = styles.active;
  }
  var logbook_style = new Array(12).fill(0);
  for (let index = 0; index < project.logbook; index++) {
    logbook_style[index] = styles.complete;
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      <Layout user={{ username: user.thname, role: "" }}>
        <div className={styles.content_project}>
          <div className={styles.content_status}>
            <div className={styles.content_status_title}>
              สถานะการดำเนินโครงงาน
            </div>
            <div className={styles.progressbar}>
              <li className={progress_style1}>เสนอหัวข้อโครงงาน</li>
              <li className={progress_style2}>สอบหัวข้อโครงงาน</li>
              <li className={progress_style3}>ประเมินความคืบหน้า</li>
              <li className={progress_style4}>สอบโครงงาน</li>
              <li className={progress_style5}>ส่งรูปเล่ม</li>
            </div>
            <div className={styles.substatus}>
              <div className={styles.logbook}>
                <div className={styles.logbooktitle}>
                  แบบบันทึกความก้าวหน้า (logbook)
                </div>
                <div className={styles.logbook_content}>
                  สถานะการส่ง Logbook: {project.logbook}/12 เล่ม
                </div>
                <div className={styles.logbook_bar}>
                  <li className={logbook_style[0]}></li>
                  <li className={logbook_style[1]}></li>
                  <li className={logbook_style[2]}></li>
                  <li className={logbook_style[3]}></li>
                  <li className={logbook_style[4]}></li>
                  <li className={logbook_style[5]}></li>
                  <li className={logbook_style[6]}></li>
                  <li className={logbook_style[7]}></li>
                  <li className={logbook_style[8]}></li>
                  <li className={logbook_style[9]}></li>
                  <li className={logbook_style[10]}></li>
                  <li className={logbook_style[11]}></li>
                </div>
                <button onClick={sendLogbook}>บันทึกความก้าวหน้า</button>
              </div>
              <div className={styles.process_manage}>
                <div className={styles.process_manage_title}>
                  การจัดการโครงงาน
                </div>
                <div className={styles.process_manage_body}>
                  <p>
                    สถานะปัจจุบัน: <label>{project.statename}</label>
                  </p>
                </div>
                <button>แก้ไขข้อมูลโครงงาน</button>
              </div>
            </div>
          </div>
          <div className={styles.content_project_info}>
            <div className={styles.content_project_about}>
              <div className={styles.project_info_title}>ข้อมูลโครงงาน</div>
              <p>ชื่อโครงงาน: {project.name}</p>
              <p>รหัสโครงงาน: {project.id}</p>
              <p>รายละเอียด: {project.descript}</p>
              <p>อาจารย์ที่ปรึกษา:{project.teacher}</p>
            </div>
            <div className={styles.content_project_member}>
              <div className={styles.project_info_title}>รายชื่อสมาชิก</div>
              <p>สมาชิก</p>
              {project.member.map((val) => {
                return <p>{val}</p>;
              })}
            </div>
          </div>
          <div className={styles.process_box}>{stateContent}</div>
        </div>
      </Layout>
    </div>
  );
}
