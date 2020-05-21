var NUM_LETTERS: number = 7, EMPTY_STRING: string = "-", URL_DELIM = "#";
var score: number = 0, cur_word = ""; //TODO: add cookies that store scores for letter configs
var all_letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var cur_outside_letters: string[], cur_center_letter: string, next_letter: string, cur_letter: string, cur_element_id: string;
var english_words, words_found: string[] = [], point_value: number;

window.addEventListener('keydown', function(e) { key_press(e); });

function key_press(e) {
  // console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // console.log(String.fromCharCode(e.keyCode));
    cur_letter = String.fromCharCode(e.keyCode);
    if (cur_letter == cur_center_letter) {
      add_letter("hex7");
    } else {
      for (var i = 0; i < cur_outside_letters.length; i++) {
        cur_element_id = "hex" + (i + 1);
        if (document.getElementById(cur_element_id).innerHTML == cur_letter) {
          add_letter(cur_element_id);
        }
      }
    }
  } else if (e.keyCode == 13) { //enter button
    enter_word();
  }
}

function initialize_dictionary() {
  let requestURL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
     english_words = request.response;
  }
}

function build_letters() {
  //set cur_word to empty string
  update_cur_word(EMPTY_STRING);
  update_found_words();
  update_score();

  //check to see if letters were in the url
  if (window.location.href.includes(URL_DELIM)) {
    //if they are, use those letters
    var letters = window.location.href.split(URL_DELIM)[1];
    if (letters.length == NUM_LETTERS) {
      cur_outside_letters = letters.toUpperCase().substring(0, letters.length - 1).split("");
      cur_center_letter = letters.toUpperCase().charAt(letters.length - 1);
      set_letters(cur_outside_letters, cur_center_letter);
    } else {
      alert("Invalid letter configuration");
      set_cur_letters_randomly(); //sets the letters
    }
  } else {
    //else, start with empty string, then populate on "random letters" button click
    set_cur_letters_randomly(); //sets the letters
  }

}

function set_cur_letters_randomly() {
  cur_outside_letters = [];
  for (var i = 0; i < NUM_LETTERS - 1; i++) {
    next_letter = all_letters[Math.floor(Math.random() * all_letters.length)];
    while (cur_outside_letters.includes(next_letter)) {
      next_letter = all_letters[Math.floor(Math.random() * all_letters.length)];
    }
    cur_outside_letters.push(next_letter);
  }
  while (cur_outside_letters.includes(next_letter)) {
    next_letter = all_letters[Math.floor(Math.random() * all_letters.length)];
  }
  cur_center_letter = next_letter;

  set_letters(cur_outside_letters, cur_center_letter);
}

function set_letters(outside_letters: string[], center_letter: string, randomize: boolean=false) {
  if (outside_letters.length != NUM_LETTERS - 1) {
    throw new Error("invalid number of letters passed in to set_letters");
  }

  if (randomize) {
    shuffleArray(outside_letters); //in place shuffling
  }

  for (var i = 0; i < NUM_LETTERS; i++) {
    var cur_hex = document.getElementById("hex" + (i + 1));
    if (i == NUM_LETTERS - 1) {
      cur_hex.innerHTML = center_letter;
    } else {
      cur_hex.innerHTML = outside_letters[i];
    }
  }
}

function update_score() {
  document.getElementById("progress_bar").innerHTML = "Score: " + score;
}

function update_found_words() {
  document.getElementById("word_tally").innerHTML = get_tally_text();
}

function get_tally_text() {
  if (words_found.length == 1) {
    return "You have found 1 word";
  } else {
    return "You have found " + words_found.length + " words";
  }
}

function update_cur_word(new_word=cur_word) {
  cur_word = new_word;
  document.getElementById("letters_entered").innerHTML = new_word;
}

function add_letter(element_id) {
  if (cur_word == EMPTY_STRING) {
    cur_word = document.getElementById(element_id).innerHTML
  } else {
    cur_word += document.getElementById(element_id).innerHTML;
  }
  update_cur_word()
}

function clear_word() {
  update_cur_word(EMPTY_STRING)
}

function delete_letter() {
  if (cur_word == EMPTY_STRING) {
    //do nothing
  } else if (cur_word.length == 1) {
    cur_word = EMPTY_STRING;
  } else {
    cur_word = cur_word.substring(0, cur_word.length - 1);
  }
  update_cur_word()
}

function scramble_letters() {
  set_letters(cur_outside_letters, cur_center_letter, true);
}

function new_letters() {
  set_cur_letters_randomly();
  clear_words_found();
  score = 0;
  update_cur_word(EMPTY_STRING);
}

function clear_words_found() {
  words_found = [];
  document.getElementById("found_words").innerHTML = "";
  update_found_words();
}

function enter_word() {
  //check to make sure it's worth looking up
  if (cur_word.length < 4) {
    window.alert("Too Short!");
  } else if (words_found.includes(cur_word)) {
    window.alert("You Already Found That!");
  } else if (!cur_word.includes(cur_center_letter)) {
    window.alert("You Must Include The Center Letter!");
  }

  else {
    if (english_words[cur_word.toLowerCase()]) {
      point_value = get_point_value(cur_word);
      window.alert(cur_word + " is a valid word, and is worth " + point_value + " points");
      score += point_value;
      found_word(cur_word);
    } else {
      window.alert(cur_word + " is an invalid word");
    }
  }

  update_cur_word(EMPTY_STRING);
}

function get_point_value(word): number {
  if (word.length == 4) {
    return 1;
  } else if (new Set(word.split("")).size == 7) {
    return word.length + 7;
  } else {
    return word.length;
  }
}

function found_word(new_word) {
  words_found.push(new_word);
  document.getElementById("found_words").innerHTML += "<br>" + new_word;
  update_found_words();
  update_score();
}

function use_letters() {
  var next_letters: string = (<HTMLInputElement> document.getElementById("letters_to_use")).value.trim();
  if (new Set(next_letters).size != NUM_LETTERS || next_letters.length != NUM_LETTERS) {
    window.alert("Invalid number of letters. Please enter seven unique letters.");
  } else {
    if (window.location.href.includes(URL_DELIM)) {
      window.location.assign(window.location.href.split(URL_DELIM)[0] + "#" + next_letters);
    } else {
      window.location.assign(window.location.href + "#" + next_letters);
    }
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
//taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
