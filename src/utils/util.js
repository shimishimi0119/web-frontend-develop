export function parseTime(date=new Date()) {
    return {
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds(),
    };
}

export function zeroPadding(number) {
    return ('0' + number).slice(-2);
}
