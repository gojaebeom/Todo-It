import axios from "axios";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../atoms/tokenState";

function Redirector({ location, history }){
    

    const setToken = useSetRecoilState(tokenState);

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
        .catch(err => {
            if(err.response.status === 500 || err.response.status === 400){
                console.log("");
                alert("카카오 서버요청이 정상적으로 처리되지 않았습니다.");
                history.push("/login");
                throw new Error("요청 에러");
            }
        });

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/users/join-by-oauth`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${kakaoRes.access_token}`
            },
            withCredentials:true,
            data: {"provideType": "KAKAO"},
        })
        .then(data => {
            console.log("토큰 주입");
            setToken({...data.data.actInfo});
            history.push("/");
        })
        .catch(err => {
            console.err(err.response);
            if(err.response === 500 || err.response === 400){
                alert("서버요청이 정상적으로 처리되지 않았습니다.");
                history.push("/login");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    return(
    <div></div>
    )
}
export default withRouter(Redirector);