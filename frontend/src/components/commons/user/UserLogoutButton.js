import React from "react";
import ApiScaffold from "../../../shared/api";
import {useSetRecoilState} from "recoil";
import {toastState} from "../../../atoms/ui/toastState";

const UserLogoutButton = () => {

    const setToast = useSetRecoilState(toastState);
    const clickLogoutEvent = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm("로그아웃 하시겠습니까?");
        if(!result) return;

        await ApiScaffold({
            method: "get",
            url: `/users/logout`,
        }, (err) => setToast({open:true, message:err, type:"ERROR" ,second:2000}));
        // history.push("/login");
        window.location.href = "/login";
    }


    return(
    <button onClick={clickLogoutEvent}><i className="mx-1 fas fa-sign-out-alt"></i></button>
    )
}
export default UserLogoutButton;