import {useDispatch} from "react-redux";
import {deleteTodoFlash} from "../../reduxStore/FlashSlice";
import style from "./../addPeoplePage/peoplePage.module.css";
const btnStyle = {
  width: "100%",
  padding: "12px",
};

const TodoDeletePage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.mainContainer}>
        <div style={{alignItems: "center", width: "340px"}} className={style.container}>
          <div style={{fontSize: "14px", marginBottom: "9px"}} className={style.headerTxt}>
          Are you sure you want to Delete?
          </div>
          <button style={btnStyle} type="submit" className={style.addEmailBtn}>
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
