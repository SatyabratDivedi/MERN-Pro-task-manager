import {useDispatch} from "react-redux";
import style from "./peoplePage.module.css";
import {successFlash} from "../../reduxStore/FlashSlice";
import PropTypes from "prop-types";

const AddSuccessPage = ({email}) => {
  AddSuccessPage.propTypes = {
    email: PropTypes.string.isRequired,
  };
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.container}>
          <div style={{textAlign: "center", marginTop:'35px'}} className={style.headerTxt}>
            {email} added to board
          </div>
          <button onClick={() => dispatch(successFlash(false))} style={{ margin: 'auto'}} className={style.addEmailBtn}>
            Okay, got it!
          </button>
        </div>
      </div>
    </>
  );
};
export default AddSuccessPage;
