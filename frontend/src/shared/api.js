import axios from "axios";

const apiScaffold = async ({ method, url, data, token }, callback) => {
    return await axios({
        method: method,
        url: url,
        data: data ? data : null
    })
    .then(data => {
        console.log(data);
        if(data.data.error){
            const error = data.data.error;
            if(callback) callback(error.message);
            throw new Error(error.message);
        }
        return data.data;
    })
    .catch(errMessage => {
        throw new Error(errMessage);
    });
}
export default apiScaffold;