//user index
const userStatusOptions = [
    { key: 'good', text: 'God Balans'},
    { key: 'well', text:'Stressigt' },
    { key: 'bad', text: 'Mycket stressigt' },
    
]
//create column
const createColumnOptions = [
    { key: '1', text: 'Placera åt höger'},
    { key: '2', text:'Placera åt vänster' },
]
//order
const statusOfField = {
    "good":"#0b852b",
    "normal":"#FFFF00",
    "bad":"#FF0000"
}

//switch order status
function switchStatus(currentStatus) {
    return currentStatus === "good" ? "normal" : currentStatus === "normal" ? "bad" : "good"
}

//switch order status
function switchStatusColor(currentStatus) {
    return currentStatus === "good" ? "#0b852b" : currentStatus === "normal" ? "#FFFF00" : "#FF0000"
}

//week
function getWeekNumber() {
    // Copy date so don't modify original
    let date = new Date();
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (date - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return "Vecka: " + weekNo;
}

export {
    userStatusOptions,
    getWeekNumber,
    statusOfField,
    switchStatus,
    switchStatusColor,
    createColumnOptions,
}