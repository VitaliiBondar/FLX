let price = parseFloat(prompt("Enter an amount of money", "4950"));
let discount = parseFloat(prompt("Enter the discount", "30"));

if (isNaN(price) || (price<=0) || (price>9999999) || isNaN(discount) || (discount<0) || (discount>99)) {
    alert("Invalid input data");
} else {
    let priceWithDiscount = price - price / 100 * discount;
    let saved = price / 100 * discount;
    alert(`    Price without discount: ${+(price.toFixed(2))}
    Discount: ${+(discount.toFixed(2))}%
    Price with discount: ${+(priceWithDiscount.toFixed(2))}
    Saved: ${+(saved.toFixed(2))}`);
}