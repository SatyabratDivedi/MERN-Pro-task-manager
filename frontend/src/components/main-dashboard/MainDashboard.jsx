import style from "./dashboard.module.css";
import {GoPeople} from "react-icons/go";
import {VscCollapseAll} from "react-icons/vsc";
import PostCard from "../postCard/PostCard";
import {useState} from "react";
import {IoAddSharp} from "react-icons/io5";

const MainDashboard = () => {
  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = (item) => {
    setCollapse((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };
  const addTodo = () => {
    console.log("add clicked");
  };
  const addPeopleHandle = () => {
    console.log("add people handle");
  };
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
                    {catogary == "To do" && <IoAddSharp onClick={addTodo} style={{cursor: "pointer"}} />}
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
    </>
  );
};
export default MainDashboard;
