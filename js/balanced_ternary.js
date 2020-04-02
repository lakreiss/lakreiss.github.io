var up = '\u039B', down = 'V', zero = '0', empty_display = "0", empty_stored = "";

class BalancedTernaryNumber {

  constructor(digits) {
    this.bt_string = digits;
    this.length = digits.length;
    this.base_ten_number = this.convert_to_base_10(digits);
  }

  static get_addition(char1, char2) {
    this.addition = {};
    this.addition[up+up] = up+down;
    this.addition[up+zero] = up;
    this.addition[up+down] = zero;
    this.addition[zero+zero] = zero;
    this.addition[zero+down] = down;
    this.addition[zero+up] = up;
    this.addition[down+up] = zero;
    this.addition[down+zero] = down;
    this.addition[down+down] = down+up;
    return this.addition[char1+char2];
  }

  static get_multiplication(char1, char2) {
    this.multiplication = {};
    this.multiplication[up+up] = up;
    this.multiplication[up+zero] = zero;
    this.multiplication[up+down] = down;
    this.multiplication[zero+zero] = zero;
    this.multiplication[zero+down] = zero;
    this.multiplication[zero+up] = zero;
    this.multiplication[down+up] = down;
    this.multiplication[down+zero] = zero;
    this.multiplication[down+down] = up;
    return this.multiplication[char1+char2];
  }

  static get_convert(char) {
    this.convert = {};
    this.convert[zero] = 0;
    this.convert[up] = 1;
    this.convert[down] = -1;
    this.convert[0] = zero;
    this.convert[1] = up;
    this.convert[-1] = down;
    return this.convert[char];
  }

  convert_to_base_10(digits) {
    var answer = 0;
    var place = 0;
    while (digits.length > 0) {
      var digit = BalancedTernaryNumber.get_convert(digits.charAt(digits.length - 1));
      answer += digit * Math.pow(3, place);
      place += 1;
      digits = digits.substring(0, digits.length - 1);
    }
    return answer;
  }

  invert() {
    var new_string = "";
    for (var i = 0; i < this.bt_string.length; i++) {
      var cur_digit = this.bt_string.charAt(i);
      var inverse_digit = BalancedTernaryNumber.get_convert((BalancedTernaryNumber.get_convert(cur_digit) * -1));
      new_string += inverse_digit;
    }
    this.bt_string = new_string;
    this.base_ten_number = this.convert_to_base_10(new_string);
    return this;
  }

  get_bt_string() {
    return this.bt_string;
  }

  get_value() {
    return this.base_ten_number;
  }

  static subtract(bt1, bt2) {
    return BalancedTernaryNumber.add(bt1, bt2.invert());
  }

  static add(bt1, bt2) {
    if (bt2.length > bt1.length) {
      return this.helper_add_with_carry("0", bt2.get_bt_string(), bt1.get_bt_string());
    }
    return this.helper_add_with_carry("0", bt1.get_bt_string(), bt2.get_bt_string());
  }

  static helper_add_with_carry(carry, bt_long, bt_short) {
    // alert("carry: " + carry + " bt_long: " + bt_long + " bt_short: " + bt_short);

    if (bt_short == "" || bt_short == "0") {
      if (carry == "0") {
        return bt_long;
      } else if (bt_long == "0" || bt_long == "") {
        return carry
      } else {
        return this.helper_add_with_carry("0", bt_long, carry);
      }
    }

    var long_digit = bt_long.charAt(bt_long.length - 1);
    var short_digit = bt_short.charAt(bt_short.length - 1);
    var digit_sum = BalancedTernaryNumber.get_addition(long_digit, short_digit);

    var total_sum;
    if (digit_sum.length > 1) {
      total_sum = this.add(new BalancedTernaryNumber(carry), new BalancedTernaryNumber(digit_sum));
      // alert("new total sum: " + total_sum);
    } else {
      total_sum = BalancedTernaryNumber.get_addition(carry, digit_sum);
    }

    var new_carry = total_sum.length > 1 ? total_sum.charAt(0) : "0";
    var to_return = total_sum.charAt(total_sum.length - 1);

    return this.helper_add_with_carry(new_carry, bt_long.substring(0, bt_long.length - 1), bt_short.substring(0, bt_short.length - 1)) + to_return;
  }
}

function clicked(input) {
  if (is_balanced_ternary) {
    var cur_text = get_display_text();
    if (cur_text == empty_display) {
      cur_text = "";
    }
    set_display_text(cur_text + input);
  }
}

function equals() {
  if (is_balanced_ternary) {
    if (get_stored_text() != "") {
      var stored_text = get_stored_text().split(" ");
      var stored_btnum = new BalancedTernaryNumber(stored_text[0]);
      var operator = stored_text[1];
      var display_btnum = new BalancedTernaryNumber(get_display_text());
      var new_value;
      switch(operator) {
        case "+":
          new_value = remove_leading_zeros(BalancedTernaryNumber.add(stored_btnum, display_btnum));
          break;
        case "-":
          new_value = remove_leading_zeros(BalancedTernaryNumber.subtract(stored_btnum, display_btnum));
          break;
        default:
          alert("Error: " + operator);
      }
      // alert(new_value);
      set_display_text(new_value);
      set_stored_text(empty_stored);
    }
    // var btnum = new BalancedTernaryNumber(get_display_text());
    // alert(btnum.get_value());
  }
}

function switch_sign() {
  if (is_balanced_ternary) {
    var btnum = new BalancedTernaryNumber(get_display_text());
    btnum.invert();
    set_display_text(btnum.get_bt_string());
  }
}

function clear_all() {
  if (get_display_text() == empty_display) {
    set_stored_text(empty_stored);
  } else {
    set_display_text(empty_display);
  }
  is_balanced_ternary = true;
}

function set_html_to_empty_display(id) {
  document.getElementById(id).innerHTML = empty_display;
}

var is_balanced_ternary = true;
var cur_bt_num;
function convert() {
  if (is_balanced_ternary) {
    cur_bt_num = new BalancedTernaryNumber(get_display_text());
    set_display_text(cur_bt_num.get_value());
    is_balanced_ternary = false;
  } else {
    set_display_text(cur_bt_num.get_bt_string());
    is_balanced_ternary = true;
  }
}

function set_display_text(text) {
  document.getElementById("display_area").innerHTML = text;
}

function get_display_text() {
  return document.getElementById("display_area").innerHTML;
}

function set_stored_text(text) {
  document.getElementById("stored_area").innerHTML = text;
}

function get_stored_text() {
  return document.getElementById("stored_area").innerHTML;
}

function set_operator(op) {
  if (is_balanced_ternary) {
    if (get_display_text() != "0") {
      set_stored_text(get_display_text() + " " + op);
      set_display_text(empty_display);
    } else {
      if (get_stored_text()) {
        var stored_number = get_stored_text().split(" ")[0];
        set_stored_text(stored_number + " " + op);
      }
    }
  }
}

function remove_leading_zeros(input) {
  var start = 0;
  while (start < input.length - 1 && input.charAt(start) == zero) {
    start += 1;
  }
  return input.substring(start);
}

function onload_warning() {
  alert("Warning: only addition and subtraction have been implemented so far. Come back soon for multiplication and divison.");
}
