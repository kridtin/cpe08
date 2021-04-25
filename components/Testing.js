import React from "react";
import styles from "../styles/waiting.module.scss";

export default function Testing(props) {
  if (props.state == 3) {
    var topic = "สอบหัวข้อโครงงาน";
  } else if (props.state == 9) {
    var topic = "สอบจบ";
  }
  function update_state(params) {
    //update state +1
  }

  return (
    <div className={styles.waiting}>
      <div className={styles.header}>{topic}</div>
      <div className={styles.body}>
        <div id="submit" className={styles.submit}>
          <button onClick={update_state}>บันทึกผลการสอบ</button>
        </div>
      </div>
    </div>
  );
}
