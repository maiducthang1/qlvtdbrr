import instance from './custom-axios';

const URL = "/chitietphieunhap/";

class CTPNService {
    getListCTPN() {
        return instance.get(URL + 'list')
    }
    
}
export default new CTPNService();