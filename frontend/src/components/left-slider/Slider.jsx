import {Link, NavLink} from "react-router-dom";
import style from "./slider.module.css";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {CiSettings} from "react-icons/ci";
import {GoDatabase} from "react-icons/go";
import {PiCodesandboxLogoLight} from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";


console.log('the first data is fatchted and the second data is to be updated')

const Slider = () => {
  return (
    <>
      <div className={style.sliderContainer}>
        <div className={style.linkStyle}>
          <Link to={'/'} className={style.navIcon} style={{fontWeight: "600", color: "black", marginBottom:'25px'}}>
            <PiCodesandboxLogoLight />
            <span style={{fontSize:'large'}}>Pro Manage</span>
          </Link>
          <NavLink to={"/"} className={({isActive}) => `${isActive && style.activeBackground} ${style.navIcon}`}>
            <MdOutlineSpaceDashboard />
            <span style={{fontSize:'16px'}}>Board</span>
          </NavLink>
          <NavLink to={"/analytics"} className={({isActive}) => `${isActive && style.activeBackground} ${style.navIcon}`}>
            <GoDatabase />
            <span style={{fontSize:'16px'}}>Analytics</span>
          </NavLink>
          <NavLink to={"/setting"} className={({isActive}) => `${isActive && style.activeBackground} ${style.navIcon}`}>
            <CiSettings />
            <span style={{fontSize:'16px'}}>Setting</span>
          </NavLink>
        </div>
        <div>
          <div className={style.logout} > <IoLogOutOutline style={{fontSize:'24px'}}/> Log out</div>
        </div>
      </div>
    </>
  );
};
export default Slider;
