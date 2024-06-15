import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";
import { fetchAllNhanVien } from "../redux/slices/nhanvienSlice";
import Popup from "reactjs-popup";
import NhanVienService from "../services/NhanVienService.js";
import ReactPaginate from "react-paginate";
import FormNhanVien from "./FormNhanVien.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/listNhanVien.scss";

const ListNhanVien = () => {
  const dispatch = useDispatch();
  const listNhanVien = useSelector((state) => state.nhanvien.listNhanVien);
  const [listNhanVienPage, setListNhanVienPage] = useState([]);

  useEffect(() => {
    dispatch(fetchAllNhanVien());
  }, []);

  const getListNhanVienPage = async (page) => {
    console.log("list" + listNhanVien);
    setListNhanVienPage = listNhanVien;
    console.log("Page test");
    console.log("Page test");
    //setListNhanVienPage = listNhanVien.slice((page - 1) * 10, page * 10 - 1)
  };

  async function handleClickXoa(event) {
    event.preventDefault();
    let nhanvien = {
      manv: event.target.value,
    };
    const response = await NhanVienService.deleteNhanVien(nhanvien);
    dispatch(fetchAllNhanVien());
    toast.success("Xóa Nhân Viên Thành Công");
  }

  const handlePageClick = (event) => {};

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
              <FormNhanVien close={close} />
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
              <th>Mã NV</th>
              <th>Họ Tên</th>
              <th>Ngày Sinh</th>
              <th>Số CMND</th>
              <th>Địa Chỉ</th>
              <th>Lương</th>
              <th>Mã Quyền</th>
              <th>Chi Nhánh</th>
              <th>Trạng Thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listNhanVien.map((nv) => (
              <Popup
                trigger={
                  <tr key={nv.manv}>
                    <td>{nv.manv}</td>
                    <td>{nv.hoten}</td>
                    <td>{nv.ngaysinh}</td>
                    <td>{nv.socmnd}</td>
                    <td>{nv.diachi}</td>
                    <td>{nv.luong}</td>
                    <td>{nv.maquyen}</td>
                    <td>{nv.macn}</td>
                    <td>{nv.trangthai == true ? "Đã Nghỉ" : "Chưa Nghỉ"}</td>
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
                              value={nv.manv}
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
                    <FormNhanVien nv={nv} close={close} />
                  </div>
                )}
              </Popup>
            ))}
          </tbody>
        </table>
        <div className="page">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={listNhanVien.length / 5}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </body>
      <ToastContainer />
    </>
  );
};
export default ListNhanVien;
