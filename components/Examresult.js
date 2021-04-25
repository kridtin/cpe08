import React, { useState } from "react";
import style from "../styles/es.module.scss";

export default function examresult(props) {
  const [user, setUser] = useState({});

  var c_result0 = "";
  var c_result1 = "";
  var c_result2 = "";
  var c_tComment = "";
  var c_c1Comment = "";
  var c_c2Comment = "";

  function send() {
    var state = props.state;
    var result0 = document.getElementById("result0").value;
    var result1 = document.getElementById("result1").value;
    var result2 = document.getElementById("result2").value;
    var tComment = document.getElementById("tComment").value;
    var c1Comment = document.getElementById("c1Comment").value;
    var c2Comment = document.getElementById("c2Comment").value;
    c_result0 = result0;
    c_result1 = result1;
    c_result2 = result2;
    c_tComment = tComment;
    c_c1Comment = c1Comment;
    c_c2Comment = c2Comment;
    window.alert(state);

    //ส่งไปบันทึกdatabase
    // state มี 2 state คือ 4(ผลสอบหัวข้อ) กับ 10(ผลสอบจบ)
    // c_result0 = ผลสอบ อ.ที่ปรึกษา
    // c_result1 = ผลสอบ อ.กรรมการ1
    // c_result2 = ผลสอบ อ.กรรมการ2
    // c_tComment = ความเห็น อ.ที่ปรึกษา
    // c_c1Comment = ความเห็น อ.กรรมการ1
    // c_c2Comment = ความเห็น อ.กรรมการ2
  }

  return (
    <div className={style.content}>
      <div className={style.title}>แบบบันทึกผลการสอบ</div>
      <div className={style.body}>
        <p className={style.header}>ความคิดเห็นผู้ประเมิณ</p>
        <p></p>
        <p>อาจารย์ที่ปรึกษา</p>
        <select id="result0">
          <option disabled selected>
            ความคิดเห็นผู้ประเมิณ
          </option>
          <option>ผ่าน</option>
          <option>ไม่ผ่าน</option>
          <optgroup label="ผ่านแบบมีเงื่อนไข">
            <option>สอบใหม่</option>
            <option>ไม่ต้องสอบใหม่</option>
          </optgroup>
        </select>
        <p>อาจารย์กรรมการ1</p>
        <select id="result1">
          <option disabled selected>
            ความคิดเห็นผู้ประเมิณ
          </option>
          <option>ผ่าน</option>
          <option>ไม่ผ่าน</option>
          <optgroup label="ผ่านแบบมีเงื่อนไข">
            <option>สอบใหม่</option>
            <option>ไม่ต้องสอบใหม่</option>
          </optgroup>
        </select>
        <p>อาจารย์กรรมการ2</p>
        <select id="result2">
          <option disabled selected>
            ความคิดเห็นผู้ประเมิณ
          </option>
          <option>ผ่าน</option>
          <option>ไม่ผ่าน</option>
          <optgroup label="ผ่านแบบมีเงื่อนไข">
            <option>สอบใหม่</option>
            <option>ไม่ต้องสอบใหม่</option>
          </optgroup>
        </select>
        <p className={style.header}>สรุปข้อเสนอแนะ</p> <p></p>
        <p>อาจารย์ที่ปรึกษา</p>
        <textarea id="tComment" />
        <p>กรรมการ1</p>
        <textarea id="c1Comment" />
        <p>กรรมการ2</p>
        <textarea id="c2Comment" />
      </div>
      <button onClick={send} className={style.button}>
        ส่ง
      </button>
    </div>
  );
}
