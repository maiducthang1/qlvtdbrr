import React, { useState, useEffect } from "react";
import { fetchAllVatTu } from "../redux/slices/vattuSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Popup from "reactjs-popup";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/listNhanVien.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import FormVatTu from "./FormVatTu.jsx";
import VatTuService from "../services/VatTuService.js";

const ListVatTu = () => {
  const dispatch = useDispatch();
  const listVatTu = useSelector((state) => state.vattu.listVatTu);

  useEffect(() => {
    dispatch(fetchAllVatTu());
  }, []);

  async function handleClickXoa(event) {
    event.preventDefault();
    let vt = {
      mavt: event.target.value,
    };
    const response = await VatTuService.deleteVatTu(vt);
    console.log(response);
    if (response.data == 0) {
      toast.error("Xóa Vật Tư Thất Bại!");
    } else if (response.data == 1) {
      dispatch(fetchAllVatTu());
      toast.success("Xóa Vật Tư Thành Công");
    }
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
              <FormVatTu close={close} />
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
              <th>Mã VT</th>
              <th>Tên VT</th>
              <th>Đơn Vị Tính</th>
              <th>Số Lượng Tồn</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listVatTu.map((vt) => (
              <Popup
                trigger={
                  <tr key={vt.mavt}>
                    <td>{vt.mavt}</td>
                    <td>{vt.tenvt}</td>
                    <td>{vt.donvitinh}</td>
                    <td>{vt.soluongton}</td>
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
                              value={vt.mavt}
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
                    <FormVatTu vt={vt} close={close} />
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
export default ListVatTu;
