import React, { useState, useEffect } from "react";
import formNhanVien from "../styles/formNhanVien.scss"
import NhanVienService from "../services/NhanVienService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllNhanVien, insertNhanVien } from "../redux/slices/nhanvienSlice";
import { useDispatch, useSelector } from "react-redux";

const FormNhanVien = ({ close, nv }) => {
    const dispatch = useDispatch();
    const [manv, setMaNV] = useState("");
    const [hoten, setHoTen] = useState("");
    const [socmnd, setSoCMND] = useState("");
    const [diachi, setDiaChi] = useState("");
    const [luong, setLuong] = useState();
    const [ngaysinh, setNgaySinh] = useState("");
    const [maquyen, setMaQuyen] = useState("Q01");
    const [cn, setCN] = useState("CN01");
    const [trangthai, setTrangThai] = useState(false);
    const handleChangeMaNV = (event) => {
        setMaNV(event.target.value)
    }
    const handleChangeHoTen = (event) => {
        setHoTen(event.target.value)
    }
    const handleChangeSoCMND = (event) => {
        setSoCMND(event.target.value)
    }
    const handleChangeDiaChi = (event) => {
        setDiaChi(event.target.value)
    }
    const handleChangeLuong = (event) => {
        setLuong(event.target.value)
    }
    const handleChangeNgaySinh = (event) => {
        setNgaySinh(event.target.value)
    }
    const handleChangeMaQuyen = (event) => {
        setMaQuyen(event.target.value)
    }
    const handleChangeCN = (event) => {
        setCN(event.target.value)
    }
    const handleChangeTrangThai = (event) => {
        setTrangThai(event.target.value)
    }
    function verify() {
        if (hoten.trim().length < 3) {
            toast.error("Lỗi Nhập Họ Tên!")
            return false
        } else if (luong <= 0 || luong.length == "") {
            toast.error("Lương Phải Lơn Hơn 0!")
            return false
        } else if (ngaysinh == "" || ngaysinh.substring(0, 4) > 2010) {
            toast.error("Năm Phải Lơn Hơn 2010 !")
            return false
        } else if (diachi.trim().length <= 10) {
            toast.error("Lỗi Nhập Địa Chỉ!")
            return false
        } else if (socmnd.length < 12) {
            toast.error("Lỗi Nhập Số CMND!")
            return false
        }

        return true
    }
    useEffect(() => {
        if (typeof nv === "undefined") {
            console.log('undefined')
            return
        } else {
            document.querySelector('input[name="inputMaNV"]').value = nv.manv;
            setMaNV(nv.manv)
            document.querySelector('input[name="inputHoTen"]').value = nv.hoten;
            setHoTen(nv.hoten)
            document.querySelector('input[name="inputDiaChi"]').value = nv.diachi;
            setDiaChi(nv.diachi)
            document.querySelector('input[name="inputSoCMND"]').value = nv.socmnd;
            setSoCMND(nv.socmnd)
            document.querySelector('input[name="inputLuong"]').value = nv.luong;
            setLuong(nv.luong)
            document.querySelector('select[name="inputCN"]').value = nv.macn;
            setCN(nv.macn)
            document.querySelector('input[name="inputNgaySinh"]').value = nv.ngaysinh;
            setNgaySinh(nv.ngaysinh)
            document.querySelector('select[name="inputMaQuyen"]').value = nv.maquyen;
            setMaQuyen(nv.maquyen)
            document.querySelector('select[name="inputTrangThai"]').value = nv.trangthai;
            setTrangThai(nv.trangthai)
        }
    }, [])
    async function handleSubmit(event) {
        event.preventDefault();
        if (verify() == true) {
            let a = String(trangthai)
            let nhanvien = {
                manv: manv,
                hoten: hoten,
                socmnd: socmnd,
                luong: luong,
                diachi: diachi,
                ngaysinh: ngaysinh,
                trangthai: a,
                macn: cn,
                maquyen: maquyen,
                matkhau: '123'
            }
            if (manv == "") {
                const response = await NhanVienService.insertNhanVien(nhanvien);
                if (response == 0) {
                    toast.error("Thêm Thất Bại!")
                } else {
                    dispatch(fetchAllNhanVien())
                    toast.success("Thêm Thành Công!")
                }

            } else {
                const response = await NhanVienService.updateNhanVien(nhanvien);
                if (response == 0) {
                    toast.error("Thêm Thất Bại!")
                } else {
                    dispatch(fetchAllNhanVien())
                    toast.success("Sửa Thành Công!")
                }
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
                                <label className="formbold-form-label">Mã NV</label>
                                <input type="number" name="inputMaNV" className="formbold-form-input" onChange={handleChangeMaNV} readonly="readonly" />
                            </div>
                            <div>
                                <label className="formbold-form-label"> Họ Tên </label>
                                <input type="text" name="inputHoTen" className="formbold-form-input" onChange={handleChangeHoTen} />
                            </div>
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <label className="formbold-form-label"> Số CMND </label>
                                <input type="number" name="inputSoCMND" className="formbold-form-input" onChange={handleChangeSoCMND} />
                            </div>
                            <div>
                                <label className="formbold-form-label"> Ngày Sinh </label>
                                <input type="date" name="inputNgaySinh" className="formbold-form-input" onChange={handleChangeNgaySinh} />
                            </div>
                        </div>

                        <div className="formbold-mb-3">
                            <label className="formbold-form-label">Địa Chỉ</label>
                            <input type="text" name="inputDiaChi" className="formbold-form-input" onChange={handleChangeDiaChi} />
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <label className="formbold-form-label"> Lương </label>
                                <input type="number" name="inputLuong" className="formbold-form-input" onChange={handleChangeLuong} />
                            </div>
                            <div>
                                <label className="formbold-form-label"> Mã CN </label>
                                <select type="text" name="inputCN" className="formbold-form-input" onChange={handleChangeCN} >
                                    <option value="CN01">Hà Nội</option>
                                    <option value="CN02">Hồ Chí Minh</option>
                                </select>
                            </div>
                        </div>

                        <div className="formbold-input-flex">
                            <div>
                                <label className="formbold-form-label"> Mã Quyền</label>
                                <select type="text" name="inputMaQuyen" className="formbold-form-input" onChange={handleChangeMaQuyen} >
                                    <option value="Q01">Công Ty</option>
                                    <option value="Q02">Chi Nhánh</option>
                                    <option value="Q03">Nhân Viên</option>
                                </select>
                            </div>
                            <div>
                                <label className="formbold-form-label">Trạng Thái</label>
                                <select name="inputTrangThai" classNameName="box" type="checkbox" defaultChecked={false} className="formbold-form-input" onChange={handleChangeTrangThai} >
                                    <option value="false">Chưa Nghỉ</option>
                                    <option value="true">Đã Nghỉ</option>
                                </select>
                            </div>
                        </div>

                        <button className="formbold-btn" onClick={handleSubmit}>Xác Nhận</button>
                        <button className="formbold-btn" id="btnClose" onClick={close} >Đóng</button>
                    </form>
                </div>
            </div >
            <ToastContainer />
        </>
    )
}
export default FormNhanVien;