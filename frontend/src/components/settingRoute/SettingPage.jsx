import {useState} from "react";
import style from "./setting.module.css";
import {FiEye} from "react-icons/fi";
import {LuEyeOff} from "react-icons/lu";
import {IoPersonOutline} from "react-icons/io5";

const SettingPage = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  // const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.heading}>Setting</div>
        <div className={style.boxContainer}>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <IoPersonOutline />
              <input className={style.input} type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <IoPersonOutline />
              <input className={style.input} type={showPassword ? "text" : "password"} name="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div onClick={() => setShowPassword(!showPassword)} style={{fontSize: "22px", cursor: "pointer", color: "#999"}}>
              {showPassword ? <LuEyeOff /> : <FiEye />}
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <IoPersonOutline />
              <input className={style.input} type={showPassword ? "text" : "password"} name="password" placeholder="New Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div onClick={() => setShowPassword(!showPassword)} style={{fontSize: "22px", cursor: "pointer", color: "#999"}}>
              {showPassword ? <LuEyeOff /> : <FiEye />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingPage;
