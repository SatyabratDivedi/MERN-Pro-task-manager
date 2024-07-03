import {useDispatch} from "react-redux";
import style from "./todos.module.css";
import {addTodoFlash} from "../../reduxStore/FlashSlice";
import {FaStarOfLife} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {FaAngleDown} from "react-icons/fa6";
import {MdDelete} from "react-icons/md";
import {IoAddOutline} from "react-icons/io5";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import {increaseVal} from "../../reduxStore/changeCatogary";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAssignContainer, setShowAssignContainer] = useState(false);
  const [loginUserData, setLoginUserData] = useState({});
  const token = localStorage.getItem("token");

  const todoArr = {
    title: "",
    catogary: "TODO",
    priority: "",
    assignTo: "",
    Checklist: [],
    date: "",
  };
  const [todoData, setTodoData] = useState(todoArr);
  const {title, priority, assignTo, Checklist, date} = todoData;

  const fetchLoginUser = async () => {
    try {
      const res = await axios.post("https://pro-task-manager-3frj.vercel.app/api/getLoginUserDetails",{token:token});
      setLoginUserData(res.data.user);
    } catch (error) {
      toast.error(error.code);
    }
  };

  useEffect(() => {
    fetchLoginUser();
  }, []);

  const assignClkHandler = (email) => {
    setTodoData({...todoData, assignTo: email});
    setShowAssignContainer(!showAssignContainer);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTodoData({...todoData, date: date.toLocaleDateString("en-IN")});
  };
  const todoDataSaveHandler = async () => {
    dispatch(addTodoFlash(false));
    const toastId = toast.loading("Creating...");
    try {
      const res = await axios.post("https://pro-task-manager-3frj.vercel.app/api/createPost", {todoData, token:token});
      toast.success(res.data.msg, {
        id: toastId,
      });
      dispatch(increaseVal());
      setTimeout(() => {
        dispatch(increaseVal());
      }, 10);
    } catch (error) {
      toast.error(error.response.data.msg, {
        id: toastId,
      });
    }
  };
  const addNewCheckList = () => {
    setTodoData({...todoData, Checklist: [...Checklist, {todoContent: "", isCompleted: false}]});
  };
  const deleteCheckList = (index) => {
    const newChecklist = Checklist.filter((item, i) => i !== index);
    setTodoData({...todoData, Checklist: newChecklist});
  };
  return (
    <>
      <div className={style.mainContainer}>
        <div>
          <div className={style.container}>
            {/* Title Section */}
            <div style={{display: "flex", flexDirection: "column"}}>
              <div className={style.titleSection}>
                <div>Title</div> <FaStarOfLife className={style.starIcon} />
              </div>
              <input className={style.input} type="text" required onChange={(e) => setTodoData({...todoData, title: e.target.value})} value={title} autoFocus placeholder="Enter Task Title" name="" />
            </div>
            {/* Priority Section */}
            <div className={style.priorityContainer}>
              <div className={style.titleSection}>
                <div>Select Priority</div>
                <FaStarOfLife className={style.starIcon} />
              </div>
              <div style={{background: priority == "HIGH PRIORITY" ? "#EEECEC" : ""}} className={style.priorityBox}>
                <div style={{background: "#FF2473"}} className={style.priorityCircle}></div>
                <div onClick={() => setTodoData({...todoData, priority: "HIGH PRIORITY"})}>HIGH PRIORITY</div>
              </div>
              <div style={{background: priority == "MODERATE PRIORITY" ? "#EEECEC" : ""}} className={style.priorityBox}>
                <div style={{background: "#18B0FF"}} className={style.priorityCircle}></div>
                <div onClick={() => setTodoData({...todoData, priority: "MODERATE PRIORITY"})}>MODERATE PRIORITY</div>
              </div>
              <div style={{background: priority == "LOW PRIORITY" ? "#EEECEC" : ""}} className={style.priorityBox}>
                <div style={{background: "#63C05B"}} className={style.priorityCircle}></div>
                <div onClick={() => setTodoData({...todoData, priority: "LOW PRIORITY"})}>LOW PRIORITY</div>
              </div>
            </div>
            {/* Assign Section */}
            <div className={style.assignContainer}>
              <div className={style.titleSection}>Assign to</div>
              <input onClick={() => setShowAssignContainer(!showAssignContainer)} className={style.input} value={assignTo} placeholder="Add a assignee" name="" id="" />
              <FaAngleDown className={style.downIcon} />
              <div style={{display: showAssignContainer ? "" : "none"}} className={style.hiddenAssignEmail}>
                {!loginUserData?.assignedUsers || loginUserData?.assignedUsers.length === 0 ? (
                  <div className={style.assignEmailContainer}>
                    <div> ❌ There is no any assign user ! Please assign.</div>
                  </div>
                ) : (
                  loginUserData?.assignedUsers?.map((user) => (
                    <div key={typeof email} className={style.assignEmailContainer}>
                      <div className={style.emailAndLetters}>
                        <div className={style.emailTwoLetter}>{user.email[1] === "@" || user.email[1] === "." ? user.email[0].toUpperCase() : user.email.slice(0, 2).toUpperCase() || <Skeleton />}</div>
                        <div>{user.email || <Skeleton />}</div>
                      </div>
                      <div onClick={() => assignClkHandler(user.email)} className={style.assignBtn}>
                        Assign
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* CheckList Section */}
            <div className={style.checklistMainContainer}>
              <div className={style.titleSection}>
                <div>
                  Checklist ({Checklist.filter((item) => item.isCompleted).length}/{Checklist.length})
                </div>
                <FaStarOfLife className={style.starIcon} />
              </div>
              <div className={style.checklistBoxContainer}>
                {Checklist.map((item, i) => {
                  return (
                    <div key={i} style={{display: "flex"}} className={style.checklistContainer}>
                      <input
                        className={style.todoCheckBox}
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => {
                          const newChecklist = [...Checklist];
                          newChecklist[i].isCompleted = !newChecklist[i].isCompleted;
                          setTodoData({...todoData, Checklist: newChecklist});
                        }}
                      />
                      <input
                        className={style.todoInput}
                        type="text"
                        autoFocus
                        value={item.todoContent}
                        onChange={(e) => {
                          const newChecklist = [...Checklist];
                          newChecklist[i].todoContent = e.target.value;
                          setTodoData({...todoData, Checklist: newChecklist});
                        }}
                        placeholder="Type..."
                        name=""
                        id=""
                      />
                      <MdDelete onClick={() => deleteCheckList(i)} className={style.todoDeleteIcon} />
                    </div>
                  );
                })}
                <div onClick={addNewCheckList} className={style.addNewSection}>
                  <IoAddOutline />
                  Add New
                </div>
              </div>
            </div>
            {/* Button Section */}
            <div className={style.bothButton}>
              <DatePickerComponent selectedDate={selectedDate} onDateChange={handleDateChange} />
              <button type="button" onClick={() => dispatch(addTodoFlash(false))} className={style.cancleBtn}>
                Cancle
              </button>
              <button onClick={todoDataSaveHandler} type="button" className={style.addEmailBtn}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTodo;
