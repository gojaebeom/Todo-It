import { atom } from "recoil";

export const todoDetailState = atom({
    key:'todoDetailState',
    default:{
        id:'',
        description:''
    }
})