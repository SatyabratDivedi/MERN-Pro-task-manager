import style from "./dashboard.module.css";
import {GoPeople} from "react-icons/go";
import {VscCollapseAll} from "react-icons/vsc";
import PostCard from "../postCard/PostCard";
import {useEffect, useState} from "react";
import {IoAddSharp} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {addTodoFlash, peopleAddFlash} from "../../reduxStore/FlashSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

const MainDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState({});
  const [userData, setUserData] = useState();
  const isLogin = useSelector((state) => state.loginReducer.isLoginState);
  const toggleCollapse = (item) => {
    setCollapse((prevState) => ({...prevState, [item]: !prevState[item]}));
  };
  // const addTodo = () => {
  //   console.log("add clicked");
  // };
  const addPeopleHandle = () => {
    dispatch(peopleAddFlash(true));
  };

  const fetchUserDetails = async () => {
    const isFirstVisit = localStorage.getItem("firstVisit") === null;
    console.log(isFirstVisit);
    console.log(isLogin);
    let toastId;
    if (isFirstVisit) {
      setTimeout(() => {
        toastId = toast.loading("Connecting with backend...");
      }, 0);
    }
    try {
      const data = await axios.get("/api/getLoginUserDetails");
      console.log(data)
      setUserData(data.data);
      if (isFirstVisit) {
        setTimeout(() => {
          toast.success("🥳Login success & connected with backend", {
            id: toastId,
          });
        }, 1000);
        localStorage.setItem("firstVisit", false);
        localStorage.setItem("isLogin", true);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        navigate("/login");
      }, 1001);
      if (error.response.data.msg == "unauthorized! please login first") {
        setTimeout(() => {
          toast.error(error.response.data.msg, {
            id: toastId,
          });
        }, 700);
        localStorage.removeItem("isLogin");
        localStorage.removeItem("firstVisit");
        return;
      }
      setTimeout(() => {
        toast.error(error.code, {
          id: toastId,
        });
      }, 1000);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  function formatDateSimple(date) {
    const suffixes = ["th", "st", "nd", "rd"];
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = suffixes[day % 10 > 3 ? 0 : ((day % 100) - (day % 10) != 10) * (day % 10)];

    return `${day}${daySuffix} ${month} ${year}`;
  }
  const date = formatDateSimple(new Date());
  return (
    <>
      {
        // !isLogin ? (
        //   ""
        // ) :
        <div className={style.container}>
          <div className={style.welcome}>
            <div>Welcome! { userData?.user.name ||  <Skeleton height={20} width={150} />}</div>
            <div className={style.date}>{date}</div>
          </div>
          <div className={style.board}>
            <div>
              Board
              <span onClick={addPeopleHandle} className={style.boardChild}>
                <GoPeople /> Add People
              </span>
            </div>
            <select className={style.select}>
              <option className={style.option}>Today</option>
              <option className={style.option}>This Week</option>
              <option className={style.option}>This Month</option>
            </select>
          </div>
          <div className={style.scrollContainer}>
            <div className={style.boxMain}>
              {["Backlog", "To do", "in Progress", "Done"].map((catogary, i) => (
                <div key={i} className={style.box}>
                  <div className={style.boxHead}>
                    <div>{catogary}</div>
                    <div className={style.addCollapseIcon}>
                      {catogary == "To do" && <IoAddSharp onClick={() => dispatch(addTodoFlash(true))} style={{cursor: "pointer"}} />}
                      <VscCollapseAll onClick={() => toggleCollapse(catogary)} style={{cursor: "pointer"}} />
                    </div>
                  </div>
                  <div style={{paddingInline: "10px"}}>
                    {[1, 2, 3].map((_, i) => (
                      <PostCard key={i} collapse={collapse[catogary]} catogary={catogary} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default MainDashboard;
