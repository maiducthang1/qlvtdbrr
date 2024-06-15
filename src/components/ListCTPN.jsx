import React, { useState, useEffect } from "react";
import { fetchAllCTPN } from "../redux/slices/ctpnSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/listNhanVien.scss";
import FormCTPN from "./FormCTPN.jsx";
import { Player } from "@lottiefiles/react-lottie-player";

const ListCTPN = () => {
  const dispatch = useDispatch();
  const listCTPN = useSelector((state) => state.chitietphieunhap.listCTPN);

  useEffect(() => {
    dispatch(fetchAllCTPN());
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
              <FormCTPN close={close} />
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
              <th>Mã PN</th>
              <th>Mã VT</th>
              <th>Số Lượng</th>
              <th>Đơn Giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listCTPN.map((ctpn) => (
              <Popup
                trigger={
                  <tr key={(ctpn.mapn, ctpn.mavt)}>
                    <td>{ctpn.mapn}</td>
                    <td>{ctpn.ngay}</td>

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
                              value={ctpn.mapn}
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
                    <FormCTPN ctpn={ctpn} close={close} />
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
export default ListCTPN;
