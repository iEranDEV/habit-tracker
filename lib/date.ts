const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const weekdays = [1, 2, 3, 4, 5, 6, 0];
export const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/*
export const isSameDate = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}
*/

export const getMonthFullName = (month: number) => {
    return MONTHS[month];
}

export const getMonthShortName = (month: number) => {
    return MONTHS_SHORT[month];
}

export const formatShortDate = (date: Date) => {
    return `${date.getDate()} ${getMonthShortName(date.getMonth())}`
}