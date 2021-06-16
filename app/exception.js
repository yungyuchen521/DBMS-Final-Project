const validPhoneNumber = num => {
    for (var i = 0; i < num.length; i++) {
        if (isNaN(num[i]) && num[i] != ' ' && num[i] != '-') {
            return false;
        }
    }

    return true;
}

const validIntRange = (str, min, max) => {
    if (isNaN(str))
        return false;

    const num = parseInt(str);

    if (num < min || num > max)
        return false;

    return true;
}

const compareDates = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    console.log(d1);
    console.log(d2);

    if (d1 > d2) return 1;
    if (d1 == d2) return 0;
    return -1;
}