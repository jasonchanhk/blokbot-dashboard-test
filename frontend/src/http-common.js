import axios from "axios";

export default axios.create({
    baseURL: "https://blokbot-dashboard-test.herokuapp.com/",
    headers: {
        "Content-type": "application/json"
    }
})