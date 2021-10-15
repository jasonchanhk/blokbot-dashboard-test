import http from "../http-common"

class DashboardDataService {
    getAll(){
        return http.get();
    }
}

export default new DashboardDataService;