var board_height=5, board_width=5, blank_tile="__", free_tile = "FREE";
var all_default_answers = ["Harness Peer Pressure", "Social Motivation", "Social Ability", "Willingly Change", "Personal Motivation", "Sense of Values", "Personal Ability", "Structural Motivation", "Structural Ability", "Opinion Leaders", "Foster Teamwork", "Strategies", "Modest rewards", "Control Emotions", "ID Vital Behaviors", "200% Accountability", "Open Communication", "Confront Problems", "Responsibility for others", "Speak up",  "Praise vs. Punishment", "Teach and Question", "Go to Gemba", "Make Undesirable Desirable", "Surpass Your Limits", "Reward Behaviors not Outcomes", "Change the Environment", "Intrinsic Satisfaction / Motivation", "Develop Mini-Goals", "Deliberate Practice", "Public Discourse", "Power of Propinquity"]
var url_delim = "?", answer_delim="&";
var valid_colors = ["black", "white", "silver", "gray", "maroon", "red", "purple", "fuchsia", "green", "lime", "olive", "yellow", "navy", "blue", "teal", "aqua", "pink"];
var has_free_space = "true";

function get_tile_name(i, j) {
  return "tile" + String.fromCharCode(65+j)+eval(i+1);
}

function get_tile_coords(name) {
  if (name.substring(0, 4) != "tile") {
    alert("illegal tile name");
  } else {
    // alert("tile coords for " + name + " are (" + eval(name.charCodeAt(4) - 65) +", " + parseInt(name.substring(5)) - 1 + ")");
    return [eval(parseInt(name.substring(5)) - 1), name.charCodeAt(4) - 65];
  }
}

function check_is_valid_text(input) {
  var regex = new RegExp(/^[-0-9a-z/,'"%. ]+$/i, ); //takes letters and numbers, as well as a slash, comma, or space
  return regex.test(input);
}

function check_is_valid_color(input) {
  var regex = new RegExp(/^#[a-fA-F0-9]{6}$/, ); //takes letters and numbers, as well as a slash, comma, or space
  if (!regex.test(input)) {
    return valid_colors.includes(input.toLowerCase());
  }
  return true;
}

function check_is_valid_direction(input) {
  return (input=="top" || input=="bottom" || input=="left" || input=="right");
}

function check_is_valid_bool(input) {
  return (input==false || input==true);
}

function check_is_valid_bool_string(input) {
  return (input=="false" || input=="true");
}

function url_has_bingo_entries() {
  return window.location.href.includes(url_delim);
}

function set_header(header) {
  document.getElementById("header").innerHTML = header;
}

function get_bingo_entries() {
  // alert("tried to set entries");
  var url_split = window.location.href.split(url_delim);
  if (url_split.length != 9) {
    alert("Error: invalid url. Default answers will be used instead.");
    return all_default_answers;

  } else {
    var header = url_split[1];
    if (!check_is_valid_text(header)) {
      alert("Error: invalid header. Default answers will be used instead.");
      return all_default_answers;
    } else {
      set_header(header.replace(/%20/g, " "));

      var all_answers = url_split[2].split(answer_delim);
      if (all_answers.length < board_width * board_height) {
        alert("Error: there are not enough answers to fill the board. Default answers will be used instead.");
        return all_default_answers;
      } else {
        for (var i = 0; i < all_answers.length; i++) {
          if (!check_is_valid_text(all_answers[i])) {
            alert(all_answers[i] + " is invalid. Default answers will be used instead");
          }
          all_answers[i] = all_answers[i].replace(/%20/g, " ");
        }

        // alert("new color: " + url_split[3]);
        var word_color = url_split[3];
        if (!check_is_valid_color(word_color) && word_color != "") {
          alert("Error: illegal url. Please don't try to hack me.");
          return;
        }
        document.getElementById("header").style.color = word_color;
        for (var i=0; i < board_height; i++) {
          for (var j=0; j < board_width; j++) {
            var tile_name = get_tile_name(i, j);
            document.getElementById(tile_name).style.color = word_color;
            document.getElementById(tile_name).style.outlineColor = word_color;
          }
        }

        var clicked_color = url_split[4];
        if (!check_is_valid_color(clicked_color) && clicked_color != "") {
          alert("Error: illegal url. Please don't try to hack me.");
          return;
        }
        clicked_true_color = clicked_color=="" ? "black" : clicked_color;
        for (var i=0; i < board_height; i++) {
          for (var j=0; j < board_width; j++) {
            var tile_name = get_tile_name(i, j);
            if (document.getElementById(tile_name).dataset.is_clicked == "false") {
              document.getElementById(tile_name).style.backgroundColor = clicked_false_color;
            } else {
              document.getElementById(tile_name).style.backgroundColor = clicked_true_color;
            }
          }
        }

        var background_dir = url_split[5];
        if (!check_is_valid_direction(background_dir)) {
          alert("Error: illegal url. Please don't try to hack me.");
          return;
        }
        var background_start = url_split[6];
        if (!check_is_valid_color(background_start) && background_start != "") {
          alert("Error: illegal url. Please don't try to hack me.");
          return;
        }
        var background_end = url_split[7];
        if (!check_is_valid_color(background_end) && background_end != "") {
          alert("Error: illegal url. Please don't try to hack me.");
          return;
        }
        background_start = background_start=="" ? "#3BA4C6" : background_start;
        background_end = background_end=="" ? "#9DB8F0" : background_end;

        // document.body.style.backgroundImage = "linear-gradient(to " + background_dir + ", #3BA4C6, #9DB8F0)";
        document.body.style.backgroundImage = "linear-gradient(to " + background_dir + ", " + background_start + ", " + background_end + ")";

        //has free space
        var free_space = url_split[8];
        if (check_is_valid_bool_string(free_space)) {
          var tile_name = get_tile_name(Math.floor(board_height / 2), Math.floor(board_width / 2));
          if (free_space == "true") {
            has_free_space = "true";
          } else {
            has_free_space = "false";
          }
        } else {
          alert("INVALID boolean: " + free_space);
          return false;
        }

        return all_answers;
      }
    }
  }
}

function set_bingo_tiles() {
  var iter;
  if (url_has_bingo_entries()) {
    iter = new Bingo_Tile_Iterator(get_bingo_entries());
  } else {
    iter = new Bingo_Tile_Iterator(all_default_answers);
  }
  var next_answer;
  for (var i=0; i < board_height; i++) {
    for (var j=0; j < board_width; j++) {
      var tile_name = get_tile_name(i, j);
      if (has_free_space == "true") {
        if (i == Math.floor(board_height / 2) && j ==  Math.floor(board_width / 2)) {
          set_bingo_tile(tile_name, free_tile);
        } else {
          if (iter.has_next()) {
            next_answer = iter.next();
            set_bingo_tile(tile_name, next_answer);
          } else {
            alert("Error: not enough words in the word bank");
          }
        }
      } else {
        if (iter.has_next()) {
          next_answer = iter.next();
          set_bingo_tile(tile_name, next_answer);
        } else {
          alert("Error: not enough words in the word bank");
        }
      }
    }
  }
}

function set_bingo_tile(tile_name, next_answer) {
  var answer_words = next_answer.split(" ");
  for (var k = 0; k < answer_words.length; k++) {
    if (answer_words[k].length > 10) {
      document.getElementById(tile_name).getElementsByTagName("span")[0].className += "small_font";
      k = answer_words.length;
    }
  }
  document.getElementById(tile_name).getElementsByTagName("span")[0].innerHTML = "<br>" + next_answer;
}

function remove_brs() {
  for (var i=0; i < board_height; i++) {
    for (var j=0; j < board_width; j++) {
      var tile_name = get_tile_name(i, j);
      var initial_html = document.getElementById(tile_name).getElementsByTagName("span")[0].innerHTML;
      document.getElementById(tile_name).getElementsByTagName("span")[0].innerHTML = initial_html.subsring(4);
    }
  }
}

class Bingo_Tile_Iterator {
  constructor(words_list) {  // Constructor
    this.words_list = words_list;
    this.words_list.sort(function(a, b){return 0.5 - Math.random()}); //randomizes the order
  }

  has_next() {
    return this.words_list.length > 0;
  }

  next() {
    return this.words_list.pop();
  }
}

var clicked_false_color = "white";
var clicked_true_color = "black";

function clicked(click_id) {
  var cur_element = document.getElementById(click_id);
  if (cur_element.dataset.is_clicked == "true") {
    // cur_element.className = "bingo_tile";
    cur_element.dataset.is_clicked = "false";
    cur_element.style.backgroundColor = clicked_false_color;
  } else {
    // cur_element.className += " clicked_tile";
    cur_element.style.backgroundColor = clicked_true_color;
    cur_element.dataset.is_clicked = "true";
    check_for_bingo(click_id);
  }
}

function check_for_bingo(click_id) {
  var coords = get_tile_coords(click_id);
  var row = coords[0], col = coords[1];

  var found_not_clicked_tile = false;
  //check row
  for (var i = 0; i < board_width; i++) {
    if (!found_not_clicked_tile) {
      if (document.getElementById(get_tile_name(row, i)).dataset.is_clicked == "false") {
        found_not_clicked_tile = true;
      }
    }
  }

  if (!found_not_clicked_tile) {
    alert("Congratulations, you just completed a BINGO!");
  } else {
    found_not_clicked_tile = false;
    //check row
    for (var i = 0; i < board_height; i++) {
      if (!found_not_clicked_tile) {
        if (document.getElementById(get_tile_name(i, col)).dataset.is_clicked == "false") {
          found_not_clicked_tile = true;
        }
      }
    }

    if (!found_not_clicked_tile) {
      alert("Congratulations, you just completed a BINGO!");
    } else {
      //check to see if we should check the diagonals

      //first, the top left -> bottom right diagonal
      if (row == col) {
        found_not_clicked_tile = false;

        for (var i = 0; i < board_width; i++) {
          if (!found_not_clicked_tile) {
            if (document.getElementById(get_tile_name(i, i)).dataset.is_clicked == "false") {
              found_not_clicked_tile = true;
            }
          }
        }

        if (!found_not_clicked_tile) {
          alert("Congratulations, you just completed a BINGO!");
          return;
        }
      }

      if (row == board_width - 1 - col) {
        found_not_clicked_tile = false;
        for (var i = 0; i < board_width; i++) {
          if (!found_not_clicked_tile) {
            if (document.getElementById(get_tile_name(i, board_width - 1 - i)).dataset.is_clicked == "false") {
              found_not_clicked_tile = true;
            }
          }
        }

        if (!found_not_clicked_tile) {
          alert("Congratulations, you just completed a BINGO!");
        }
      }
    }
  }
}

function submit_bingo_entry() {
  var header_to_check = document.getElementById("game_title").value;
  var is_word = check_is_valid_text(header_to_check);
  if (is_word) {
    var answers_to_check = document.getElementById("answers").value.split("\n");
    var answers_to_url = "";

    if (answers_to_check.length < board_width * board_height) {
      alert("Error: You don't have enough answers to fill the board. Please add more answers.");
      return;
    }

    for (var i = 0; i < answers_to_check.length; i++) {
      if (check_is_valid_text(answers_to_check[i])) {
        // alert("answer number " + i + ": " + answers_to_check[i]);
        if (answers_to_url == "") {
          answers_to_url += answers_to_check[i];
        } else {
          answers_to_url += answer_delim + answers_to_check[i];
        }
      } else {
        alert("Error: one of your answers was invalid. Try to remove any empty lines and unusual characters.")
        return;
      }
    }
    // alert("answers_to_url " + answers_to_url);

    if (test_bingo_board()) {
      var url_start = get_url_start();
      var new_url = url_start + "bingo.html" + url_delim + header_to_check + url_delim + answers_to_url;

      var word_color = document.getElementById("word_color").value;
      new_url += url_delim + word_color;

      var clicked_color = document.getElementById("clicked_color").value;
      clicked_color = clicked_color=="" ? "#000000" : clicked_color;
      new_url += url_delim + clicked_color;

      var background_dir = document.getElementById("background_dir").value;
      new_url += url_delim + background_dir;

      var background_start = document.getElementById("background_start").value;
      background_start = background_start=="" ? "#3BA4C6" : background_start;
      new_url += url_delim + background_start;

      var background_end = document.getElementById("background_end").value;
      background_end = background_end=="" ? "#9DB8F0" : background_end;
      new_url += url_delim + background_end;

      var free_space = document.getElementById("has_free_space").checked;
      new_url += url_delim + free_space;

      window.location.href = new_url;
      return;
    } else{
      return;
    }
  } else {
    alert("Error: Game title '" + header_to_check + "' is invalid");
  }
}

function get_url_start() {
  return window.location.href.split("bingo_builder.html")[0];
}

function test_bingo_board() {

  //word color (including title)
  var word_color = document.getElementById("word_color").value;
  if (check_is_valid_color(word_color) || word_color == "") {
    // alert("valid color: " + word_color);
    document.getElementById("example_header").style.color = word_color;
    for (var i=0; i < board_height; i++) {
      for (var j=0; j < board_width; j++) {
        var tile_name = get_tile_name(i, j);
        document.getElementById(tile_name).style.color = word_color;
        document.getElementById(tile_name).style.outlineColor = word_color;
      }
    }
  } else {
    alert("INVALID color: " + word_color);
    return false;
  }

  //click background color
  var clicked_color = document.getElementById("clicked_color").value;
  if (check_is_valid_color(clicked_color) || clicked_color == "") {
    clicked_true_color = clicked_color=="" ? "black" : clicked_color;

    for (var i=0; i < board_height; i++) {
      for (var j=0; j < board_width; j++) {
        var tile_name = get_tile_name(i, j);
        if (document.getElementById(tile_name).dataset.is_clicked == "false") {
          document.getElementById(tile_name).style.backgroundColor = clicked_false_color;
        } else {
          document.getElementById(tile_name).style.backgroundColor = clicked_true_color;
        }
      }
    }

  } else {
    alert("INVALID color: " + clicked_color);
    return false;
  }

  //background fade start
  var background_start = document.getElementById("background_start").value;
  if (check_is_valid_color(background_start) || background_start == "") {
    background_start = background_start=="" ? "#3BA4C6" : background_start;
  } else {
    alert("INVALID color: " + background_start);
    return false;
  }

  //background fade end
  var background_end = document.getElementById("background_end").value;
  if (check_is_valid_color(background_end) || background_end == "") {
    background_end = background_end=="" ? "#9DB8F0" : background_end;
  } else {
    alert("INVALID color: " + background_end);
    return false;
  }

  //background fade direction
  var background_dir = document.getElementById("background_dir").value;
  document.getElementById("bingo_example").style.backgroundImage = "linear-gradient(to " + background_dir + ", " + background_start + ", " + background_end + ")";

  //has free space
  var free_space = document.getElementById("has_free_space").checked;
  if (check_is_valid_bool(free_space)) {
    var tile_name = get_tile_name(Math.floor(board_height / 2), Math.floor(board_width / 2));
    if (free_space) {
      document.getElementById(tile_name).innerHTML = free_tile;
    } else {
      document.getElementById(tile_name).innerHTML = blank_tile;
    }

  } else {
    alert("INVALID boolean: " + free_space);
    return false;
  }

  return true;
}
