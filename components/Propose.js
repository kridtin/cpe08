import React, { useState } from "react";
import style from "../styles/propose.module.scss";
import Axios from "axios";

export default function Propose(props) {
  const [user, setUser] = useState(props.user);
  const [MemberList, setMemberList] = useState([]);

  //sendrequest ขอรายชื่อนักเรียนเป็น id:xxxxxxxx name:"{thname} {thlastname}" response =[id:"xxxxxxxx" name:"{thname} {thlastname}"]
  //setStudentList(response)
  const [studentList, setStudentList] = useState([
    { id: "00", name: "zero number" },
    { id: "01", name: "one number" },
    { id: "02", name: "two number" },
    { id: "03", name: "three number" },
    { id: "04", name: "four number" },
    { id: "05", name: "five number" },
    { id: "06", name: "six number" },
    { id: "07", name: "seven number" },
    { id: "08", name: "eight number" },
    { id: "09", name: "nine number" },
    { id: "10", name: "ten number" },
  ]);

  //sendrequest ขอรายชื่ออาจารย์เป็น id:xxxxxxxx name:"{thname} {thlastname}" response =[id:"xxxxxxxx" name:"{thname} {thlastname}"]
  //setTeacherList(response)
  const [teacherList, setTeacherList] = useState([
    { id: "0001", name: "อาจารย์คนที่ 1" },
    { id: "0002", name: "อาจารย์คนที่ 2" },
    { id: "0003", name: "อาจารย์คนที่ 3" },
    { id: "0004", name: "อาจารย์คนที่ 4" },
    { id: "000n", name: "อาจารย์คนที่ n" },
  ]);

  const [ShowSTD, setShowSTD] = useState([]);

  function addMember() {
    var modal = document.getElementById("myModal");
    var newMember = document.getElementById("searchID").value;
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].id == newMember) {
        setMemberList([...MemberList, studentList[i]]);
        modal.style.display = "none";
        document.getElementById("searchID").value = "";
        setShowSTD([]);
        studentList.splice(i, 1);
      }
    }
  }

  function getTeacherID(name) {
    for (let i = 0; i < teacherList.length; i++) {
      if (name == teacherList[i].name) {
        return teacherList[i].id;
      }
    }
  }
  // Get the modal

  /*---------------------ระบบsearch----------------------*/
  function searchSTD() {
    var searchID = document.getElementById("searchID").value;
    setShowSTD([]);
    for (let i = 0; i < studentList.length; i++) {
      if (searchID == studentList[i].id) {
        setShowSTD([...ShowSTD, studentList[i]]);
      }
    }
  }

  //---------------------modal-----------------------------
  function addMemberOn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  function addMemberOff() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  React.useEffect(() => {
    window.onclick = function (event) {
      var modal = document.getElementById("myModal");
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });
  //-------------------------------------------------

  function sendPopose() {
    var pnameTH = document.getElementById("p_name_th").value; //ชื่อโครงงานไทย
    var pnameEN = document.getElementById("p_name_en").value; //ชื่อโครงงานอังกฤษ
    var T_name = document.getElementById("teacher").value; //ที่ปรึกษา
    var sT_name = document.getElementById("subteacher").value; //ที่ปรึกษาร่วม
    var C_name = document.getElementById("committee").value; //กรรมการ
    var userID = user.id; //รหัสนิสิต
    var member = MemberList; //สมาชิก []
    var T_ID = getTeacherID(T_name); //รหัสที่ปรึกษา
    var sT_ID = getTeacherID(sT_name); //รหัสที่ปรึกษาร่วม
    var C_ID = getTeacherID(C_name); //รหัสกรรมการ
    var memberID = []; //รหัสนิสิต สมาชิก []
    memberID.push(userID);
    for (let i = 0; i < member.length; i++) {
      memberID.push(member[i].id);
    }
    /*** */
    Axios.get("", {
      //update ใส่database
      // update state +1 ในDB
      pnameTH: pnameTH, //ชื่อโปรเจ็คภาษาไทย
      pnameEN: pnameEN, //projectname
      T_ID: T_ID, //รหัสที่ปรึกษา
      sT_ID: sT_ID, //รหัสที่ปรึกษาร่วม "" ว่างไว้ได้
      C_ID: C_ID, //รหัสกรรมการ
      memberID: memberID, //array

      /*ส่งเข้าไปเก็บในตาราง propose น่าจะต้องมี 
      (id,
        projectname_th,
        projectname_en,
        teacher,sub_teacher,
        committee["xxxx","xxxx"],
        member["xxxx","xxxx"],
        ถ้ามีที่ปรึกษาร่วม
          comfirem[0,0,0,0,0]) ไว้เช็คการตอบรับจากอาจารย์ (ที่ปรึกษา,ที่ปรึกษาร่วม,กรรมการ1,กรรมการ2,อาจารย์ประจำรายวิชากรอกรหัสโปรเจ็ค)
        ถ้าไม่มีที่ปรึกษาร่วม ปรึกษาร่วม = ""
          comfirem[0,0,0,0]) ไว้เช็คการตอบรับจากอาจารย์ (ที่ปรึกษา,กรรมการ1,กรรมการ2,อาจารย์ประจำรายวิชากรอกรหัสโปรเจ็ค)
          project_id:""ว่างไว้รอแอดมินใส่ให้

    ****เพิ่มตารางจีบคู่ propose id กับ userID ให้ง่ายต่อการค้นหา 
    ตัวอย่าง
    ตารราง user_propose
    [id,userid,proposeid]
    [001,"60360197","ps001"]
    [002,"60360563","ps001"]
    [003,"60360492","ps002"]
    [004,"60360987","ps003"]          
          */
    }).then((response) => {
      //response
    });
  }
  return (
    <div className={style.popose}>
      <div className={style.p_title}>แบบฟอร์มเสนอหัวข้อโครงงาน</div>
      <div className={style.p_body}>
        <div className={style.p_content}>
          <p>ชื่อโครงงานภาษาไทย</p>
          <input id="p_name_th" placeholder="ชื่อโครงงานภาษาไทย..."></input>
          <p>ชื่อโครงงานภาษาอังกฤษ</p>
          <input id="p_name_en" placeholder="ชื่อโครงงานภาษาอังกฤษ..."></input>
          <p></p>
          <select
            id="teacher"
            name="teacher"
            autoComplete="off"
            defaultValue=""
          >
            <option value="" disabled selected>
              อาจารย์ที่ปรึกษา
            </option>
            {teacherList.map((val) => {
              return <option value={val.name}>{val.name}</option>;
            })}
          </select>
          <p></p>
          <select
            id="subteacher"
            name="subteacher"
            autoComplete="off"
            defaultValue=""
          >
            <option value="" disabled selected>
              อาจารย์ที่ปรึกษาร่วม
            </option>
            {teacherList.map((val) => {
              return <option value={val.name}>{val.name}</option>;
            })}
          </select>
          <p></p>
          <select
            id="committee"
            name="committee"
            autoComplete="off"
            defaultValue=""
          >
            <option value="" disabled selected>
              กรรมการ
            </option>
            {teacherList.map((val) => {
              return <option value={val.name}>{val.name}</option>;
            })}
          </select>
          {/*member*/}
          <div id="myModal" className={style.modal}>
            <div className={style.modal_content}>
              <div className={style.modal_header}>
                <h2>การเพิ่มสมาชิก</h2>
              </div>
              {/*-----------------------ระบบsearch(เปลี่ยนเอาแบบเทพๆ)--------------------------*/}
              <div className={style.modal_body}>
                <p>รหัสนิสิต:</p>
                <input
                  id="searchID"
                  onChange={searchSTD}
                  placeholder="รหัสนิสิต..."
                ></input>
                <p>ผลการค้นหา:</p>{" "}
                {ShowSTD.map((val) => {
                  return (
                    <p className={style.result} id={val.id}>
                      {val.name}
                    </p>
                  );
                })}
                <p />
                {/*----------------------------------------------------------------------------*/}
                <div className={style.small_btn}>
                  <button onClick={addMember}>เพิ่มสมาชิก</button>
                </div>
              </div>
            </div>
          </div>
          <p>สมาชิก</p>
          <p className={style.member}>
            รหัสนิสิต: <label className={style.info}>{user.id} </label>ชื่อ:{" "}
            <label className={style.info}>{user.thname}</label>
          </p>
          {MemberList.map((val) => {
            return (
              <p className={style.member}>
                รหัสนิสิต: <label className={style.info}>{val.id} </label>ชื่อ:
                <label className={style.info}> {val.name}</label>
              </p>
            );
          })}
          <div>
            <button className={style.s_btn} onClick={addMemberOn}>
              เพิ่มสมาชิก
            </button>
          </div>
          <button className={style.button} onClick={sendPopose}>
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}
