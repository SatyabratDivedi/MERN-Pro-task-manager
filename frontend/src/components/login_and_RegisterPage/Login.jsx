import {useState} from "react";
import style from "./login.module.css";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {CiLock, CiMail} from "react-icons/ci";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {isLogin} from "../../reduxStore/isLoginSlice";
import mainImg from './../../assets/Art.png';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({email: false, password: false});
  const [formData, setFormData] = useState({email: "", password: ""});

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    setFormErrors((prev) => ({...prev, [name]: false}));
    if (name == "password") {
      value == "" ? setShowPassword(false) : setShowPassword(true);
    }
  };

  const validateForm = () => {
    const errors = {};
    errors.email = !formData.email;
    errors.password = !formData.password;
    setFormErrors(errors);
    return !errors.email && !errors.password;
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const toastId = toast.loading("Checking...");
    try {
      await axios.post("https://pro-task-manager-3frj.vercel.app/api/sign-in", formData, {withCredentials: true});
      toast.remove(toastId);
      dispatch(isLogin(true));
      navigate("/");
    } catch (error) {
      const errMsg = error.response?.data?.msg || error.code;
      toast.error(errMsg, {
        id: toastId,
      });
    }
  };

  return (
    <>
      <div className={style.container}>
        {/* Left Section */}
        <div className={style.left}>
          <div className={style.img}>
            <img src={mainImg} height={400} width={400} alt="" />
          </div>
          <div className={style.welcomeText}>Welcome aboard my friend</div>
          <div>just a couple of clicks and we start</div>
        </div>
        {/* Right Section */}
        <div className={style.right}>
          <div className={style.formHeaderTxt}>Login</div>
          <form onSubmit={loginHandle}>
            {/* Email Input */}
            <div className={style.InpMain}>
              <CiMail className={style.icon} />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" aria-label="Email" required />
              {formErrors.email && <div className={style.require}>*Required</div>}
            </div>
            {/* Password Input */}
            <div className={style.InpMain}>
              <CiLock className={style.icon} />
              <input type={showPassword ? "password" : "text"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              <div onClick={() => setShowPassword(!showPassword)} style={{translate: "-15px", fontSize: "22px", cursor: "pointer", color: "#999"}}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
              {formErrors.password && <div className={style.require}>*Required</div>}
            </div>
            {/* Login Button */}
            <button type="submit" className={style.filledBtn}>
              Log in
            </button>
          </form>
          <div className={style.accountText}>Have no account yet?</div>
          <Link to="/register" className={style.blankBtn}>
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
