import axios from "axios";

async function ApiScaffold({ method, url, data, token }, callback){
    const { res, err } = await axios({
        method: method,
        url: `${process.env.REACT_APP_API_URL}${url}`,
        headers: {
            "Authorization": `bearer ${token}`,
        },
        withCredentials:true,
        data: data ? data : null
    })
    .then(data => {
        return {res: data.data};
    })
    .catch(err => {
        return {err: err.response};
    });

    if( err ) {
        callback(err);
    }else{
        return res;
    }
}
export default ApiScaffold;