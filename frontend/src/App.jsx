import {Outlet} from "react-router-dom";
import Slider from "./components/left-slider/Slider";
import AddPeoplePage from "./components/addPeoplePage/AddPeoplePage.jsx";
import AddSuccessPage from "./components/addPeoplePage/AddSuccessPage.jsx";
import { useSelector } from "react-redux";
import AddTodo from "./components/addUpdateTodos/AddTodo.jsx";

const App = () => {
  const showAddPeoplePage = useSelector((state)=> state.flashReducer.peopleAddFlashPage)
  const showSuccessPage = useSelector((state)=> state.flashReducer.successFlashPage)
  const showAddTodoPage = useSelector((state)=> state.flashReducer.addTodoFlashPage)
  return (
    <>
      <div style={{display: "flex", height: "100vh", fontFamily: "Poppins"}}>
        <div style={{display: showAddPeoplePage?"": "none"}}>
         <AddPeoplePage />
        </div>
        <div style={{display: showSuccessPage.display ?"": "none"}}>
         <AddSuccessPage  email={showSuccessPage.addedEmail} />
        </div>
        <div style={{display: showAddTodoPage ?"": "none"}}>
         <AddTodo/>
        </div>
        <div style={{width: "17%"}}>
          <Slider />
        </div>
        <div style={{width: "83%"}}>
          <Outlet con={'tata'} />
        </div>
      </div>
    </>
  );
};
export default App;
