import {useState} from "react";
import style from "./login.module.css";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {IoPersonOutline} from "react-icons/io5";
import {CiMail, CiLock} from "react-icons/ci";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    passwordErrMsg: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if (name == "password") {
      value == "" ? setShowPassword(false) : setShowPassword(true);
    }
    if (name == "password2") {
      value == "" ? setShowPassword2(false) : setShowPassword2(true);
    }
  };

  const validateForm = () => {
    const {name, email, password, password2} = formData;
    let isValid = true;
    let newErrors = {name: !name, email: !email, password: false, passwordErrMsg: ""};

    if (password !== password2 || password === "") {
      isValid = false;
      newErrors.password = true;
      newErrors.passwordErrMsg = password === "" ? "Required" : "Passwords do not match";
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerHandle = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const {name, email, password} = formData;
    try {
      const toastId = toast.loading("Creating account...");
      const res = await axios.post("/api/sign-up", {name, email, password});
      toast.success(res.data.msg, {id: toastId});
      navigate("/login");
    } catch (error) {
      const errMsg = error.response?.data?.msg || error.code;
      toast.error(errMsg, {id: toast.loading("Creating account...")});
    }
  };

  return (
    <>
      <div className={style.container}>
        {/* Left Section */}
        <div className={style.left}>
          <div className={style.img}>
            <img src="src/assets/Art.png" height={400} width={400} alt="" />
          </div>
          <div className={style.welcomeText}>Welcome aboard my friend</div>
          <div>just a couple of clicks and we start</div>
        </div>
        {/* Right Section */}
        <div className={style.right}>
          <div className={style.formHeaderTxt}>Register</div>
          <form onSubmit={registerHandle}>
            {/* Name Input Section */}
            <div className={style.InpMain}>
              <IoPersonOutline className={style.icon} />
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" aria-label="Name" />
              {errors.name && <div className={style.require}>*Required</div>}
            </div>
            {/* Email Input Section */}
            <div className={style.InpMain}>
              <CiMail className={style.icon} />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" aria-label="Email" required />
              {errors.email && <div className={style.require}>*Required</div>}
            </div>
            {/* Password Input Section */}
            <div className={style.InpMain}>
              <CiLock className={style.icon} />
              <input type={showPassword ? "password" : "text"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} aria-label="Password" />
              <div onClick={() => setShowPassword(!showPassword)} style={{translate: "-15px", fontSize: "22px", cursor: "pointer", color: "#999"}}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
              {errors.password && <div className={style.require}>*{errors.passwordErrMsg}</div>}
            </div>
            {/* Confirm Password Input Section */}
            <div className={style.InpMain}>
              <CiLock className={style.icon} />
              <input type={showPassword2 ? "password" : "text"} name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleInputChange} aria-label="Confirm Password" />
              <div onClick={() => setShowPassword2(!showPassword2)} style={{translate: "-15px", fontSize: "22px", cursor: "pointer", color: "#999"}}>
                {showPassword2 ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {/* Register Button Section */}
            <button type="submit" className={style.filledBtn}>
              Register
            </button>
          </form>
          <div className={style.accountText}>Have an account</div>
          <Link to="/login" className={style.blankBtn}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
