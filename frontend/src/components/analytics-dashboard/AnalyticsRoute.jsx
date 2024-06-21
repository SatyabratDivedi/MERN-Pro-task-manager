import style from "./analytics.module.css";

const AnalyticsRoute = () => {
  return (
    <>
      <div className={style.mainContainer}>
        <h4 className={style.heading}>Analytics</h4>
        <div className={style.boxContainer}>
          <div className={style.box}>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Backlog Tasks
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                To-do Tasks
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                In-Progress Tasks
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Completed Tasks
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
          </div>
          <div className={style.box}>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Low Priority
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                Moderate Priority
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
                High Priority
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
            <div className={style.boxTxtHead}>
              <div className={style.boxTxt}>
                <div className={style.cercle}></div>
               Due Date Tasks
              </div>
              <span style={{fontWeight: "600"}}>16</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AnalyticsRoute;
