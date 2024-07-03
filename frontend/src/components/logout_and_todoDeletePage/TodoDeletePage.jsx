import {useDispatch} from "react-redux";
import {deleteTodoFlash} from "../../reduxStore/FlashSlice";
import style from "./../addPeoplePage/peoplePage.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import {increaseVal} from "../../reduxStore/changeCatogary";
const btnStyle = {
  width: "100%",
  padding: "12px",
};

const TodoDeletePage = ({postId}) => {
  const dispatch = useDispatch();


  const deletePostHandler = async (postId) => {
    dispatch(deleteTodoFlash(false))
    const toastId = toast.loading("Please wait...");
    try {
      const res = await axios.delete(`http://localhost:3000/deletePost/${postId}`,  {withCredentials: true});
      console.log(ResizeObserver)
      toast.success(res.data.msg, {
        id: toastId,
      });
      dispatch(increaseVal());
      setTimeout(() => {
        dispatch(increaseVal());
      }, 10);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg, {
        id: toastId,
      });
    }
  };
  return (
    <>
      <div className={style.mainContainer}>
        <div style={{alignItems: "center", width: "340px"}} className={style.container}>
          <div style={{fontSize: "14px", marginBottom: "9px"}} className={style.headerTxt}>
            Are you sure you want to Delete?
          </div>
          <button onClick={() => deletePostHandler(postId)} style={btnStyle} type="submit" className={style.addEmailBtn}>
            Yes, Delete
          </button>
          <button style={btnStyle} type="button" onClick={() => dispatch(deleteTodoFlash(false))} className={style.cancleBtn}>
            Cancle
          </button>
        </div>
      </div>
    </>
  );
};
export default TodoDeletePage;
