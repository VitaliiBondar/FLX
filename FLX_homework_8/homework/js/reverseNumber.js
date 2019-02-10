function reverseNumber(value) {
    let sign = value < 0 ? '-' : '';
    value = Math.abs(value) + '';
    return Number(sign + value.split('').reverse().join(''));
}
reverseNumber(-437);