import moment from "moment";
import {useRef, useState} from "react";
import {atom, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import { calendarDetailState } from "./calendarDetailState";
import { todosByMonthState } from "./todosByMonthState";
import { toastState } from "./ui/toastState";
import { userState } from "./userState";
import apiScaffold from "../shared/api";
import ApiScaffold from "../shared/api";

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

export const calendarCustomsState = atom({
    key: 'calendarCustomsState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const contextMenuState = atom({
    key: 'contextMenuState', // unique ID (with respect to other atoms/selectors)
    default: {
        isOpen: false,
        matchedCalendarId: "",
        matchedDate: "",
    }, // default value (aka initial value)
});

export const todayState = atom({
    key: 'todayState', // unique ID (with respect to other atoms/selectors)
    default: moment(), // default value (aka initial value)
});

export const useCalendars = () => {
    const setToast = useSetRecoilState(toastState);
    const calendarDetail = useRecoilValue(calendarDetailState);
    const user = useRecoilValue(userState);
    const [todosByMonth, setTodosByMonth ] = useRecoilState(todosByMonthState);
    const [contextMenu, setContextMenu] = useRecoilState(contextMenuState);
    const resetContextMenu = useResetRecoilState(contextMenuState);
    const [customizes, setCustomizes] = useRecoilState(calendarCustomsState);
    const [today, setToday] = useRecoilState(todayState);

    const getCalendarCustomizes = async () => {
        const res = await ApiScaffold({
            method: "get",
            url: `/calendar-customizes?userId=${user.id}&calendarId=${calendarDetail.id}`,
        });
        setCustomizes(res.data);
        console.debug(res);
    }

    const changeTdColor = async (e, today, color) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("calendarId", calendarDetail.id);
        formData.append("userId", user.id);
        formData.append("matchedDate", today);
        formData.append("color", color);

        await ApiScaffold({
            method: "post",
            url: `/calendar-customizes`,
            data: formData
        });
        await getCalendarCustomizes();
        // setToast({open:true, message:"캘린더를 커스터마이징 하였습니다.", type:"INFO",second:2000});

        // resetContextMenu();
    }

    return {
        setToast,
        calendarDetail,
        user,
        todosByMonth,
        setTodosByMonth,
        contextMenu,
        setContextMenu,
        resetContextMenu,
        changeTdColor,
        customizes,
        getCalendarCustomizes,
        today,
        setToday
    }
}