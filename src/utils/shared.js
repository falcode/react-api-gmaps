export function setTime(date) {
    var d = new Date(date);
    return(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
}

export function addZero(i) {
    return (i < 10) ? "0" + i : i;
}
