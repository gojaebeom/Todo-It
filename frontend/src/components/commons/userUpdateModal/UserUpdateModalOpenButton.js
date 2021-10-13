import React from "react";
import {useRecoilState} from "recoil";
import {userEditState} from "../../../atoms/userEditState";
import {userState} from "../../../atoms/userState";
import {updateUserModalState} from "../../../atoms/ui/updateUserModalState";

const UserUpdateModalOpenButton = () => {
    const [userEdit, setUserEdit] = useRecoilState(userEditState);
    const [user, setUser] = useRecoilState(userState);
    const [userModalOpen, setUserModalOpen] = useRecoilState(updateUserModalState);

    const clickUpdateUserModalOpenEvent = () => {
        setUserEdit({
            ...userEdit,
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            userCode: user.userCode,
            createdAt: user.createdAt,
        });
        setUserModalOpen({...userModalOpen, open:true});
    }

    return(
    <button onClick={clickUpdateUserModalOpenEvent}><i className="mx-2 fas fa-cog"></i></button>
    )
}
export default UserUpdateModalOpenButton;