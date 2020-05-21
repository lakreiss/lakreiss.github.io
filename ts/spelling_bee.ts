var NUM_LETTERS: number = 7, EMPTY_STRING: string = "-", URL_DELIM: string = "#", NUM_WORDS_FOUND_COLS: number = 3;
var score: number = 0, cur_word = ""; //TODO: add cookies that store scores for letter configs
var all_letters: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var cur_outside_letters: string[], cur_center_letter: string, next_letter: string, cur_letter: string, cur_element_id: string;
var english_words, words_found: string[] = [], all_words: string[] = [], point_value: number;
var max_score: number = 0, answers_displayed: boolean = false; //temp value

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
  } else if (e.keyCode == 8) { //backspace
    delete_letter();
  }
}

function initialize_dictionary() {
  //get json file from github with word list
  // let requestURL = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json';
  let requestURL = '../files/english_dictionary.json';
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function() {
    console.log("dictionary has loaded");
     english_words = request.response;
     find_solutions();
  }
}

function find_solutions() {
  console.log("searching for solutions");

  //find all solutions to the letters, store them in hidden element
  var real_letter_set = new Set(cur_outside_letters.map(v => v.toLowerCase()));
  var cur_center_letter_lower_case = cur_center_letter.toLowerCase();
  real_letter_set.add(cur_center_letter_lower_case);

  var word: string;
  Object.keys(english_words).forEach(function(word) {
    if (word.length > 3 && real_letter_set.has(word.charAt(0))) { //optimization
      if (word.includes(cur_center_letter_lower_case) && isSuperset(real_letter_set, word)) {
        console.log("found solution:", word);
        add_word_to_all_words(word);
        max_score += get_point_value(word);
      }
    }
  });
  update_score()
}

function isSuperset(set, word) {
  for (var i = 0; i < word.length; i++) {
    // console.log(word.charAt(i));
    if (!(set.has(word.charAt(i)))) {
      // console.log("not in " + set);
      return false;
    }
    // console.log("in " + set);

  }
  return true;
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
      cur_outside_letters = letters.toUpperCase().substring(1, letters.length).split("");
      cur_center_letter = letters.toUpperCase().charAt(0);
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
  var score_category;
  if (score < max_score * 0.03) {
    score_category = "Beginner";
  } else if (score < max_score * 0.07) {
    score_category = "Good Start";
  } else if (score < max_score * 0.11) {
    score_category = "Moving Up";
  } else if (score < max_score * 0.20) {
    score_category = "Good";
  } else if (score < max_score * 0.34) {
    score_category = "Solid";
  } else if (score < max_score * 0.54) {
    score_category = "Nice";
  } else if (score < max_score * 0.67) {
    score_category = "Great";
  } else if (score < max_score * 0.94) {
    score_category = "Amazing";
  } else {
    score_category = "Genius";
  }

  document.getElementById("progress_bar").innerHTML = "Score: " + score;
  document.getElementById("score_category").innerHTML = score_category;
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
  update_score();
  update_cur_word(EMPTY_STRING);
  clear_all_words();
  find_solutions();
}

function clear_words_found() {
  words_found = [];
  for (var i = 0; i < NUM_WORDS_FOUND_COLS; i++) {
    document.getElementById("found_words_col" + i).innerHTML = "";
  }
  update_found_words();
}

function clear_all_words() {
  all_words = [];
  for (var i = 0; i < NUM_WORDS_FOUND_COLS; i++) {
    document.getElementById("all_words_col" + i).innerHTML = "";
  }
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
    if (english_words == null) {
      alert("website is still loading, wait a few seconds and try again");
    } else if (english_words[cur_word.toLowerCase()]) {
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

  document.getElementById("found_words_col" + ((words_found.length + 2) % NUM_WORDS_FOUND_COLS)).innerHTML += "<br>" + new_word;
  update_found_words();
  update_score();
}

function add_word_to_all_words(new_word) {
  all_words.push(new_word);
  document.getElementById("all_words_col" + ((all_words.length + 2) % NUM_WORDS_FOUND_COLS)).innerHTML += "<br>" + new_word;
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

function display_all_answers() {
  if (answers_displayed) {
    //hide answers
    document.getElementById("all_words_container").setAttribute("hidden", "true");
    document.getElementById("solve_button").innerHTML = "SOLVE";

    answers_displayed = false;
  } else {
    //display answers
    document.getElementById("all_words_container").removeAttribute("hidden");
    document.getElementById("solve_button").innerHTML = "HIDE";

    answers_displayed = true;
  }
}

function change_hex_sizes() {
  for (var i = 0; i < NUM_LETTERS; i++) {
    var hex_id = "hex" + (i + 1);
    var cur_element = document.getElementById(hex_id);
    cur_element.classList.toggle("hb-sm");
    if (i == 0) {
      cur_element.style.marginTop = "70px";
      cur_element.style.marginLeft = "-65px";
    } else if (i == 1) {
      cur_element.style.marginTop = "70px";
      cur_element.style.marginLeft = "5px";
    } else if (i == 2) {
      cur_element.style.marginTop = "130px";
      cur_element.style.marginLeft = "-100px";
    } else if (i == 3) {
      cur_element.style.marginTop = "130px";
      cur_element.style.marginLeft = "40px";
    } else if (i == 4) {
      cur_element.style.marginTop = "190px";
      cur_element.style.marginLeft = "-65px";
    } else if (i == 5) {
      cur_element.style.marginTop = "190px";
      cur_element.style.marginLeft = "5px";
    } else if (i == 6) {
      cur_element.style.marginTop = "130px";
      cur_element.style.marginLeft = "-30px";
    }
  }

  //reformat so everything fits
  (<HTMLElement> document.getElementsByClassName("right_side")[0]).style.width = "48%";
  (<HTMLElement> document.getElementsByClassName("left_side")[0]).style.width = "48%";

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


//TODO LIST:
/*
-alphabetize words found
-make correct popup disappear automatically (maybe for all popups)
-make the all_word cols disappear when new_letters is clicked
-show % of words found (optional for user)

*/
