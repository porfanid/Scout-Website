function getWeekOfMonth(date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // First day of the month
    const dayOfMonth = date.getDate(); // Current day of the month
    const startDay = startOfMonth.getDay(); // Day of the week the month starts on (0=Sunday, 1=Monday, ...)

    // Calculate the week number
    return Math.ceil((dayOfMonth + startDay) / 7);
}

export default getWeekOfMonth;

const weekOfMonth = getWeekOfMonth(new Date());

console.log(weekOfMonth)