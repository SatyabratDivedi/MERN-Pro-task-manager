import axios from "axios";
import style from "./SinglePostPage.module.css";
import {PiCodesandboxLogoLight} from "react-icons/pi";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import {format} from "date-fns";
import toast from "react-hot-toast";

const SignlePostPage = () => {
  const [post, setPost] = useState({});
  const {postId} = useParams();

  const fetchPostData = async () => {
   try {
    const res = await axios.get(`https://pro-task-manager-3frj.vercel.app/api/getOnePost/${postId}`,  {withCredentials: true});
    setPost(res.data);
   } catch (error) {
    toast.error(error.response.data.msg);
   }
  };
  useEffect(() => {
    fetchPostData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    const currentDate = new Date();
    const isOlder = date < currentDate;
    const formattedDate = format(date, "MMM do");
    const color = isOlder ? "#CF3636" : "#DBDBDB";

    return {formattedDate, color};
  };

  return (
    <>
      <div className={style.mainContainer}>
        {/* Header Section */}
        <div className={style.header}>
          <PiCodesandboxLogoLight className={style.headerIcon} />
          <div className={style.headerTxt}>Pro Manage</div>
        </div>
        <div className={style.mainContainer2}>
          <div className={style.heroContainer}>
             {/* Priority Section */}
            <div className={style.prioritySection}>
              <div style={{background: post.priority === "HIGH PRIORITY" ? "#FF2473" : post.priority == "MODERATE PRIORITY" ? "#18B0FF" : post.priority == "LOW PRIORITY" ? "#18B0FF" : "#707070"}} className={style.priorityCircle}></div>
              <div className={style.priorityTxt}>{post.priority || <Skeleton />}</div>
            </div>
            <div className={style.title}>{post.title || <Skeleton width={300} />} </div>
            {/* checklist start */}
            <div className={style.checklistMainContainer}>
              <div className={style.titleSection}>
                <div>
                  Checklist ({post?.todosList?.filter((item) => item.isCompleted).length}/{post?.todosList?.length})
                </div>
              </div>
              <div className={style.checklistBoxContainer}>
                {post?.todosList?.map((item, i) => {
                  return (
                    <div key={i} style={{display: "flex"}} className={style.checklistContainer}>
                      <input onClick={() => toast.error("Not editable, Read Only")} className={style.todoCheckBox} type="checkbox" checked={item.isCompleted} />
                      <div className={style.todoInput}>{item.todoContent}</div>
                    </div>
                  );
                }) || <Skeleton count={5} height={25} />}
              </div>
            </div>
            {/* Due Date Section */}
            <div className={style.footerDateSection} style={{display: post.date == "" ? "none" : ""}}>
              <div>Due Dat</div>
              <div style={{color: formatDate(post?.date).color === "#CF3636" ? "white" : "black", background: post?.catogary === "Done" ? "#63C05B" : formatDate(post?.date).color, cursor: "text"}} className={style.footerbox}>
                {formatDate(post?.date).formattedDate || <Skeleton width={30} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignlePostPage;
