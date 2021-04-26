const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function formatDate(date) {
    date = new Date(date);
    const day = date.getDay();
    const monthDay = date.getDate();
    const month = date.getMonth();

    const time = `${date.getHours()}:${date.getMinutes()}`;
    return `${week[day]}, ${monthDay} ${months[month]}, ${time}`;
}
