import {useEffect, useState} from "react";
import style from "./setting.module.css";
import {FiEye} from "react-icons/fi";
import {LuEyeOff} from "react-icons/lu";
import {IoPersonOutline} from "react-icons/io5";
import {CiMail, CiLock} from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const SettingPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [user, setUser] = useState({});
  const {name, email, oldPassword, newPassword} = user;

  const editHandle = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
    if (e.target.name === "oldPassword") {
      e.target.value == "" ? setShowPassword(false) : setShowPassword(true);
    }
    if (e.target.name === "newPassword") {
      e.target.value == "" ? setShowPassword2(false) : setShowPassword2(true);
    }
  };

  const fetchLoginUser = async () => {
    try {
      const res = await axios.get("/api/getLoginUserDetails");
      console.log(res.data.user);
      if (res?.data?.user) {
        const {name, email} = res.data.user;
        setUser({
          name: name || "",
          email: email || "",
        });
      }
    } catch (error) {
      if (error.response.data.msg == "unauthorized! please login first") {
        toast.error(error.response.data.msg);
        navigate("/login");
        toast.error(error.code);
        return;
      }
    }
  };

  const updateDetailsHandler = async () => {
    console.log(user);
    try {
      const res = await axios.put("/api/updateUserDetails", {user});
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoginUser();
  }, []);

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.heading}>Setting</div>
        <div className={style.boxContainer}>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <IoPersonOutline className={style.icon} />
              <input className={style.input} type="text" name="name" placeholder="Name" value={name} onChange={editHandle} />
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <CiMail className={style.icon} />
              <input className={style.input} type="email" name="email" placeholder="Email" value={email} onChange={editHandle} />
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <CiLock className={style.icon} />
              <input className={style.input} type={showPassword ? "password" : "text"} name="oldPassword" placeholder="Old Password" value={oldPassword} onChange={editHandle} />
            </div>
            <div onClick={() => setShowPassword(!showPassword)} style={{fontSize: "22px", cursor: "pointer", color: "#999"}}>
              {showPassword ? <LuEyeOff /> : <FiEye />}
            </div>
          </div>
          <div className={style.box}>
            <div className={style.imgInpArea}>
              <CiLock className={style.icon} />
              <input className={style.input} type={showPassword2 ? "password" : "text"} name="newPassword" placeholder="New Password" value={newPassword} onChange={editHandle} />
            </div>
            <div onClick={() => setShowPassword2(!showPassword2)} style={{fontSize: "22px", cursor: "pointer", color: "#999"}}>
              {showPassword2 ? <LuEyeOff /> : <FiEye />}
            </div>
          </div>
          <button onClick={updateDetailsHandler} className={style.updateBtn}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};
export default SettingPage;
