var board_height=5, board_width=5, blank_tile="__";
var all_answers = ["Harness Peer Pressure", "Social Motivation", "Social Ability", "Willingly Change", "Personal Motivation", "Sense of Values", "Personal Ability", "Structural Motivation", "Structural Ability", "Opinion Leaders", "Foster Teamwork", "Strategies", "Modest rewards", "Control Emotions", "ID Vital Behaviors", "200% Accountability", "Open Communication", "Confront Problems", "Responsibility for others", "Speak up",  "Praise vs. Punishment", "Teach and Question", "Go to Gemba", "Make Undesirable Desirable", "Surpass Your Limits", "Reward Behaviors not Outcomes", "Change the Environment", "Intrinsic Satisfaction / Motivation", "Develop Mini-Goals", "Deliberate Practice", "Public Discourse", "Power of Propinquity"]

function get_tile_name(i, j) {
  return "tile" + String.fromCharCode(65+j)+eval(i+1);
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
            document.getElementById(tile_name).getElementsByTagName("span")[0].style.fontSize = "0.9em";
            k = answer_words.length;
          }
        }
        document.getElementById(tile_name).getElementsByTagName("span")[0].innerHTML = next_answer;
      } else {
        alert("Error: not enough words in the word bank");
      }
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
  }
}
