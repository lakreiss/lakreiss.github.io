var up = '\u039B', down = 'V', zero = '0', empty_display = "0", empty_stored = "";

class BalancedTernaryNumber {

  constructor(digits) {
    this.bt_string = BalancedTernaryNumber.remove_leading_zeros(digits);
    this.length = this.bt_string.length;
    this.base_ten_number = this.convert_to_base_10(digits);
  }

  static remove_leading_zeros(input_string) {
    var start = 0;
    while (start < input_string.length - 1 && input_string.charAt(start) == zero) {
      start += 1;
    }
    return input_string.substring(start);
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
    var new_string = this.get_inverse();
    this.bt_string = new_string;
    this.base_ten_number = this.convert_to_base_10(new_string);
    return this;
  }

  get_inverse() {
    var new_string = "";
    for (var i = 0; i < this.bt_string.length; i++) {
      var cur_digit = this.bt_string.charAt(i);
      var inverse_digit = BalancedTernaryNumber.get_convert((BalancedTernaryNumber.get_convert(cur_digit) * -1));
      new_string += inverse_digit;
    }
    return new_string;
  }

  get_bt_string() {
    return this.bt_string;
  }

  get_value() {
    return this.base_ten_number;
  }

  is_greater_absolute(bt_other) {
    var this_bt_num = this.get_bt_string();
    if (this_bt_num.charAt(0) == down) {
      this_bt_num = this.get_inverse();
    }

    var other_bt_num = bt_other.get_bt_string();
    if (other_bt_num.charAt(0) == down) {
      other_bt_num = bt_other.get_inverse();
    }

    if (this_bt_num.length > bt_other.length) {
      return true;
    } else if (this_bt_num.length < bt_other.length) {
      return false;
    }

    // alert("NOW GOT HERE checking is greater absolute: " + this_bt_num + " or " + other_bt_num);

    while (this_bt_num.length > 0) {
      var this_char = this_bt_num.charAt(0);
      var other_char = other_bt_num.charAt(0);
      // alert("NOW GOT HERE TOO checking: " + this_bt_num + " or " + other_bt_num);
      if (this_char == up) {
        if (other_char != up) {
          return true;
        }
      } else if (this_char == zero) {
        if (other_char == up) {
          return false;
        } else if (other_char == down) {
          return true;
        }
      } else if (this_char == down) {
        if (other_char != down) {
          return false;
        }
      }
      this_bt_num = this_bt_num.substring(1);
      other_bt_num = other_bt_num.substring(1);
    }
    return false; //could be either one
  }

  static get_smallest_absolute_difference(bt1, bt2) {
    var diff1 = new BalancedTernaryNumber(BalancedTernaryNumber.subtract(bt1, bt2));
    var diff2 = new BalancedTernaryNumber(BalancedTernaryNumber.add(bt2, bt1));
    if (diff1.is_greater_absolute(diff2)) {
      return diff2;
    } else {
      return diff1;
    }
  }

  static divide(bt1, bt2) {
    if (bt2.length > bt1.length) {
      return "0";
    }

    var orig_bt1_length = bt1.length + 1;
    var final_number_string = "";

    bt1 = new BalancedTernaryNumber(bt1.get_bt_string() + "00000000000");
    for (var i = 0; i < orig_bt1_length; i++) {

      alert("starting again with " + bt1.get_bt_string() + " and " + bt2.get_bt_string() + ", final string is " + final_number_string);

      // alert("done: " + BalancedTernaryNumber.get_smallest_absolute_difference(bt1, bt2).get_bt_string());

      var cur_num = new BalancedTernaryNumber(bt1.get_bt_string().charAt(0));
      var cur_difference = BalancedTernaryNumber.get_smallest_absolute_difference(cur_num, bt2);

      var j = 1, getting_closer = true;
      while (getting_closer && j < bt1.length) {
        var next_num = new BalancedTernaryNumber(bt1.get_bt_string().substring(0, j + 1));
        var next_difference = BalancedTernaryNumber.get_smallest_absolute_difference(next_num, bt2);
        // alert("cur num: " + cur_num.get_bt_string() + " bt2: " + bt2.get_bt_string() + " cur difference" + cur_difference.get_bt_string()
              // + "\n\n" + "next num: " + next_num.get_bt_string() + " bt2: " + bt2.get_bt_string() + " next difference" + next_difference.get_bt_string());

        alert("checking is greater absolute: " + cur_difference.get_bt_string() + " or " + next_difference.get_bt_string());

        if (cur_difference.is_greater_absolute(next_difference)) {
          alert("returned true");
          cur_num = next_num;
          cur_difference = next_difference;
          final_number_string += zero;
          j += 1;
          orig_bt1_length -= 1;
        } else {
          alert("returned false");
          getting_closer = false;
          final_number_string += cur_num.get_bt_string().charAt(0) == bt2.get_bt_string().charAt(0) ? up : down;
        }
      }
      alert("new final number string: " + final_number_string + " new cur_difference = " + cur_difference.get_bt_string());
      bt1 = new BalancedTernaryNumber(cur_difference.get_bt_string() + bt1.get_bt_string().substring(j));
    }
    alert("FINAL NUMBER: " + final_number_string);

    // alert("done");
    return "0";
  }

  //really wanted to figure out division without converting to balanced ternary, but it was taking a while so I did this. in the future I'll try to fix the above code so that I never need to do this.
  static hacky_divide(bt1, bt2) {
    function convert_to_bt(decimal_number) {
      var decimal_number = parseInt(decimal_number);
      var digits = 1;
      var counter = 1;
      var abs_number = Math.abs(decimal_number);

      while (abs_number > counter) {
        counter += Math.pow(3, digits);
        digits += 1;
      }

      var numToReturn = "";
      if (digits == 1) {
        if (decimal_number > 0) {
          return up;
        } else if (decimal_number < 0) {
          return down;
        } else {
          return zero;
        }
      } else {
        for (var i = 1; i < digits; i++) {
          numToReturn += zero;
        }
      }

      var numToSubtract;
      if (decimal_number > 0) {
        numToReturn = up + numToReturn;
        numToSubtract = Math.pow(3, digits - 1);
      } else {
        numToReturn = down + numToReturn;
        numToSubtract = -1 * Math.pow(3, digits - 1);
      }

      if (digits > 1) {
        return BalancedTernaryNumber.add(new BalancedTernaryNumber(numToReturn), new BalancedTernaryNumber(convert_to_bt(decimal_number - numToSubtract)));
      } else {
        return numToReturn;
      }
    }

    var bt1_value = bt1.get_value();
    var bt2_value = bt2.get_value();
    var negative = false;
    // alert(bt1.get_value() + " " + bt2.get_value());
    if ((bt1_value > 0 && bt2_value < 0) || (bt1_value < 0 && bt2_value > 0)) {
      bt1_value *= -1;
      negative = true;
    }
    var quotient = Math.floor(bt1_value/bt2_value);
    // alert(bt1_value + " " + bt2_value + " " + quotient);

    if (negative) {
      return convert_to_bt(quotient * -1);
    } else {
    return convert_to_bt(quotient);
    }
  }

  static multiply(bt1, bt2) {
    var bt1_string = bt1.get_bt_string(), bt2_string = bt2.get_bt_string();
    var running_total = new BalancedTernaryNumber("0");
    for (var i = bt2.length - 1; i >= 0; i--) {
      var cur_row = "";
      for (var num_zeros = 0; num_zeros < bt2.length - 1 - i; num_zeros++) {
        cur_row += "0";
      }
      for (var j = bt1.length - 1; j >= 0; j--) {
        cur_row = BalancedTernaryNumber.get_multiplication(bt1_string.charAt(j), bt2_string.charAt(i)) + cur_row;
      }
      running_total = new BalancedTernaryNumber(BalancedTernaryNumber.add(running_total, new BalancedTernaryNumber(cur_row)));
    }
    return running_total.get_bt_string();
  }

  static subtract(bt1, bt2) {
    return BalancedTernaryNumber.add(bt1, new BalancedTernaryNumber(bt2.get_inverse()));
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
        case "x":
          new_value = remove_leading_zeros(BalancedTernaryNumber.multiply(stored_btnum, display_btnum));
          break;
        case "/":
          new_value = remove_leading_zeros(BalancedTernaryNumber.hacky_divide(stored_btnum, display_btnum));
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
  set_balanced_ternary_on();
}

function set_html_to_empty_display(id) {
  document.getElementById(id).innerHTML = empty_display;
}

var is_balanced_ternary = true;
var cur_bt_num, cur_bt_stored;
function convert() {
  if (is_balanced_ternary) {
    cur_bt_num = new BalancedTernaryNumber(get_display_text());
    set_display_text(cur_bt_num.get_value());

    if (get_stored_text()) {
      var stored_text = get_stored_text().split(" ");
      cur_bt_stored = new BalancedTernaryNumber(stored_text[0]);
      set_stored_text(cur_bt_stored.get_value() + " " + stored_text[1]);
    }

    set_balanced_ternary_off();

  } else {
    set_display_text(cur_bt_num.get_bt_string());

    if (get_stored_text()) {
      var stored_text = get_stored_text().split(" ");
      set_stored_text(cur_bt_stored.get_bt_string() + " " + stored_text[1]);
    }

    set_balanced_ternary_on();
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

function set_balanced_ternary_on() {
  if (!is_balanced_ternary) {
    var convert_button = document.getElementById("convert_button");
    convert_button.classList.toggle("balanced_ternary_off")
    is_balanced_ternary = true;
  }
}

function set_balanced_ternary_off() {
  if (is_balanced_ternary) {
    var convert_button = document.getElementById("convert_button");
    convert_button.classList.toggle("balanced_ternary_off")
    is_balanced_ternary = false;
  }
}

function show_information() {
  var division = "*Note that the division is integer division.";
  var division2 = "\nNo decimals are included in this calculator right now.";
  var conversion = "\n\nOnce you convert a number to base 10, you must convert it back to Balanced Ternary before proceeding.";
  alert(division + division2 + conversion);
}

function onload_warning() {
  alert("Warning: only addition, subtraction, and multiplication have been implemented so far. Come back soon for divison.");
}
