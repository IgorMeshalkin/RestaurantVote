export const dateFormat = (dateString) => {
    const date = new Date(dateString);
    let result = []
    result.push(
        date.getDate(),
        getStringOfMonth(date.getMonth()),
        date.getFullYear() + ',',
        getTwoNumbers(date.getHours()) + ':' + getTwoNumbers(date.getMinutes())
    );
    return result.join(" ")
}

function getTwoNumbers(num) {
    let result = num.toString();
    if (result.length === 2) {
        return result;
    } else {
        return '0' + result;
    }
}

function getStringOfMonth(month) {
    let result;
    switch (month) {
        case 0:
            result = 'января';
            break;
        case 1:
            result = 'февраля';
            break;
        case 2:
            result = 'марта';
            break;
        case 3:
            result = 'апреля';
            break;
        case 4:
            result = 'мая';
            break;
        case 5:
            result = 'июня';
            break;
        case 6:
            result = 'июля';
            break;
        case 7:
            result = 'августа';
            break;
        case 8:
            result = 'сентября';
            break;
        case 9:
            result = 'октября';
            break;
        case 10:
            result = 'ноября';
            break;
        case 11:
            result = 'декабря';
            break;
    }
    return result;
}

