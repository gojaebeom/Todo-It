import { atom } from "recoil";

export const toastState = atom({
    key:'toastState',
    default:{
        open:false,
        type:"SUCCESS",
        message:"",
        second:"",
    }
})