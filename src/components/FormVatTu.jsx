import React, { useState, useEffect } from "react";
import VatTuService from "../services/VatTuService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllVatTu } from "../redux/slices/vattuSlice";
import { useDispatch, useSelector } from "react-redux";

const FormVatTu = ({ close, vt }) => {
  const dispatch = useDispatch();
  const [mavt, setMaVT] = useState("");
  const [tenvt, setTenVT] = useState("");
  const [donvitinh, setDonViTinh] = useState("");
  const [soluongton, setSoLuongTon] = useState("");

  const handleChangeMaVT = (event) => {
    setMaVT(event.target.value);
  };
  const handleChangeTenVT = (event) => {
    setTenVT(event.target.value);
  };
  const handleChangeDonViTinh = (event) => {
    setDonViTinh(event.target.value);
  };
  const handleChangeSoLuongTon = (event) => {
    setSoLuongTon(event.target.value);
  };

  function verify() {
    if (mavt.trim().length != 4) {
      toast.error("Mã Vật Tư Phải 4 Kí Tự!");
      return false;
    } else if (donvitinh.trim().length < 0) {
      toast.error("");
      return false;
    } else if (tenvt.trim().length <= 5) {
      toast.error("Tên Vật Tư Phải Hơn 5 Kí Tự");
      return false;
    }
    return true;
  }
  useEffect(() => {
    if (typeof vt === "undefined") {
      console.log("undefined");
      return;
    } else {
      document.querySelector('input[name="inputMaVT"]').value = vt.mavt;
      setMaVT(vt.mavt);
      document.querySelector('input[name="inputTenVT"]').value = vt.tenvt;
      setTenVT(vt.tenvt);
      document.querySelector('input[name="inputDonViTinh"]').value =
        vt.donvitinh;
      setDonViTinh(vt.donvitinh);
      document.querySelector('input[name="inputSoLuongTon"]').value =
        vt.soluongton;
      setSoLuongTon(vt.soluongton);
    }
  }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    if (verify() == true) {
      console.log(mavt);
      let vattu = {
        mavt: mavt,
        tenvt: tenvt,
        soluongton: soluongton,
        donvitinh: donvitinh,
      };
      console.log(vattu);
      const response = await VatTuService.saveVatTu(vattu);
      if (response == 0) {
        toast.error("Cập Nhật Thất Bại!");
      } else {
        dispatch(fetchAllVatTu());
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
                <label className="formbold-form-label">Mã VT</label>
                <input
                  type="text"
                  name="inputMaVT"
                  className="formbold-form-input"
                  onChange={handleChangeMaVT}
                />
              </div>
              <div>
                <label className="formbold-form-label"> Tên VT </label>
                <input
                  type="text"
                  name="inputTenVT"
                  className="formbold-form-input"
                  onChange={handleChangeTenVT}
                />
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label className="formbold-form-label"> Số Lượng Tồn</label>
                <input
                  type="number"
                  name="inputSoLuongTon"
                  className="formbold-form-input"
                  onChange={handleChangeSoLuongTon}
                  eadonly="readonly"
                />
              </div>
              <div>
                <label className="formbold-form-label"> Đơn Vị Tính </label>
                <input
                  type="text"
                  name="inputDonViTinh"
                  className="formbold-form-input"
                  onChange={handleChangeDonViTinh}
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
export default FormVatTu;
