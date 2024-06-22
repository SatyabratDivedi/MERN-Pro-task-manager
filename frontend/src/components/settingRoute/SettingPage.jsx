import {useState} from "react";
import style from "./setting.module.css";
import {FiEye} from "react-icons/fi";
import {LuEyeOff} from "react-icons/lu";
import {IoPersonOutline} from "react-icons/io5";
import {CiMail} from "react-icons/ci";
import {CiLock} from "react-icons/ci";

const SettingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.heading}>Setting</div>
        <div className={style.boxContainer}>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <IoPersonOutline className={style.icon} />
              <input className={style.input} type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <CiMail className={style.icon} />
              <input className={style.input} type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <CiLock className={style.icon} />
              <input className={style.input} type={showPassword ? "text" : "password"} name="oldPassword" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div onClick={() => setShowPassword(!showPassword)} style={{fontSize: "22px", cursor: "pointer", color: "#999"}}>
              {showPassword ? <LuEyeOff /> : <FiEye />}
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <CiLock className={style.icon} />
              <input className={style.input} type={showPassword2 ? "text" : "password"} name="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div onClick={() => setShowPassword2(!showPassword2)} style={{fontSize: "22px", cursor: "pointer", color: "#999"}}>
              {showPassword2 ? <LuEyeOff /> : <FiEye />}
            </div>
          </div>
          <button className={style.updateBtn}>Update</button>
        </div>
      </div>
    </>
  );
};
export default SettingPage;
