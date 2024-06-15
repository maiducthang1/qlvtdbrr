import React, { useState, useEffect } from "react";
import PhieuNhapService from "../services/PhieuNhapService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllPhieuNhap } from "../redux/slices/phieunhapSlice";
import { useDispatch, useSelector } from "react-redux";

const FormPhieuNhap = ({ close, pn }) => {
  const dispatch = useDispatch();
  const [mapn, setMaPN] = useState("");

  const handleChangeMaPN = (event) => {
    setMaPN(event.target.value);
  };

  function verify() {
    if (mapn.trim().length != 4) {
      toast.error("Mã Phiếu Nhập Phải 4 Kí Tự!");
      return false;
    }
    return true;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (verify() == true) {
      var today = new Date();
      let year = today.getDay.toString;
      let phieunhap = {
        mapn: mapn,
        ngay: year,
      };
      console.log(phieunhap);
      const response = await PhieuNhapService.savePhieuNhap(phieunhap);
      if (response == 0) {
        toast.error("Cập Nhật Thất Bại!");
      } else {
        dispatch(fetchAllPhieuNhap());
        toast.success("Cập Nhật Thành Công!");
      }
    }
  }
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm">
        <div className="formbold-form-wrapper">
          <form action="https://formbold.com/s/FORM_ID" method="POST">
            <div className="formbold-input-flex">
              <div>
                <label className="formbold-form-label">Mã Phiếu Nhập</label>
                <input
                  type="text"
                  name="inputMaPN"
                  className="formbold-form-input"
                  onChange={handleChangeMaPN}
                />
              </div>
              <div>
                <label className="formbold-form-label"> Ngày Lập Phiếu </label>
                <input
                  type="text"
                  name="inputNgay"
                  className="formbold-form-input"
                />
              </div>
            </div>
            <button className="formbold-btn" onClick={handleSubmit}>
              Xác Nhận
            </button>
            <button className="formbold-btn" id="btnClose" onClick={close}>
              Đóng
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default FormPhieuNhap;
