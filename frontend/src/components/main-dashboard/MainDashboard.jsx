import style from "./dashboard.module.css";
import {GoPeople} from "react-icons/go";
import {VscCollapseAll} from "react-icons/vsc";
import PostCard from "../postCard/PostCard";

const MainDashboard = () => {
  return (
    <>
      <div className={style.container}>
        <div className={style.welcome}>
          <div>Welcome! Kumar</div>
          <div className={style.date}>12th Jan 2024</div>
        </div>
        <div className={style.board}>
          <div>
            Board
            <span className={style.boardChild}>
              <GoPeople /> Add People
            </span>
          </div>
          <div>This week</div>
        </div>
        <div className={style.boxMain}>
          <div className={style.box}>
            <div className={style.boxHead}>
              <div>Backlog</div>
              <VscCollapseAll />
            </div>
            <div style={{paddingInline:'10px'}}>
              <PostCard />
              <PostCard />
            </div>
          </div>
          <div className={style.box}>
            <div className={style.boxHead}>
              <div>Backlog</div>
              <VscCollapseAll />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainDashboard;
