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
    document.getElementById("player_target_output").innerHTML = get_assassin_targets_as_string(assassin_players, num_targets);
    document.getElementById("player_target_output").removeAttribute("hidden");
  }
}

function target_mapping_to_string(target_mapping) {
  var to_return = "";
  for (var i = 0; i < Object.keys(target_mapping).length; i++) {
    var cur_player = Object.keys(target_mapping)[i];
    to_return += cur_player;
    to_return += " -> ";
    for (var j = 0; j < target_mapping[cur_player].length; j++) {
      if (j == 0) {
        to_return += target_mapping[cur_player][j];
      } else {
        to_return += ", " + target_mapping[cur_player][j];
      }
    }
    to_return += "<br>";
  }
  return to_return;
}

function remove_duplicates(array) {
  var unique = {};
  array.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

function get_assassin_targets_as_string(assassin_players, num_targets) {
  // return "target 1";

  var random_ordered_players = assassin_players.sort(function(a, b){return 0.5 - Math.random()});
  var final_players = remove_duplicates(random_ordered_players);
  var num_players = final_players.length;

  var target_mapping = [];
  for (var i = 0; i < num_players - 1; i++) {
    if (!target_mapping[final_players[i]]) {
      target_mapping[final_players[i]] = [final_players[i+1]];
    }
  }
  target_mapping[final_players[num_players - 1]] = [final_players[0]];

  while (num_targets > 1) {
    for (var i = 0; i < num_players; i++) {
      var cur_player = final_players[i];
      var cur_targets = target_mapping[cur_player];
      var last_target = cur_targets[cur_targets.length - 1];
      var last_targets_target = target_mapping[last_target][0];
      cur_targets.push(last_targets_target);
    }
    num_targets -= 1;
  }

  // alert(target_mapping_to_string(target_mapping));
  return target_mapping_to_string(target_mapping);


  // for (){}

    //
    // $cur_index = rand(0, count($new_arr) - 1);
    // $first_person = $new_arr[$cur_index];
    // $orig_person = $first_person;
    // unset($new_arr[$cur_index]);
    // $new_arr = array_values($new_arr);
    // while (count($new_arr) > 0) {
    //   $cur_index = rand(0, count($new_arr) - 1);
    //   $next_person = $new_arr[$cur_index];
    //   unset($new_arr[$cur_index]);
    //   $new_arr = array_values($new_arr);
    //
    //   $players[$first_person] = array($next_person);
    //
    //   $first_person = $next_person;
    // }
    // $players[$next_person] = array($orig_person);
    //
    // $inputNumTargets -= 1;
    //
    // $counter = 0;
    // while ($inputNumTargets > 0) {
    //   foreach ($players as $player => $targets) {
    //     $last_target = $targets[$counter];
    //     $next_target = $players[$last_target][0];
    //     array_push($players[$player], $next_target);
    //   }
    //   $counter += 1;
    //   $inputNumTargets -= 1;
    // }
    // return $players;

}
