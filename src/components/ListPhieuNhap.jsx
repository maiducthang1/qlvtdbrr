import React, { useState, useEffect } from "react";
import { fetchAllPhieuNhap } from "../redux/slices/phieunhapSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/listNhanVien.scss";
import FormPhieuNhap from "./FormPhieuNhap.jsx";
import { Player } from "@lottiefiles/react-lottie-player";

const ListPhieuNhap = () => {
  const dispatch = useDispatch();
  const listPhieuNhap = useSelector((state) => state.phieunhap.listPhieuNhap);

  useEffect(() => {
    dispatch(fetchAllPhieuNhap());
  }, []);

  async function handleClickXoa(event) {
    event.preventDefault();
  }
  return (
    <>
      <div className="addAnimation">
        <Popup
          modal
          trigger={
            <div>
              <Player
                src="https://lottie.host/d9e3aee3-60f6-4156-8cfc-85ac413b500e/okqwVQmCwv.json"
                loop
                autoplay
                style={{ height: "70px", width: "70px" }}
              />
            </div>
          }
        >
          {(close) => (
            <div>
              <FormPhieuNhap close={close} />
            </div>
          )}
        </Popup>
      </div>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </head>
      <body>
        <table id="customers">
          <thead>
            <tr>
              <th>Mã Phiếu Nhập</th>
              <th>Ngày Lập Phiếu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listPhieuNhap.map((pn) => (
              <Popup
                trigger={
                  <tr key={pn.mapn}>
                    <td>{pn.mapn}</td>
                    <td>{pn.ngay}</td>

                    <td className="table-Icon">
                      <Popup
                        trigger={
                          <div>
                            <Player
                              src="https://lottie.host/be0667b2-da1b-42f0-a4e5-cfbae1112225/ZIARx3NoBt.json"
                              className="player"
                              loop
                              autoplay
                              style={{ height: "35px", width: "35px" }}
                            />
                          </div>
                        }
                        position="right"
                      >
                        {(close) => (
                          <div className="popupDelete">
                            <button
                              className="btnXacNhanXoa"
                              value={pn.mapn}
                              onClick={handleClickXoa.bind()}
                            >
                              Xác Nhận
                            </button>
                          </div>
                        )}
                      </Popup>
                    </td>
                  </tr>
                }
              >
                {(close) => (
                  <div>
                    <FormPhieuNhap pn={pn} close={close} />
                  </div>
                )}
              </Popup>
            ))}
          </tbody>
        </table>
      </body>
      <ToastContainer />
    </>
  );
};
export default ListPhieuNhap;
