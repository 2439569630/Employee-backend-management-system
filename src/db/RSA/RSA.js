import axios from "axios";
import db from "../db";

const getKey = async () => {
    try {
        const req = await axios.post(db.url + '/secretkey');
        localStorage.setItem('publicKey', req.data);
    } catch (error) {
        // 处理错误
    }
};

export default getKey