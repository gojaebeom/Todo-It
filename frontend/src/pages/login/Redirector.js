import axios from "axios";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { useSetRecoilState } from "recoil";
import { calendarsState } from "../../atoms/calendarsState";
import { tokenState } from "../../atoms/tokenState";
import { loadingPageState } from "../../atoms/ui/loadingPage";
import { userState } from "../../atoms/userState";
import ApiScaffold from "../../shared/api";

function Redirector({ location, history }){
    const setToken = useSetRecoilState(tokenState);
    const setUser = useSetRecoilState(userState);
    const setCalendars = useSetRecoilState(calendarsState);
    const setLoadingPage = useSetRecoilState(loadingPageState);

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

        const tokenRes = await ApiScaffold({
                            method: "post",
                            url: `/users/join-by-oauth`,
                            token: kakaoRes.access_token,
                            data: {"provideType": "KAKAO"}
                        }, ( err ) => {
                            console.err(err.response);
                            if(err.response === 500 || err.response === 400){
                                alert("서버요청이 정상적으로 처리되지 않았습니다.");
                                history.push("/login");
                            }
                        });
    
        setToken({...tokenRes.actInfo});
       
        const userRes = await ApiScaffold({
            method: "get",
            url: `/users/${tokenRes.actInfo.id}`,
            token: tokenRes.actInfo.token
        }, ( err ) => {
            console.error(err);
        });
        setUser({...userRes.data.user});
        setCalendars([...userRes.data.calendars]);
        setLoadingPage({step1:false, step2:true});
        history.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);    

    return(
    <div></div>
    )
}
export default withRouter(Redirector);