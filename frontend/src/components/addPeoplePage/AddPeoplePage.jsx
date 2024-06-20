import style from "./peoplePage.module.css";

const AddPeoplePage = () => {
  return (
    <>
      <div className={style.mainContainer}>
        <form className={style.container}>
          <div className={style.headerTxt}>Add People To Board</div>
          <div className={style.emailInput}>
            <input required placeholder="Enter the email" type="email" name="" id="" />
          </div>
          <div className={style.bothButton}>
            <button className={style.cancleBtn}>Cancle</button>
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
