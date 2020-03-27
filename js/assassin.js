function check_is_valid_text(input) {
  var regex = new RegExp(/^[-0-9a-z/,'"%. ]+$/i, ); //takes letters and numbers, as well as a slash, comma, or space
  return regex.test(input);
}

function create_assassin_game() {
  var assassin_players = document.getElementById("assassin_players").value.split("\n");

  // if (check_is_valid_text(assassin_players)) {

  var options = ["one", "two", "three", "four"];
  var index = 0;
  var cur_num_targets = document.getElementById(options[index] + "_target");
  while (!cur_num_targets.checked) {
    index += 1;
    cur_num_targets = document.getElementById(options[index] + "_targets");
  }
  var num_targets = cur_num_targets.value;
  if (assassin_players.length <= num_targets) {
    alert("Error: you haven't entered enough names! Make sure each line has a new player on it.");
  } else {
    for (var i = 0; i < assassin_players.length; i++) {
      if (!check_is_valid_text(assassin_players[i])) {
        alert("Error: you entered an invalid name. Make sure that all empty lines are deleted.");
        return;
      }
    }
    //passed all the checks, now we run the algorithm and post it
  }
}
