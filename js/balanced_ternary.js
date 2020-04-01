var up = '\u039B', down = 'V', zero = '0', empty = "0";

class BalancedTernaryNumber {

  constructor(digits) {
    this.build_convert();
    this.bt_string = digits;
    this.base_ten_number = this.convert_to_base_10(digits);
  }

  build_convert() {
    this.convert = {};
    this.convert[zero] = 0;
    this.convert[up] = 1;
    this.convert[down] = -1;
    this.convert[0] = zero;
    this.convert[1] = up;
    this.convert[-1] = down;
  }

  convert_to_base_10(digits) {
    var answer = 0;
    var place = 0;
    while (digits.length > 0) {
      var digit = this.convert[digits.charAt(digits.length - 1)];
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
      var inverse_digit = this.convert[(this.convert[cur_digit] * -1)];
      new_string += inverse_digit;
    }
    this.bt_string = new_string;
    this.base_ten_number = this.convert_to_base_10(new_string);
  }

  get_bt_string() {
    return this.bt_string;
  }

  get_value() {
    return this.base_ten_number;
  }
}

function clicked(input) {
  if (is_balanced_ternary) {
    var cur_text = get_display_text();
    if (cur_text == empty) {
      cur_text = "";
    }
    set_display_text(cur_text + input);
  }
}

function equals() {
  if (is_balanced_ternary) {
    var btnum = new BalancedTernaryNumber(get_display_text());
    alert(btnum.get_value());
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
  if (is_balanced_ternary) {
    set_display_text(empty);
  }
}

function set_html_to_empty(id) {
  document.getElementById(id).innerHTML = empty;
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
