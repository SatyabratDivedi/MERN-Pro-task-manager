import {Outlet, useMatch} from "react-router-dom";
import Slider from "./components/left-slider/Slider";
import AddPeoplePage from "./components/addPeoplePage/AddPeoplePage.jsx";
import AddSuccessPage from "./components/addPeoplePage/AddSuccessPage.jsx";
import {useSelector} from "react-redux";
import AddTodo from "./components/addUpdateTodos/AddTodo.jsx";
import Logout from "./components/logout_and_todoDeletePage/LogoutPage.jsx";
import TodoDeletePage from "./components/logout_and_todoDeletePage/TodoDeletePage.jsx";
import UpdateTodo from './components/addUpdateTodos/UpdateTodo.jsx';


const App = () => {
  const {
    peopleAddFlashPage: showAddPeoplePage, 
    successFlashPage: showSuccessPage,
    addTodoFlashPage: showAddTodoPage, 
    deleteTodoFlashPage: showDeleteTodoPage, 
    logoutFlashPage: showLogoutPage,
    updateTodoFlashPage: showUpdateTodoPage
    } = useSelector((state) => state.flashReducer);
console.log(showUpdateTodoPage)
console.log(showDeleteTodoPage)
  const loginRoute = useMatch("/login");
  const ragisterRoute = useMatch("/register");

  const ConditionalRender = ({show, children}) => (show ? <div>{children}</div> : null);

  return (
    <>
      <div style={{display: "flex", height: "100vh", fontFamily: "Poppins"}}>
        <ConditionalRender show={showUpdateTodoPage.display}>
          <UpdateTodo postId={showUpdateTodoPage.postId}/>
        </ConditionalRender>

        <ConditionalRender show={showAddPeoplePage}>
          <AddPeoplePage />
        </ConditionalRender>

        <ConditionalRender show={showSuccessPage.display}>
          <AddSuccessPage email={showSuccessPage.addedEmail} />
        </ConditionalRender>

        <ConditionalRender show={showAddTodoPage}>
          <AddTodo />
        </ConditionalRender>

        <ConditionalRender show={showLogoutPage}>
          <Logout />
        </ConditionalRender>

        <ConditionalRender show={showDeleteTodoPage.display}>
          <TodoDeletePage postId={showDeleteTodoPage.postId} />
        </ConditionalRender>

        {!(loginRoute || ragisterRoute) && (
          <div style={{width: "17%"}}>
            <Slider />
          </div>
        )}
        <div style={{width: "100%"}}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default App;
