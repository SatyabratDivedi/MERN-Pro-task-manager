import {useDispatch} from "react-redux";
import style from "./peoplePage.module.css";
import {peopleAddFlash, successFlash} from "../../reduxStore/FlashSlice";
import {useState} from "react";

const AddPeoplePage = () => {
  const [emailEdit, setEmailEdit] = useState();
  const dispatch = useDispatch();
  const addEmailHandler = (e) => {
    e.preventDefault;
    if (emailEdit) {
      console.log(emailEdit);
      dispatch(peopleAddFlash(false));
      setEmailEdit("");
      dispatch(successFlash(true));
      dispatch(successFlash({display: "true", addedEmail: emailEdit}));
    }
  };
  return (
    <>
      <div className={style.mainContainer}>
        <form className={style.container}>
          <div className={style.headerTxt}>Add People To Board</div>
          <div className={style.emailInput}>
            <input className={style.input} type="email" required onChange={(e) => setEmailEdit(e.target.value)} value={emailEdit} autoFocus placeholder="Enter the email" name="" id="" />
          </div>
          <div className={style.bothButton}>
            <button type="button" onClick={() => dispatch(peopleAddFlash(false))} className={style.cancleBtn}>
              Cancle
            </button>
            <button onClick={addEmailHandler} type="submit" className={style.addEmailBtn}>
              Add Email
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddPeoplePage;
