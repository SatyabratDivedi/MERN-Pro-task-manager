import {useState} from "react";
import style from "./../login/login.module.css";
import {FiEye} from "react-icons/fi";
import {LuEyeOff} from "react-icons/lu";
import {Link} from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);

  const registerHandle = (e) => {
    e.preventDefault();
    password !== password2 && password !== "" ? setError3(true) : setError3(false);
    if (password !== password2) {
      setError3(true);
      setPasswordErrMsg("Password does not match");
    }
    if (password === "") {
      setError3(true);
      setPasswordErrMsg("required");
    }
    name === "" ? setError1(true) : setError1(false);
    email === "" ? setError2(true) : setError2(false);
    if (name && email && password && password2 == password) {
      console.log(name, email, password);
      // setName("");
      // setEmail("");
      // setPassword("");
      // setPassword2("");
      // fetchRegisterData();
    }
  };



  return (
    <>
      <div className={style.container}>
        <div className={style.left}>
          <div className={style.img}>
            <img src="src/assets/Art.png" height={400} width={400} alt="" />
          </div>
          <div className={style.welcomeText}>Welcome aboard my friend</div>
          <div>just a couple of clicks and we start</div>
        </div>
        <div className={style.right}>
          <div style={{fontWeight: "600", marginBottom: "50px", fontSize: "30px"}}>Register</div>
          <form action="">
            <div className={style.InpMain}>
              <div className={style.UserImg}></div>
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" id="" />
              {error1 && <div className={style.require}>*require</div>}
            </div>
            <div className={style.InpMain}>
              <div className={style.EmailImg}></div>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="" />
              {error2 && <div className={style.require}>*require</div>}
            </div>
            <div className={style.InpMain}>
              <div className={style.PassImg}></div>
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div onClick={() => setShowPassword(!showPassword)} style={{translate: "-15px", fontSize: "22px", cursor: "pointer", color: "#999"}}>
                {showPassword ? <LuEyeOff /> : <FiEye />}
              </div>
              {error3 && <div className={style.require}>*{passwordErrMsg}</div>}
            </div>
            <div className={style.InpMain}>
              <div className={style.PassImg}></div>
              <input type={showPassword2 ? "text" : "password"} placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
              <div onClick={() => setShowPassword2(!showPassword2)} style={{translate: "-15px", fontSize: "22px", cursor: "pointer", color: "#999"}}>
                {showPassword2 ? <LuEyeOff /> : <FiEye />}
              </div>
            </div>
            <button type="submit" onClick={registerHandle} className={style.filledBtn}>
              Register
            </button>
          </form>
          <div style={{marginBlock: "20px", marginBottom: "5px", color: "#999"}}>Have an account</div>
          <Link to="/login" className={style.blankBtn}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
export default Register;
