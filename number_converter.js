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
    if (!input || !/^[0-9]*$/g.test(input)) {
      console.log("Invalid input");
    } else {
      console.log(
        `Decimal to Binary: ${input == 0 ? "0000" : decimalToBinary(input)}`
      );
      console.log(
        `Decimal to Octal: ${input == 0 ? "0" : decimalToOctal(input)}`
      );
      console.log(
        `Decimal to Hexadecimal: ${
          input == 0 ? "0" : decimalToHexadecimal(input)
        }`
      );
    }
    readline.close();
    console.log("\n");
    question();
  });
}

const getPowerVal = (base, p) => base ** p;
const truncNum = (num) => {
  const num_str = num.toString();
  return parseInt(
    num_str.substring(
      0,
      num_str.indexOf(".") != -1 ? num_str.indexOf(".") : num_str.length
    )
  );
};

function decimalToBinary(input) {
  let val = parseInt(input);
  const base = 2;
  let collection = "";

  for (; val >= 1; ) {
    if (input == val) collection = `${val % base}` + collection;

    let entry = `${(val /= base) % base}`[0];
    if (val < 1 && val % base < 1) continue;
    collection = entry + collection;
  }

  return collection;
}

function decimalToOctal(input) {
  let val = parseInt(input);
  let ans = "";
  const base = 8;

  for (; parseInt(val) != 0 && !isNaN(val); ) {
    ans = parseInt(((val / base) % 1) * base) + ans;
    val = truncNum(val / base);
  }

  return ans;
}

function decimalToHexadecimal(input) {
  let val = parseInt(input);
  let ans = "";
  let _pow = 0;
  const base = 16;
  const conv_val = ["A", "B", "C", "D", "E", "F"];
  const parseVal = (v) => (v > 9 ? conv_val[v - 10] : v);
  const getPrevRemainder = () => {
    const lastInx = ans.length - 1;
    if (isNaN(parseInt(ans[lastInx])))
      return parseInt(conv_val.indexOf(ans[lastInx]) + 10);
    return parseInt(ans[lastInx]);
  };

  if (input < base) return input > 9 ? conv_val[input - 10] : input;
  for (let p = 1; input >= getPowerVal(base, p); p++) {
    if (input >= getPowerVal(base, p)) _pow = p;
  }

  ans += parseVal(truncNum(val / getPowerVal(base, _pow)));
  val = input - getPrevRemainder() * getPowerVal(base, _pow--);

  for (; _pow >= 0; _pow--) {
    let valPow = getPowerVal(base, _pow);
    if (val <= 16 && !_pow) {
      ans += parseVal(val);
      continue;
    }
    if (val >= valPow && _pow != 0) {
      ans += parseVal(truncNum(val / valPow));
      val -= getPrevRemainder() * valPow;
      continue;
    }
    ans += 0;
  }
  return ans;
}
