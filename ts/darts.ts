// FRONT PAGE CODE

function show_game_type_element() {
    var game_type:HTMLElement = document.getElementById("game_type");
    console.log(game_type, "show");
    if (game_type.getAttribute("hidden")) {
        game_type.removeAttribute("hidden");
    }
}

function remove_game_type_element() {
    var game_type:HTMLElement = document.getElementById("game_type");
    console.log(game_type, "remove");

    game_type.setAttribute("hidden", "true");
}

function set_game_type_element() {
    var game_select_value = (<HTMLInputElement> document.getElementById("game_select")).value;
    console.log(game_select_value);
    if (game_select_value === "0") { //classic game
        write_classic_game_options_html();
    } else if (game_select_value === "1") { //cricket
        write_cricket_game_options_html();
    }
}

function write_classic_game_options_html() {
    var game_option_container = document.getElementById('game_option_container');
    var innerHTML_text = '<span>Starting Point Total</span><br>';
    for (var i = 1; i <= 5; i++) {
        var cur_total = -100 + (200 * i) + 1;
        if (i != 3) {
            innerHTML_text += ('<input type="radio" id="game_option_number_' + i + '" name="game_option_item" class="game_option_item" value="' + cur_total + '" />');
        } else {
            innerHTML_text += ('<input type="radio" id="game_option_number_' + i + '" name="game_option_item" class="game_option_item" value="' + cur_total + '" checked/>');
        }
        innerHTML_text += ('<label for="game_option_number_' + i + '" style="width: 16%;">' + cur_total + '</label>');
    }
    game_option_container.innerHTML = innerHTML_text;
}

function write_cricket_game_options_html() {
    var game_option_container = document.getElementById('game_option_container');
    var innerHTML_text = '<span>Rule Set</span><br>';

    innerHTML_text += ('<input type="radio" id="game_option_ruleset_1" name="game_option_item" class="game_option_item" value="house_rules" checked/>');
    innerHTML_text += ('<label for="game_option_ruleset_1" style="width: 40%;">House Rules</label>');

    innerHTML_text += ('<input type="radio" id="game_option_ruleset_2" name="game_option_item" class="game_option_item" value="official_rules"/>');
    innerHTML_text += ('<label for="game_option_ruleset_2" style="width: 40%;">Official Rules</label>');
    
    game_option_container.innerHTML = innerHTML_text;

    /*
<div class="game_option" id="game_option_container">
<span>Starting Point Total</span>
<br>
<input type="radio" id="game_option_number_1" name="game_option_item" class="game_option_item" value="101">
<label for="game_option_number_1">101</label>
<input type="radio" id="game_option_number_2" name="game_option_item" class="game_option_item" value="301">
<label for="game_option_number_2">301</label>


<input type="radio" id="game_option_number_3" name="game_option_item" class="game_option_item" value="501" checked="">
<label for="game_option_number_3">501</label><input type="radio" id="game_option_number_4" name="game_option_item" class="game_option_item" value="701"><label for="game_option_number_4">701</label><input type="radio" id="game_option_number_5" name="game_option_item" class="game_option_item" value="901"><label for="game_option_number_5">901</label></div>
    */
}

//TODO:
/*
make submit button check to see if everything has been filled out
maybe use "required" tag on form elements


*/

//GAME CODE

//TODO:
/*
make left side into a dart board
make right side into player names, 


*/