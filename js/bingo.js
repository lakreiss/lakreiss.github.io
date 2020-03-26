var board_height=5, board_width=5, blank_tile="__";
var all_answers = ["Harness Peer Pressure", "Social Motivation", "Social Ability", "Willingly Change", "Personal Motivation", "Sense of Values", "Personal Ability", "Structural Motivation", "Structural Ability", "Opinion Leaders", "Foster Teamwork", "Strategies", "Modest rewards", "Control Emotions", "ID Vital Behaviors", "200% Accountability", "Open Communication", "Confront Problems", "Responsibility for others", "Speak up",  "Praise vs. Punishment", "Teach and Question", "Go to Gemba", "Make Undesirable Desirable", "Surpass Your Limits", "Reward Behaviors not Outcomes", "Change the Environment", "Intrinsic Satisfaction / Motivation", "Develop Mini-Goals", "Deliberate Practice", "Public Discourse", "Power of Propinquity"]

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

function set_bingo_tiles() {
  var iter = new Bingo_Tile_Iterator(all_answers);
  var next_answer, answer_words;
  for (var i=0; i < board_height; i++) {
    for (var j=0; j < board_width; j++) {
      var tile_name = get_tile_name(i, j);
      if (iter.has_next()) {
        next_answer = iter.next();
        // alert(next_answer.split(" "));
        answer_words = next_answer.split(" ");
        for (var k = 0; k < answer_words.length; k++) {
          if (answer_words[k].length > 10) {
            document.getElementById(tile_name).getElementsByTagName("span")[0].className += "small_font";
            k = answer_words.length;
          }
        }
        document.getElementById(tile_name).getElementsByTagName("span")[0].innerHTML = "<br>" + next_answer;
      } else {
        alert("Error: not enough words in the word bank");
      }
    }
  }
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

function clicked(click_id) {
  var cur_element = document.getElementById(click_id);
  if (cur_element.dataset.is_clicked == "true") {
    cur_element.className = "bingo_tile";
    cur_element.dataset.is_clicked = "false";
  } else {
    cur_element.className += " clicked_tile";
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
