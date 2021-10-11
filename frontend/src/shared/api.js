import axios from "axios";

const ApiScaffold = async ({ method, url, data, token }, callback) => {
    return await axios({
        method: method,
        url: url,
        data: data ? data : null
    })
    .then(data => {
        console.debug(data.data);
        console.debug(data.data);
        console.debug(data.data);
        if(data.data.error){
            console.debug("에러존재!!!");
            console.debug("에러존재!!!");
            console.debug("에러존재!!!");
        }
        return data.data;
    })
    .catch(err => {
        if(callback){
            callback(err.response.data.message);
        }
        throw new Error(err.response.data.message);
    });
}
export default ApiScaffold;