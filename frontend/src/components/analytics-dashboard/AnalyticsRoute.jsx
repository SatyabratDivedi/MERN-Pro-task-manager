import axios from "axios";
import style from "./analytics.module.css";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";

const AnalyticsRoute = () => {
  const [allPosts, setAllPosts] = useState();
  const token = localStorage.getItem("token");
  const fetchAllPosts = async () => {
    try {
      // const res = await axios.get("https://pro-task-manager-3frj.vercel.app/api/get_all_posts",  {withCredentials: true});
      const res = await axios.post("http://localhost:3000/api/get_all_posts",{token:token},  {withCredentials: true});
      setAllPosts(res.data);
    } catch (error) {
      toast.error(error.response.data.msg || error.code);
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const postsLength = (post) => {
    if (post?.length == undefined || post?.length == null) {
      setTimeout(() => {
        return 0;
      }, 500);
      return <Skeleton width={"30px"} />;
    }
    return post?.length;
  };

  const countOlderPosts = (data) => {
    if (!data) return <Skeleton width={"30px"} />;
    let count = 0;
    let postsHaveDate = data?.length;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    data?.forEach((post) => {
      if (post?.date) {
        const postDate = new Date(post.date);
        postDate.setHours(0, 0, 0, 0);
        if (postDate < currentDate) {
          count++;
        }
      } else {
        postsHaveDate--;
      }
    });
    return postsHaveDate - count;
  };

  return (
    <>
      <div className={style.mainContainer}>
        <h4 className={style.heading}>Analytics</h4>
        <div className={style.boxContainer}>
            {/* Analytics Section */}
          <div className={style.box}>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Backlog Tasks
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.BACKLOG)}</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                To-do Tasks
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.TODO)}</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                In-Progress Tasks
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.INPROCESS)}</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Completed Tasks
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.DONE)}</span>
            </div>
          </div>
          <div className={style.box}>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Low Priority
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.LOWPRIORITY)}</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Moderate Priority
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.MODERATEPRIORITY)}</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                High Priority
              </div>
              <span style={{fontWeight: "600"}}>{postsLength(allPosts?.HIGHPRIORITY)}</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Due Date Tasks
              </div>
              <span style={{fontWeight: "600"}}>{countOlderPosts(allPosts?.ALLPOSTS)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AnalyticsRoute;
