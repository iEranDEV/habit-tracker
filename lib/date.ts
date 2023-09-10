const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekdays = [1, 2, 3, 4, 5, 6, 0];
export const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const isSameDate = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export const getMonthName = (month: number) => {
    return MONTHS[month];
}

export const getMonthShort = (month: number) => {
    return MONTHS_SHORT[month];
}

export const getWeek = (date: Date) => {
    const day = weekdays.indexOf(date.getDay());

    const firstDate = date.getDate() - day;
    const lastDate = date.getDate() + (6 - day);

    let weekStart = new Date(date.getFullYear(), date.getMonth(), firstDate);
    let weekEnd = new Date(date.getFullYear(), date.getMonth(), lastDate);

    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    if (firstDate <= 0) {
        weekStart.setMonth(weekStart.getMonth() - 1);

        if (weekStart.getMonth() < 0) {
            weekStart.setMonth(11);
            weekStart.setFullYear(weekStart.getFullYear() - 1);
        }
    }

    if (lastDate > daysInMonth) {
        weekEnd.setMonth(weekEnd.getMonth() + 1);

        if (weekEnd.getMonth() > 11) {
            weekEnd.setMonth(0);
            weekEnd.setFullYear(weekEnd.getFullYear() + 1)
        }
    }

    return { weekStart, weekEnd };
}

export const formatShortDate = (date: Date) => {
    return `${date.getDate()} ${getMonthShort(date.getMonth())}`
}