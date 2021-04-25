import React, { useState } from "react";
import styles from "../styles/user.module.scss";
import Image from "next/image";
import Camera from "../public/camera.svg";
import Edit from "../public/logbook.svg";
import Pws from "../public/key.svg";
import Close from "../public/close.svg";
import Layout from "../components/Layout";

export default function std_info() {
  const [user, setuser] = useState({
    id: "60360197",
    p_id: "CPE08",
    name: "กฤติน เพิ่มพูล",
    name_en: "Kridtin Permpoon",
    nickname: "เคน",
    email: "Kridtinp60@nu.ac.th",
    phone: "0xx xxx xxxx",
    pic: "/user.png",
  });

  function editOn() {
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
  }
  function editOff() {
    var modal = document.getElementById("editModal");
    modal.style.display = "none";
  }
  function changePicOn() {
    var modal = document.getElementById("picModal");
    modal.style.display = "block";
  }
  function changePicOff() {
    var modal = document.getElementById("picModal");
    modal.style.display = "none";
  }
  function changePic() {
    window.alert("Hay!");
  }

  function saveInfo() {
    var nameEn = document.getElementById("n-name-en").value;
    var name = document.getElementById("name").value;
    var nickname = document.getElementById("nickname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var modal = document.getElementById("editModal");
    setuser({
      id: user.id,
      p_id: user.p_id,
      name: name,
      name_en: nameEn,
      nickname: nickname,
      email: email,
      phone: phone,
      pic: user.pic,
    });
    modal.style.display = "none";
  }

  return (
    <div>
      <Layout user={{ username: user.name, role: "" }}>
        <div className={styles.content}>
          <div className={styles.titlebar}>
            <p>User Infomation ( ข้อมูลผู้ใช้ )</p>
            <p className={styles.desc}>ข้อมูลส่วนตัวผู้ใช้</p>
            <p className={styles.desc}>ชื่อ-นามสกุล: {user.name}</p>
            <p className={styles.desc}>รหัสโครงงาน: {user.p_id}</p>
          </div>
          <div className={styles.picture}>
            <img src={user.pic} height="300px" width="250px"></img>
          </div>

          <div className={styles.pic_svg} onClick={changePicOn}>
            <Camera width="30" height="30" />
          </div>
          <div className={styles.main}>
            <div className={styles.info}>
              <p className={styles.name}>ชื่อ(อังกฤษ) : {user.name_en}</p>
              <p className={styles.name}>ชื่อ : {user.name}</p>
              <p className={styles.id}>
                รหัสนิสิต: <label className={styles.id}>{user.id}</label>
              </p>
              <p>ชื่อเล่น: {user.nickname}</p>
              <p>อีเมลล์: {user.email}</p>
              <p>เบอร์โทร: {user.phone}</p>
            </div>
            <div className={styles.menu}>
              <div className={styles.edit} onClick={editOn}>
                <div className={styles.Svg}>
                  <Edit width="30" height="30" />
                </div>
                <p>แก้ไขข้อมูลส่วนตัว</p>
              </div>
              <div className={styles.pws}>
                <div className={styles.Svg}>
                  <Pws width="30" height="30" />
                </div>
                <p>เปลี่ยนรหัสผ่าน</p>
              </div>
            </div>
          </div>
          <div id="picModal" className={styles.modal}>
            <div className={styles.modal_content}>
              <div className={styles.modal_header}>
                <h2>รูปโปร์ไฟล์</h2>
                <div className={styles.close} onClick={changePicOff}>
                  <Close width="30" height="30" />
                </div>
              </div>
              <div className={styles.modal_body_c}>
                <img src={user.pic} height="300px" width="250px"></img>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpg,.png"
                  className={styles.file}
                />
                <label for="file">เลือกรูปภาพ</label>
                <div className={styles.small_btn}>
                  <button onClick={changePic}>เปลี่ยน</button>
                </div>
              </div>
            </div>
          </div>
          <div id="editModal" className={styles.modal}>
            <div className={styles.modal_content}>
              <div className={styles.modal_header}>
                <h2>แก้ไขข้อมูลส่วนตัว</h2>
                <div className={styles.close} onClick={editOff}>
                  <Close width="30" height="30" />
                </div>
              </div>
              <div className={styles.modal_body}>
                <p>
                  <label>ชื่อ(อังกฤษ):</label>
                  <input id="n-name-en" defaultValue={user.name_en} />
                </p>
                <p>
                  <label>ชื่อ:</label>
                  <input id="name" defaultValue={user.name} />
                </p>
                <p>
                  <label>ชื่อเล่น:</label>
                  <input id="nickname" defaultValue={user.nickname} />
                </p>
                <p>
                  <label>อีเมลล์:</label>
                  <input id="email" defaultValue={user.email} />
                </p>
                <p>
                  <label>เบอร์โทร:</label>
                  <input id="phone" defaultValue={user.phone} />
                </p>
                <button onClick={saveInfo}>บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
