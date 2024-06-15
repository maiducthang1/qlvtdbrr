import axios from 'axios';
import instance from './custom-axios';

const URL = "/phieunhap/";

class PhieuNhapService {
    getListPhieuNhap() {
        return instance.get(URL + 'list');
    }
    
}
export default new PhieuNhapService();