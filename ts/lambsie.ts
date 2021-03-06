var lambsie_rows: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var card_game_rows: string[] = ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5', 'Round 6', 'Round 7', 'Round 8', 'Round 9', 'Round 10'];
var cur_game_rows;
var cur_turn: number = 0;
var cur_row: any = 0; //annoying thing typescript made me do since i use the same variable name in a different file
var num_players = 4; //starting value
var player_names = [];
var player_scores = [];
var is_lambsie = false;

function build_scorecard(is_lambsie_input) {
    is_lambsie = is_lambsie_input;
    if (is_lambsie) {
        cur_game_rows = lambsie_rows;
    } else {
        cur_game_rows = card_game_rows;
    }

    document.write("<form id='lambsie_scoreboard_form'>")
    //create edit, save, and cancel buttons
    document.write("<button type='button' id='play_lambsie_again_button' class='lambsie_button' onclick='play_lambsie_again();' hidden>Play Again</button>");
    document.write("<button type='button' id='save_button' class='lambsie_button' onclick='save();' hidden>Save</button>");
    document.write("<button type='button' id='edit_button' class='lambsie_button' onclick='edit_last_row();' hidden>Edit</button>");
    document.write("<button type='button' id='start_button' class='lambsie_button' onclick='start_game();'>Start Game</button>");
    document.write("<button type='button' id='cancel_button' class='lambsie_button' hidden>Cancel</button>");
    document.write("<button type='button' id='add_column_button' class='lambsie_button' onclick='add_column();'>Add Column</button>");
    document.write("<button type='button' id='remove_column_button' class='lambsie_button' onclick='remove_column();'>Remove Column</button>");
    document.write("<table id='lambsie_table'>");

    //create the player row
    document.write('<tr><th>Players</th>');
    for (var i = 0; i < num_players; i++) {
        document.write('<td><input class="player_name_input" type="text" id="player_' + i + '_name_input" size="8" placeholder="Name"></input><span id="player_' + i + '_name" hidden></span></td>');
    }
    document.write('</tr>');

    // create the number rows
    for (var i = 0; i < cur_game_rows.length; i++) {
        add_a_row(i, cur_game_rows);
    }

    //create the score total row
    document.write('<tr><th>Total:</th>');
    for (var i = 0; i < num_players; i++) {
        document.write('<td><span class="player_total_score">0</span></td>')
    }
    document.write('</tr>');
    
    document.write("</table>");
    document.write("</form>")

    if (!is_lambsie) {
        document.write("<button type='button' id='restart_game_button' class='lambsie_button' onclick='play_lambsie_again();' hidden>Restart Game</button>");
    }
}

function add_a_row(i, row_list) {
    if (i >= row_list.length) {
        row_list.push("Round " + (i + 1));
    }
    var html_type = is_a_double_point_row(i) ? "th" : "td";
    var tableRef = document.getElementById('lambsie_table').getElementsByTagName('tbody')[0];
    var new_row = document.createElement("tr");
    var new_row_heading = document.createElement(html_type);
    new_row_heading.innerHTML = row_list[i];
    new_row.appendChild(new_row_heading);

    for (var j = 0; j < num_players; j++) {
        var new_row_col = document.createElement('td');
        var new_input = document.createElement('input');
        new_input.type = "number";
        new_input.classList.add('player_score_input_' + i);
        new_input.id = 'player_' + j + '_score_input_' + i;
        // new_input.size = "6px";
        new_input.placeholder = "Score";
        new_input.hidden = true;
        var new_span = document.createElement('span');
        new_span.id = 'player_' + j + '_score_' + i;
        new_span.hidden = true;
        new_row_col.appendChild(new_input);
        new_row_col.appendChild(new_span);
        new_row.appendChild(new_row_col);
    }
    tableRef.appendChild(new_row);
}

function is_a_double_point_row(row) {
    if (is_lambsie) {
        return (row % 3 == 0)
    } else {
        return false;
    }
}

function add_column() {
    var table_rows = document.getElementById("lambsie_table").getElementsByTagName("tr");
    var new_table_square;
    var player_num = num_players; //this works because it's zero indexed
    for (var i = 0; i < table_rows.length; i++) {
        new_table_square = document.createElement("td");
        if (i == 0) { //player name
            new_table_square.innerHTML = '<input type="text" class="player_name_input" id="player_' + player_num + '_name_input" size="8" placeholder="Name"></input><span id="player_' + player_num + '_name" hidden></span>';
        } else if (i == 1 + cur_game_rows.length) { //total
            new_table_square.innerHTML = '<span class="player_total_score">0</span>';
        } else {
            new_table_square.innerHTML = '<input type="number" class="player_score_input_' + (i - 1) + '" id="player_' + player_num + '_score_input_' + (i - 1) + '" size="6px" placeholder="Score" hidden></input><span id="player_' + player_num + '_score_' + (i - 1) + '" hidden></span>';
        }
        table_rows[i].appendChild(new_table_square);
    }
    num_players += 1;
}

function remove_column(full_clear=false) {
    if (num_players > 1 || (full_clear && num_players > 0)) {
        var table_rows = document.getElementById("lambsie_table").getElementsByTagName("tr");
        for (var i = 0; i < table_rows.length; i++) {
            var row = table_rows[i];
            row.removeChild(row.childNodes[row.childNodes.length-1]);
        }
        num_players -= 1;
    }
}

function start_game() {
    //change the available buttons
    document.getElementById('start_button').setAttribute('hidden', 'true');
    document.getElementById('add_column_button').setAttribute('hidden', 'true');
    document.getElementById('remove_column_button').setAttribute('hidden', 'true');
    document.getElementById('save_button').removeAttribute('hidden');
    document.getElementById('edit_button').removeAttribute('hidden');
    if (!is_lambsie) {
        document.getElementById('restart_game_button').removeAttribute('hidden');
    }

    //set the names
    var all_name_inputs = document.getElementsByClassName('player_name_input');
    for (var i = 0; i < all_name_inputs.length; i++) {
        var cur_name_input = <HTMLInputElement> all_name_inputs[i];
        var name = cur_name_input.value;
        if (name.trim() == "") {
            name = "Player " + (i + 1);
        }
        var player_name_element = document.getElementById('player_' + i + '_name');
        player_name_element.innerHTML = name;
        player_name_element.removeAttribute('hidden');
        cur_name_input.setAttribute('hidden', 'true');

        //update player_names and player_scores
        player_names.push(name);
        player_scores.push([]);
    }

    //open up the forms for the Ace row
    open_form_for(cur_row);
}

function open_form_for(card_value) {
    for (var i = 0; i < num_players; i++) {
        document.getElementById('player_' + i + '_score_input_' + card_value).removeAttribute('hidden');
    }
}

function save() {
    //set the scores
    var all_score_inputs = document.getElementsByClassName('player_score_input_' + cur_row);
    for (var i = 0; i < all_score_inputs.length; i++) {
        var cur_score_input = <HTMLInputElement> all_score_inputs[i];
        var score = cur_score_input.value;
        if (score.trim() == "") {
            score = "0";
        }
        var player_score_element = document.getElementById('player_' + i + '_score_' + cur_row);
        player_score_element.innerHTML = score;
        if (is_a_double_point_row(cur_row)) {
            player_score_element.innerHTML += " x 2";
        }
        player_score_element.removeAttribute('hidden');
        cur_score_input.setAttribute('hidden', 'true');

        //update player_scores and score Total
        player_scores[i].push(parseInt(score));
        update_total_row();
    }

    //increment row counter
    cur_row += 1;

    if (is_lambsie) {
        if (cur_row < cur_game_rows.length) {
            //open up the forms for the next row
            open_form_for(cur_row);
        } else { //game is over
            game_over_actions();
        }
    } else {
        if (cur_row < cur_game_rows.length) {
            //open up the forms for the next row
            open_form_for(cur_row);
        } else { //add another row before Total
            var tbody = document.getElementById("lambsie_table").getElementsByTagName("tbody")[0];
            var total = tbody.removeChild(tbody.childNodes[tbody.childNodes.length-1]);
            add_a_row(cur_row, cur_game_rows);
            tbody.appendChild(total);
            open_form_for(cur_row);
        }
    }
    
}

function game_over_actions() {
    var winner = 0;
    var winning_score = 10000;
    for (var i = 0; i < num_players; i++) {
        var cur_score = get_score_from_score_list(player_scores[i]);
        if (cur_score <= winning_score) {
            winning_score = cur_score;
            winner = i;
        }
    }

    //check for ties
    var other_winners = [];
    for (var i = 0; i < winner; i++) {
        var cur_score = get_score_from_score_list(player_scores[i]);
        if (cur_score == winning_score) {
            other_winners.push(i);
        }
    }

    var game_over_text = document.getElementById('game_over_text');
    if (other_winners.length == 0) {
        //winner wins
        game_over_text.innerHTML = "Game over! Congratulations " + player_names[winner] + ", you win!";
    } else {
        //tie
        game_over_text.innerHTML = "Game over! It's a tie between ";
        for (var j = 0; j < other_winners.length; j++) {
            game_over_text.innerHTML += player_names[other_winners[j]] + " and ";
        }
        game_over_text.innerHTML += player_names[winner];
    }
    game_over_text.removeAttribute('hidden');

    //hide save button
    document.getElementById('save_button').setAttribute('hidden', 'true');
    document.getElementById('edit_button').setAttribute('hidden', 'true');

    //show play again button
    document.getElementById('play_lambsie_again_button').removeAttribute('hidden');
}

function update_total_row() {
    var total_scores = document.getElementsByClassName('player_total_score');
    for (var i = 0; i < total_scores.length; i++) {
        var cur_score_list = player_scores[i];
        var cur_score = get_score_from_score_list(cur_score_list);
        total_scores[i].innerHTML = "" + cur_score;
    }
}

function get_score_from_score_list(score_list) {
    var total = 0;
    for (var i = 0; i < score_list.length; i++) {
        var cur_value = score_list[i];
        total += cur_value;
        if (is_a_double_point_row(i)) {
            total += cur_value; //basically x2 for all the double point rows
        }
    }
    return total;
}

function play_lambsie_again() {
    //hide save and edit buttons
    document.getElementById('save_button').setAttribute('hidden', 'true');
    document.getElementById('edit_button').setAttribute('hidden', 'true');

    // hide play again button and game over text
    document.getElementById('play_lambsie_again_button').setAttribute('hidden', 'true');
    document.getElementById('game_over_text').setAttribute('hidden', 'true');
    if (!is_lambsie) {
        document.getElementById('restart_game_button').setAttribute('hidden', 'true');
    }


    // show buttons for the start of the game
    document.getElementById('start_button').removeAttribute('hidden');
    document.getElementById('add_column_button').removeAttribute('hidden');
    document.getElementById('remove_column_button').removeAttribute('hidden');

    // clear columns and then re-create them
    var initial_num_players = num_players;
    for (var i = 0; i < initial_num_players; i++) {
        remove_column(true);
    }

    for (var i = 0; i < initial_num_players; i++) {
        add_column();
    }

    // fill in the player names with the names from the previous game
    for (var i = 0; i < initial_num_players; i++) {
        var cur_player_input = <HTMLInputElement> document.getElementById('player_' + i + "_name_input")
        cur_player_input.value = player_names[i];
    }

    // reset game data
    cur_row = 0;
    player_names = [];
    player_scores = [];
}

function edit_last_row() {
    if (cur_row > 0) { //don't do anything if it's the first row
        //hide the current row
        var all_score_inputs = document.getElementsByClassName('player_score_input_' + cur_row);
        for (var i = 0; i < all_score_inputs.length; i++) {
            var cur_score_input = <HTMLInputElement> all_score_inputs[i];
            cur_score_input.setAttribute('hidden', 'true');
            
            var player_score_element = document.getElementById('player_' + i + '_score_' + (cur_row - 1));
            player_score_element.setAttribute('hidden', 'true');

            var prev_score_input = document.getElementById('player_' + i + '_score_input_' + (cur_row - 1));
            prev_score_input.removeAttribute('hidden');

            //update player_scores and score Total
            player_scores[i].pop();
            update_total_row();
        }

        cur_row -= 1;
        open_form_for(cur_row);
    } 
}