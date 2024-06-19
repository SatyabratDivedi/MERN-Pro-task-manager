import style from "./postCard.module.css";
import {BsThreeDots} from "react-icons/bs";
import {IoChevronUpSharp} from "react-icons/io5";

const PostCard = () => {
  return (
    <div className={style.mainBox}>
      <div className={style.prioritySection}>
        <div className={style.priorityChild}>
          <div style={{background: "red"}} className={style.Circle}></div>
          <div>HIGH PRIORITY</div>
          <div className={style.nameCircle}>SK</div>
        </div>
        <BsThreeDots />
      </div>
      <div className={style.hero}>Hero Secion</div>
      <div className={style.checklist}>
        <div>Checklist (0/3)</div>
        <div className={style.arrow}>
          <IoChevronUpSharp />
        </div>
      </div>
      <div className={style.todoBoxContainer}>
        <div className={style.todoBox}>
          <input type="checkbox" name="" id="" />
          <div>First Todos lo</div>
        </div>
        <div className={style.todoBox}>
          <input type="checkbox" name="" id="" />
          <div>First Todos lo is the data  and the secons</div>
        </div>
      </div>
      <div className={style.footer}>
        <div style={{background:'#CF3636', color:'white'}} className={style.footerbox} >Feb 10th</div>
        <div className={style.catogaryList}>
            <div className={style.footerbox}>PROGRESS</div>
            <div className={style.footerbox}>TO-DO</div>
            <div className={style.footerbox}>DONE</div>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
