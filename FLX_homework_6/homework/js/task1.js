let a = parseFloat(prompt("Enter a value of 'a'", "1"));
let b = parseFloat(prompt("Enter a value of 'b'", "2"));
let c = parseFloat(prompt("Enter a value of 'c'", "1"));
let x1,x2,d;

if (a === 0 || isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Invalid input data");
} else {
    d = b*b - 4*a*c;
    if (d < 0) {
        alert("no solution");
    } else if (d === 0) {
        x1 = -b/2*a;
        alert(`x = ${x1}`);
    } else {
        x1 = (-b + Math.sqrt(d))/(2*a);
        x2 = (-b - Math.sqrt(d))/(2*a);
        alert(`x1 = ${x1}  and  x2 = ${x2}`);
    }
}
