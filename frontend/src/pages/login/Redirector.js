import axios from "axios";
import { useEffect } from "react";
import { withRouter } from "react-router";

function Redirector({ location, history }){

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const code = location.search.split("code=")[1];
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', process.env.REACT_APP_KAKAO_CLIENT_ID);
        params.append('redirect_uri', process.env.REACT_APP_KAKAO_REDIRECT_URL);
        params.append('code', code);

        const kakaoRes = await axios({
            method: "post",
            url: "https://kauth.kakao.com/oauth/token",
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            data: params,
        })
        .then(data => data.data)
        .catch(err => err.response.status);

        console.log(kakaoRes);

        if(kakaoRes === 500 || kakaoRes === 400){
            alert("카카오 서버요청이 정상적으로 처리되지 않았습니다.");
            window.location.href = "/login";
        }

        const studybookRes = await axios({
            method: "post",
            url: "http://localhost:8080/users/join-by-oauth",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${kakaoRes.access_token}`
            },
            data: {"provideType": "KAKAO"},
        })
        .then(data => data.data)
        .catch(err => err.response);

        if(studybookRes === 500 || kakaoRes === 400){
            alert("서버요청이 정상적으로 처리되지 않았습니다.");
            window.location.href = "/login";
        }

        window.localStorage.setItem("act", studybookRes.data);

        window.location.href = "/";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    return(
    <div></div>
    )
}
export default withRouter(Redirector);