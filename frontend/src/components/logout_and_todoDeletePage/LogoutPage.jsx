import {useDispatch} from "react-redux";
import {logoutFlash} from "../../reduxStore/FlashSlice";
import style from "./../addPeoplePage/peoplePage.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const btnStyle = {
  width: "100%",
  padding: "12px",
};

const Logout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post("https://pro-task-manager-3frj.vercel.app/api/logout", {token: token});
      if (res.status == 200) {
        navigate("/login");
        dispatch(logoutFlash(false));
        toast.success(res.data.msg);
        localStorage.clear();
      }
    } catch (error) {
      dispatch(logoutFlash(false));
      toast.error(error.response.data.msg);
    }
  };
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.mainContainer}>
        <div style={{alignItems: "center", width: "340px"}} className={style.container}>
          <div style={{fontSize: "14px", marginBottom: "9px"}} className={style.headerTxt}>
            Are you sure you want to Logout?
          </div>
          {/* Bottom Section */}
          <button onClick={logoutHandler} style={btnStyle} type="submit" className={style.addEmailBtn}>
            Yes, Logout
          </button>
          <button style={btnStyle} type="button" onClick={() => dispatch(logoutFlash(false))} className={style.cancleBtn}>
            Cancle
          </button>
        </div>
      </div>
    </>
  );
};
export default Logout;
