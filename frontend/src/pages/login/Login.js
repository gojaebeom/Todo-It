import SignLayout from "../../layouts/sign/SignLayout";
import coverImg from "../../assets/images/cover_.png";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atoms/tokenState";
import ApiScaffold from "../../shared/api";

function Login({ history }){
    const token = useRecoilValue(tokenState);
    useEffect(() => {
        if(token.token !== ""){
            history.push("/");
        }
    });

    return(
    <SignLayout>
        <div className="flex flex-col justify-between p-5 bg-white border rounded-md w-400">
            <div>
                <p className="text-2xl">간단한 협업 일정 관리</p>
                <p className="text-2xl font-noto-bold">'투두잇'으로 관리하세요.</p>
            </div>
            <img src={coverImg} alt="img" />
            <div className="flex flex-col items-center justify-center">
                <button className="mb-2" onClick={
                    async () => {
                        const userRes = await ApiScaffold({
                            method: "post",
                            url: `/users/join-free`,
                            data: {"provideType": "KAKAO", "email":"KAKAO:test@test"}
                        }, ( err ) => {
                            console.err(err.response);
                            if(err.response === 500 || err.response === 400){
                                alert("서버요청이 정상적으로 처리되지 않았습니다.");
                                history.push("/login");
                            }
                        });
                        history.push("/");
                    }
                }>무지성 로그인하기</button>
                <div className="mb-2">선택지가 없는 카카오톡 로그인하기</div>
                <a 
                    href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`}
                    className="flex items-center justify-center w-16 h-16 p-5 text-2xl border border-yellow-400 rounded-full">
                    <div className="flex items-center justify-start p-5 bg-yellow-400 rounded-full w-14 h-14">
                        kakao
                    </div>
                </a>
            </div>
        </div>
    </SignLayout>
    )
}
export default withRouter(Login);