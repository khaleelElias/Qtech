const statusOptions = [
    { key: 'good', text: 'Mår bra'},
    { key: 'bad', text: 'Stressigt' },
    { key: 'well', text:'Ganska väl' },
]


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
    statusOptions,
    getWeekNumber
}