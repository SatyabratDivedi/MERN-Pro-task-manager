import {useDispatch} from "react-redux";
import style from "./peoplePage.module.css";
import {peopleAddFlash, successFlash} from "../../reduxStore/FlashSlice";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddPeoplePage = () => {
  const [emailEdit, setEmailEdit] = useState();
  const dispatch = useDispatch();
  const addEmailHandler = async (e) => {
    e.preventDefault();
    if (emailEdit) {
      try {
        await axios.post("https://pro-task-manager-3frj.vercel.app/api/addAssignUser", {email: emailEdit});
        dispatch(peopleAddFlash(false));
        setEmailEdit("");
        dispatch(successFlash(true));
        dispatch(successFlash({display: "true", addedEmail: emailEdit}));
      } catch (error) {
        dispatch(peopleAddFlash(false));
        setEmailEdit("");
        if (error.response.status == "409") {
          toast.error(error.response.data.msg);
          return;
        }
        toast.error(error.code);
      }
    }
  };
  return (
    <>
      <div className={style.mainContainer}>
        <form className={style.container} onSubmit={addEmailHandler}>
          <div className={style.headerTxt}>Add People To Board</div>
          <div className={style.emailInput}>
            <input className={style.input} type="email" required onChange={(e) => setEmailEdit(e.target.value)} value={emailEdit} autoFocus placeholder="Enter the email" name="" id="" />
          </div>
            {/* Button Section */}
          <div className={style.bothButton}>
            <button type="button" onClick={() => dispatch(peopleAddFlash(false))} className={style.cancleBtn}>
              Cancle
            </button>
            <button type="submit" className={style.addEmailBtn}>
              Add Email
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddPeoplePage;
