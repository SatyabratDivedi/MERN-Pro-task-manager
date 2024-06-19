import {Outlet} from "react-router-dom";
import Slider from "./components/left-slider/Slider";

const App = () => {
  return (
    <>
      <div style={{display: "flex", height: "100vh",   fontFamily: "Poppins"}}>
        <div style={{width: "17%"}}>
          <Slider />
        </div>
        <div style={{width: "83%"}}>
          <Outlet/>
        </div>
      </div>
    </>
  );
};
export default App;
