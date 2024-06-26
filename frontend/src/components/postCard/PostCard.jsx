import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import style from "./postCard.module.css";
import {BsThreeDots} from "react-icons/bs";
import {IoChevronUpSharp} from "react-icons/io5";
import {IoChevronDownSharp} from "react-icons/io5";
import {useDispatch} from "react-redux";
import {deleteTodoFlash} from "../../reduxStore/FlashSlice";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import {increaseVal} from "../../reduxStore/changeCatogary";

const PostCard = ({collapse, catogary, post, changePostPlace, setChangePostPlace}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [threeDotOpen, setThreeDotOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
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
    dispatch(deleteTodoFlash(true));
  };

  const updatePostCatogaryHandler = async (postId, catogary) => {
    try {
      const res = await axios.put(`/api/updatePostCatogary/`, {postId, catogary});
      console.log(res);
    } catch (error) {
      console.error("Failed to update post category:", error);
    }
  };
  return (
    <div className={style.mainBox}>
      <div className={style.prioritySection}>
        <div className={style.priorityChild}>
          <div style={{background: post.priority === "HIGH PRIORITY" ? "#FF2473" : post.priority == "MODERATE PRIORITY" ? "#18B0FF" : "#63C05B"}} className={style.Circle}></div>
          <div>{post.priority}</div>
          <div style={{visibility: !post.assignTo ? "hidden" : "visible"}} className={style.nameCircle}>
            {post.assignTo?.email[1] === "@" || post.assignTo?.email[1] === "." ? post.assignTo?.email[0].toUpperCase() : post.assignTo?.email.slice(0, 2).toUpperCase()}
          </div>
          <div className={style.assignEmail}>
            <div>{post.assignTo?.email}</div>
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
      <div className={style.hero}>{post.title}</div>
      <div className={style.checklist}>
        <div>
          Checklist ({post?.todosList.filter((todo) => todo.isCompleted).length}/{post?.todosList?.length})
        </div>
        <div onClick={() => setOpen(!open)} className={style.arrow}>
          {open ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
        </div>
      </div>
      <div style={{display: open ? "block" : "none"}} className={style.todoBoxContainer}>
        {post.todosList.map((list, i) => {
          return (
            <div key={i} className={style.todoBox}>
              <input className={style.checkBox} checked={list.isCompleted} type="checkbox" name="" id="" />
              <div className={style.todoContent}>{list.todoContent}</div>
            </div>
          );
        })}
      </div>
      <div className={style.footer}>
        <div style={{color: "white", background: catogary === "Done" ? "#63C05B" : "#CF3636"}} className={style.footerbox}>
          Feb 10th
        </div>
        <div className={style.catogaryList}>
          {post?.catogary !== "BACKLOG" && (
            <div
              onClick={() => {
                updatePostCatogaryHandler(post?._id, "BACKLOG");
                setChangePostPlace(!changePostPlace);
                dispatch(increaseVal());
              }}
              className={style.footerbox}
            >
              BACKLOG
            </div>
          )}
          {post?.catogary !== "TODO" && (
            <div
              onClick={() => {
                updatePostCatogaryHandler(post?._id, "TODO");
                setChangePostPlace(!changePostPlace);
                dispatch(increaseVal());
              }}
              className={style.footerbox}
            >
              TO-DO
            </div>
          )}
          {post?.catogary !== "PROGRESS" && (
            <div
              onClick={() => {
                updatePostCatogaryHandler(post?._id, "PROGRESS");
                setChangePostPlace(!changePostPlace);
                dispatch(increaseVal());
              }}
              className={style.footerbox}
            >
              PROGRESS
            </div>
          )}
          {post?.catogary !== "DONE" && (
            <div
              onClick={() => {
                updatePostCatogaryHandler(post?._id, "DONE");
                setChangePostPlace(!changePostPlace);
                dispatch(increaseVal());
              }}
              className={style.footerbox}
            >
              DONE
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  collapse: PropTypes.bool,
  catogary: PropTypes.string,
  post: PropTypes.object,
};
export default PostCard;
