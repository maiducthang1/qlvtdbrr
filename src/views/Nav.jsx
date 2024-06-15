import React from "react";
import "../styles/nav.scss";
import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <>
      <body className="navItem">
        <ul>
          <li>
            <NavLink to="/trangchu">Nhân Viên</NavLink>
          </li>
          <li>
            <NavLink to="/vattu">Vật Tư</NavLink>
          </li>
          <li>
            <NavLink to="/kho">Kho</NavLink>
          </li>
          <li>
            <NavLink to="/phieunhap">Phiếu Nhập</NavLink>
          </li>
          <li>
            <NavLink to="/chitietphieunhap">Chi Tiết PN</NavLink>
          </li>
          <li>
            <NavLink to="/phieuxuat">Phiếu Xuất</NavLink>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li className="btnOut">
            <NavLink to="/">Đăng Xuất</NavLink>
          </li>
        </ul>
      </body>
    </>
  );
};
export default Nav;
