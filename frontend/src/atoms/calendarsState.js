import moment from "moment";
import { useState } from "react";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { calendarDetailState } from "./calendarDetailState";
import { todosByMonthState } from "./todosByMonthState";
import { toastState } from "./ui/toastState";
import { userState } from "./userState";

export const calendarsState = atom({
    key: 'calendarsState', // unique ID (with respect to other atoms/selectors)
    default: [
        {
            id: "",
            userId: "",
            name: "",
            thumbnail: "",
            thumbnailPreview: "",
            isPrivate: 0,
            isDefault: 0,
        }
    ], // default value (aka initial value)
});

export const useCalendars = () => {
    const setToast = useSetRecoilState(toastState);

    const calendarDetail = useRecoilValue(calendarDetailState);
    const user = useRecoilValue(userState);
    const [todosByMonth, setTodosByMonth ] = useRecoilState(todosByMonthState);

    

    return {
        setToast,
        calendarDetail,
        user,
        todosByMonth,
        setTodosByMonth
    }
}