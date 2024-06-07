console.log(
	"This is a number system to convert Decimal to Binary, Octal, and Hexadecimal.\nInputs should be numbers only; if not, invalid input will occur.\nInput will be converted to a number before conversion.\n\nDevelop by Jimbs as an entry for the Challenge of France Marteja.\n"
);
question();
function question() {
	const readline = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	readline.question("Input a number: ", (input) => {
		console.log("\n");
		if (!input && !/^[0-9]*$/g.test(input)) console.log("Invalid input");

		console.log(`Decimal to Binary: ${decimalToBinary(input)}`);
		console.log(`Decimal to Octal: ${decimalToOctal(input)}`);
		console.log(`Decimal to Hexadecimal: ${decimalToHexadecimal(input)}`);

		readline.close();
		console.log("\n");
		question();
	});
}

const getPowerVal = (base, p) => Math.pow(base, p);
const truncNum = (num) => Math.trunc(num);

function decimalToBinary(input) {
	let val = parseInt(input);
	let collection = [val];
	const base = 2;

	for (; val >= 1; ) collection.push(parseInt((val /= base)));

	return collection
		.map((val) => parseInt(val) % base)
		.reverse()
		.join("");
}

function decimalToOctal(input) {
	let val = parseInt(input);
	let ans = "";
	const base = 8;

	for (; parseInt(val) != 0; ) {
		ans += parseInt(((val / base) % 1) * base);
		val = truncNum(val / base);
	}

	return parseInt(ans.split("").reverse().join(""));
}

function decimalToHexadecimal(input) {
	let val = parseInt(input);
	let ans = [];
	let iPow = 0;
	const base = 16;
	const conv_val = ["A", "B", "C", "D", "E", "F"];

	if (input < base) return input > 9 ? conv_val[input - 10] : input;
	for (let p = 1; input >= getPowerVal(base, p); p++) {
		if (input >= getPowerVal(base, p)) iPow = p;
	}

	ans.push(truncNum(val / getPowerVal(base, iPow)));
	val = input - ans[ans.length - 1] * getPowerVal(base, iPow--);

	for (; iPow >= 0; iPow--) {
		if (val <= 16 && !iPow) {
			ans.push(val);
			continue;
		}
		if (val >= getPowerVal(base, iPow) && iPow != 0) {
			ans.push(truncNum(val / getPowerVal(base, iPow)));
			val -= ans[ans.length - 1] * getPowerVal(base, iPow);
			continue;
		}
		ans.push(0);
	}
	return ans.map((e) => (e > 9 ? conv_val[e - 10] : e)).join("");
}
