import axios from "axios";
import style from "./analytics.module.css";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";

const AnalyticsRoute = () => {
  const [allPosts, setAllPosts] = useState();
  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("/api/get_all_posts");
      console.log(res.data);
      setAllPosts(res.data);
    } catch (error) {
      console.error(error.post, error);
    }
  };
  useEffect(() => {
    fetchAllPosts();
    console.log(allPosts);
  }, []);

  const postsLength = (post) => {
    console.log(post);
    if (post?.length == undefined || post?.length == null) {
      setTimeout(() => {
        return 0;
      }, 500);
      return <Skeleton width={"30px"} />;
    }
    return post?.length;
  };

  return (
    <>
      <div className={style.mainContainer}>
        <h4 className={style.heading}>Analytics</h4>
        <div className={style.boxContainer}>
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
              <span style={{fontWeight: "600"}}>16</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AnalyticsRoute;
