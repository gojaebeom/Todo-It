import moment from "moment";

const dateFormat = ( history ) =>{
    let day = history.location.pathname.split("days/")[1];
    let filterDay = day;
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, "day").format('YYYY-MM-DD');
    const tomorrow = moment().add(1, "day").format('YYYY-MM-DD');
    switch(filterDay){
        case yesterday:
            filterDay = "어제";
            break;
        case today:
            filterDay = "오늘";
            break;
        case tomorrow:
            filterDay = "내일";
            break;
        default:
    }
    return {day, filterDay};
}
export default dateFormat;