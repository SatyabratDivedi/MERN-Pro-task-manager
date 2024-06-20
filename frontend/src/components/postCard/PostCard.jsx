import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import style from "./postCard.module.css";
import {BsThreeDots} from "react-icons/bs";
import {IoChevronUpSharp} from "react-icons/io5";
import {IoChevronDownSharp} from "react-icons/io5";

const PostCard = ({collapse, catogary}) => {
  const [open, setOpen] = useState(false);
  const [threeDotOpen, setThreeDotOpen] = useState(false);

  useEffect(() => {
    collapse ? setOpen(true) : setOpen(false);
  }, [collapse]);

  const editTodoHandler = () => {
    console.log("edit");
    setThreeDotOpen(false);
  };
  const shareTodoHandler = () => {
    console.log("share");
    setThreeDotOpen(false);
  };
  const deleteTodoHandler = () => {
    console.log("delete");
    setThreeDotOpen(false);
  };

  return (
    <div className={style.mainBox}>
      <div className={style.prioritySection}>
        <div className={style.priorityChild}>
          <div style={{background: "red"}} className={style.Circle}></div>
          <div>HIGH PRIORITY</div>
          <div className={style.nameCircle}>SK</div>
          <div className={style.assignEmail}>
            <div>skdiivedi@gmail.com</div>
          </div>
        </div>
        <div>
          <BsThreeDots onClick={() => setThreeDotOpen(!threeDotOpen)} className={style.threeDot} />
          <div style={{display: threeDotOpen ? "flex" : "none"}} className={style.threeDotElement}>
            <div onClick={editTodoHandler} className={style.DotElement}>
              Edit
            </div>
            <div onClick={shareTodoHandler} className={style.DotElement}>
              Share
            </div>
            <div onClick={deleteTodoHandler} className={style.DotElement}>
              Delete
            </div>
          </div>
        </div>
      </div>
      <div className={style.hero}>Hero Secion</div>
      <div className={style.checklist}>
        <div>Checklist (0/3)</div>
        <div onClick={() => setOpen(!open)} className={style.arrow}>
          {open ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
        </div>
      </div>
      <div style={{display: open ? "block" : "none"}} className={style.todoBoxContainer}>
        <div className={style.todoBox}>
          <input type="checkbox" name="" id="" />
          <div>First Todos lo</div>
        </div>
        <div className={style.todoBox}>
          <input type="checkbox" name="" id="" />
          <div>First Todos lo is the data and the secons</div>
        </div>
      </div>
      <div className={style.footer}>
        <div style={{color: "white", background: catogary === "Done" ? "#63C05B" : "#CF3636"}} className={style.footerbox}>
          Feb 10th
        </div>
        <div className={style.catogaryList}>
          <div className={style.footerbox}>PROGRESS</div>
          <div className={style.footerbox}>TO-DO</div>
          <div className={style.footerbox}>DONE</div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  collapse: PropTypes.bool,
  catogary: PropTypes.string,
};
export default PostCard;
