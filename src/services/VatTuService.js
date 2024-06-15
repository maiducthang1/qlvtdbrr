import instance from './custom-axios';

const URL = "/vattu/";

class VatTuService {
    getListVatTu() {
        return instance.get(URL + 'list')
    }
    saveVatTu(data){
        return instance.post(URL + 'save',data)
    }
    deleteVatTu(data){
        return instance.put(URL + 'delete',data)
    }
    
}
export default new VatTuService;