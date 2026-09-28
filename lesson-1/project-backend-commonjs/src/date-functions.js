const isLeapYear = year => {
    return new Date(year, 2, 0).getDate() === 29
}

const getCurrentMonth = ()=> new Date().getMonth() + 1;

module.exports = {
    isLeapYear,
    getCurrentMonth,
}

