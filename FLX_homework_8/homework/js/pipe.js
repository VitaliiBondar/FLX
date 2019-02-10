function pipe(number, ...functions) {
    for (let i = 0; i < functions.length; i++) {
        number=functions[i](number);
    }
    return number;
}
function addOne(x) {
    return x + 1;
}
pipe(1, addOne, addOne);