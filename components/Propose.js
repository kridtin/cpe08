import React, { useState } from "react";
import style from "../styles/propose.module.scss";
import Axios from "axios";
import { StepLabel } from "@material-ui/core";

export default function Propose(props) {
  const [user, setUser] = useState(props.user);
  const [MemberList, setMemberList] = useState([]);
  const [selectdTeacher, setselectdTeacher] = useState([]);
  const [ShowTeacher, setShowTeacher] = useState([]);

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
  function test(params) {
    window.alert(params);
  }
  const [tRole, settRole] = useState("");
  function updateTrole(id, role) {
    settRole("");
    document.getElementById("btn_t_role1").style = style.select;
    document.getElementById("btn_t_role2").style = style.select;
    document.getElementById("btn_t_role3").style = style.select;
    document.getElementById(id).style.color = "#00b74a";
    document.getElementById(id).style.border = "solid 2px #00b74a";
    settRole(role);
  }

  function addTeacher() {
    var modal = document.getElementById("tModal");
    var newMember = document.getElementById("searchTID").value;
    for (let i = 0; i < teacherList.length; i++) {
      if (teacherList[i].id == newMember) {
        var ateacher = {
          id: teacherList[i].id,
          name: teacherList[i].name,
          role: tRole,
        };
        setselectdTeacher([...selectdTeacher, ateacher]);
        modal.style.display = "none";
        document.getElementById("searchTID").value = "";
        document.getElementById("btn_t_role1").style = style.select;
        document.getElementById("btn_t_role2").style = style.select;
        document.getElementById("btn_t_role3").style = style.select;
        setShowTeacher([]);
        settRole("");
        teacherList.splice(i, 1);
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
  function searchTeacher() {
    var searchID = document.getElementById("searchTID").value;
    setShowTeacher([]);
    for (let i = 0; i < teacherList.length; i++) {
      if (searchID == teacherList[i].id) {
        setShowTeacher([...ShowTeacher, teacherList[i]]);
      }
    }
  }

  //---------------------modal-----------------------------
  function addMemberOn() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  function addTeacherOn() {
    var modal = document.getElementById("tModal");
    modal.style.display = "block";
  }
  function addMemberOff() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  React.useEffect(() => {
    window.onclick = function (event) {
      var modal = document.getElementById("myModal");
      var tmodal = document.getElementById("tModal");
      if (event.target == modal) {
        modal.style.display = "none";
        setShowSTD([]);
        document.getElementById("searchID").value = "";
      }
      if (event.target == tmodal) {
        tmodal.style.display = "none";
        settRole("");
        setShowTeacher([]);
        document.getElementById("searchTID").value = "";
        document.getElementById("btn_t_role1").style = style.select;
        document.getElementById("btn_t_role2").style = style.select;
        document.getElementById("btn_t_role3").style = style.select;
      }
    };
  });
  //-------------------------------------------------

  function sendPopose() {
    var pnameTH = document.getElementById("p_name_th").value; //ชื่อโครงงานไทย
    var pnameEN = document.getElementById("p_name_en").value; //ชื่อโครงงานอังกฤษ
    var p_des = document.getElementById("p_des").value; //รายละเอียดโครงงานโดยย่อ
    var teacher_List = selectdTeacher; //อาจารย์ [{id,name,role},{id,name,role}]
    var userID = user.id; //รหัสนิสิต
    var member = MemberList; //สมาชิก []
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
      p_des: p_des,
      tList: teacher_List, ////อาจารย์ [{id,name,role},{id,name,role}]

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
          <p>รายละเอียดโครงงานโดยย่อ</p>
          <textarea id="p_des" placeholder="รายละเอียดโครงงาน..."></textarea>

          {/*Teacher*/}
          <div id="tModal" className={style.modal}>
            <div className={style.modal_content}>
              <div className={style.modal_header}>
                <h2>เลือกอาจารย์</h2>
              </div>
              {/*-----------------------ระบบsearch(เปลี่ยนเอาแบบเทพๆ)--------------------------*/}
              <div className={style.modal_body}>
                <p>รหัสอาจารย์:</p>
                <input
                  id="searchTID"
                  onChange={searchTeacher}
                  placeholder="รหัสอาจารย์..."
                ></input>
                <p>ผลการค้นหา:</p>{" "}
                {ShowTeacher.map((val) => {
                  return (
                    <p className={style.result} id={val.id}>
                      {val.name}
                    </p>
                  );
                })}
                <p />
                <p>เลือกสถานะอาจารย์</p>
                <button
                  onClick={() => updateTrole("btn_t_role1", "อาจารย์ที่ปรึกษา")}
                  id="btn_t_role1"
                  className={style.select}
                >
                  ที่ปรึกษา
                </button>
                <button
                  onClick={() =>
                    updateTrole("btn_t_role2", "อาจารย์ที่ปรึกษาร่วม")
                  }
                  id="btn_t_role2"
                  className={style.select}
                >
                  ที่ปรึกษาร่วม
                </button>
                <button
                  onClick={() => updateTrole("btn_t_role3", "กรรมการ")}
                  id="btn_t_role3"
                  className={style.select}
                >
                  กรรมการ
                </button>
                {/*----------------------------------------------------------------------------*/}
                <div className={style.small_btn}>
                  <button onClick={addTeacher}>เลือกอาจารย์</button>
                </div>
              </div>
            </div>
          </div>
          <p>อาจารย์</p>

          {selectdTeacher.map((val) => {
            return (
              <p className={style.member}>
                รหัส: <label className={style.info}>{val.id} </label>ชื่อ:
                <label className={style.info}> {val.name}</label>สถานะ:
                <label className={style.info}> {val.role}</label>
              </p>
            );
          })}
          <div>
            <button className={style.s_btn} onClick={addTeacherOn}>
              เลือกอาจารย์
            </button>
          </div>
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
