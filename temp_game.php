<?php
session_start();

function clean_user_input($input) {
  $input = str_replace("\"", "quote", $input);
  $input = str_replace('\'', "quote", $input);
  $input = str_replace("\\", "backslash", $input);
  $input = str_replace(";", "semicolon", $input);
  $input = str_replace("%", "percent", $input);
  $input = str_replace("#", "hashtag", $input);
  $input = str_replace("&", "amp", $input);
  $input = trim($input);
  return $input;
}

function toString($players) {
  $toReturn = "";
  foreach ($players as $player => $targets) {
    $toReturn .= "$player targeting... <br>";
    foreach ($targets as $target) {
      if ($target == $targets[0]) {
        $toReturn .= "$target";
      } else {
        $toReturn .= ", $target";
      }
    }
    $toReturn .= "<br>";
  }
  return $toReturn;
}

function print_targets($players) {
  foreach ($players as $player => $targets) {
    echo "$player targeting... <br>";
    foreach ($targets as $target) {
      echo "$target<br>";
    }
    echo "<br>";
  }
}

function get_player_targets($inputPlayers, $inputNumTargets) {
  #checks for empty input
  if ($inputPlayers == "") {
    header('Location: index.html#failed_game_creation_empty_text');
  } else {
    $player_arr = explode(",", $inputPlayers);

    // for ($x = 0; $x < count($player_arr); $x++) {
    //   echo "name number [$x] is: $player_arr[$x] <br>";
    // }

    #check for more than one player
    if (!is_array($player_arr)) {
      header('Location: index.html#failed_game_creation_insufficient_number_of_players');
    }

    #check for illegal_target_number
    if (count($player_arr) <= $inputNumTargets) {
      header('Location: index.html#failed_game_creation_illegal_target_number');
    }

    #check for duplicates and get rid of whitespace
    $new_arr = array(trim($player_arr[0]));
    for ($x = 1; $x < count($player_arr); $x++) {
      $cur_val = trim($player_arr[$x]);
      if (in_array($cur_val, $new_arr)) {
        header('Location: index.html#failed_game_creation_duplicate_names');
      } else {
        array_push($new_arr, $cur_val);
      }
    }

    $players = array();
    $cur_index = rand(0, count($new_arr) - 1);
    $first_person = $new_arr[$cur_index];
    $orig_person = $first_person;
    unset($new_arr[$cur_index]);
    $new_arr = array_values($new_arr);
    while (count($new_arr) > 0) {
      $cur_index = rand(0, count($new_arr) - 1);
      $next_person = $new_arr[$cur_index];
      unset($new_arr[$cur_index]);
      $new_arr = array_values($new_arr);

      $players[$first_person] = array($next_person);

      $first_person = $next_person;
    }
    $players[$next_person] = array($orig_person);

    $inputNumTargets -= 1;

    $counter = 0;
    while ($inputNumTargets > 0) {
      foreach ($players as $player => $targets) {
        $last_target = $targets[$counter];
        $next_target = $players[$last_target][0];
        array_push($players[$player], $next_target);
      }
      $counter += 1;
      $inputNumTargets -= 1;
    }
    return $players;
  }
}

function get_num_players($inputPlayers) {
  return count(explode(",", $inputPlayers));
}

$inputPlayers = clean_user_input($_POST["players"]);
$inputNumTargets = (int) clean_user_input($_POST["num_targets"]);

$players = get_player_targets($inputPlayers, $inputNumTargets);
$num_players = get_num_players($inputPlayers);
// $_SESSION["player_data"] = $players;

// echo json_encode($players);

// print_targets($players);

?>

<!-- This is a comment -->
<html class="no-js" lang="en-US">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head>
      <link rel="stylesheet" href="style.css">
      <h1>TEMP GAME</h1>
    </head>

    <body>
      <nav id="nav_bar">
        <div class="return_to_login">
          <a href="/index.html">Return to Login</a>
        </div>

        <div class="my_page_home_button">
          <a href="https://lakreiss.github.io">Built by Liam Kreiss</a>
        </div>
      </nav>

      <h1 style="color:blue">Assassin</h1>

<!-- TODO add "generate new cycle" option -->

      <div>
        <p><?php print_targets($players);?></p>
      </div>

      <form action="build_temp_game_pdf.php" method="post">
        <input type='hidden' name='players_with_targets' value='<?php echo toString($players);?>'/>
        <input type='hidden' name='num_players' value='<?php echo $num_players;?>'/>
        <input type='hidden' name='num_targets' value='<?php echo $inputNumTargets;?>'/>
        <input type="submit" value="Build PDF with Targets"></input>
      </form>



      <form action="temp_game.php" method="post">
        <input type='hidden' name='players' value='<?php echo $inputPlayers;?>'/>
        <input type='hidden' name='num_targets' value='<?php echo $inputNumTargets;?>'/>
        <input type="submit" value="Generate a New Cycle"></input>
      </form>

    </body>
</html>
