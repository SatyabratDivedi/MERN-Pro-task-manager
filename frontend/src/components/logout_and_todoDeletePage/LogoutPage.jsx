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
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const data = await axios.get("/api/logout");
      if (data.status == 200) {
        navigate("/login");
        dispatch(logoutFlash(false));
        toast.success(data.data.msg);
        localStorage.removeItem("firstVisit");
      }
    } catch (error) {
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
