import axios from "axios";

const ApiScaffold = async ({ method, url, data, token }, callback) => {
    return await axios({
        method: method,
        url: url,
        data: data ? data : null
    })
    .then(data => {
        return data.data;
    })
    .catch(err => {
        if(callback){
            callback(err.response);
        }
        throw new Error(err.response.data.message);
    });
}
export default ApiScaffold;