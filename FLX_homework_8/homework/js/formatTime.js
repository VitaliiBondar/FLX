function formatTime(value) {
    let days = Math.floor(value / (60 * 24));
    let hours = Math.floor((value % (24 * 60)) / 60);
    let minutes = Math.floor((value % (24 * 60)) % 60);
    return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}
formatTime(3601);