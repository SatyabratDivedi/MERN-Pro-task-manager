import {Outlet} from "react-router-dom";
import Slider from "./components/left-slider/Slider";
import AddPeoplePage from "./components/addPeoplePage/AddPeoplePage.jsx";

const App = () => {
  return (
    <>
      <div style={{display: "flex", height: "100vh", fontFamily: "Poppins"}}>
      <AddPeoplePage />
        <div style={{width: "17%"}}>
          <Slider />
        </div>
        <div style={{width: "83%"}}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default App;
