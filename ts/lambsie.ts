var lambsie_rows = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
var cur_turn = 0;
var num_players = 4; //starting value

function build_lamsbie_scorecard() {

    document.write("<form>")
    //create edit, save, and cancel buttons
    document.write("<button type='button' id='edit_button' class='lambsie_button' hidden>Edit</button>");
    document.write("<button type='button' id='save_button' class='lambsie_button' hidden>Save</button>");
    document.write("<button type='button' id='start_button' class='lambsie_button' onclick='start_game();'>Start Game</button>");
    document.write("<button type='button' id='cancel_button' class='lambsie_button' hidden>Cancel</button>");
    document.write("<button type='button' id='add_row_button' class='lambsie_button' onclick='add_row();'>Add Row</button>");
    document.write("<button type='button' id='remove_row_button' class='lambsie_button' onclick='remove_row();'>Remove Row</button>");
    document.write("<table id='lambsie_table'>");

    //create the player row
    document.write('<tr><th>Players</th>');
    for (var i = 0; i < num_players; i++) {
        document.write('<td><input type="text" id="player_' + i + '_name_input" size="6" placeholder="Name"></input><span id="player_' + i + '_name" hidden></span></td>');
    }
    document.write('</tr>');

    // create the number rows
    for (var i = 0; i < lambsie_rows.length; i++) {
        var html_type = is_a_double_point_row(i) ? "th" : "td";
        document.write('<tr><' + html_type + '>' + lambsie_rows[i] + '</' + html_type + '>');
        for (var j = 0; j < num_players; j++) {
            document.write('<td></td>')
        }
        document.write('</tr>');
    }

    //create the score total row
    document.write('<tr><th>Total:</th>');
    for (var i = 0; i < num_players; i++) {
        document.write('<td>0</td>')
    }
    document.write('</tr>');
    
    document.write("</table>");
    document.write("</form>")

}

function is_a_double_point_row(row) {
    return (row % 3 == 0)
}

function add_row() {
    var table_rows = document.getElementById("lambsie_table").getElementsByTagName("tr");
    var new_table_square;
    var player_num = num_players; //this works because it's zero indexed
    for (var i = 0; i < table_rows.length; i++) {
        new_table_square = document.createElement("td");
        if (i == 0) { //player name
            new_table_square.innerHTML = '<input type="text" id="player_' + player_num + '_name_input" size="6" placeholder="Name"></input>'
        } else if (i == 14) { //total
            new_table_square.innerHTML = '0';
        }
        table_rows[i].appendChild(new_table_square);
    }
    num_players += 1;
}

function remove_row() {
    if (num_players > 1) {
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
    document.getElementById('add_row_button').setAttribute('hidden', 'true');
    document.getElementById('remove_row_button').setAttribute('hidden', 'true');
    document.getElementById('save_button').removeAttribute('hidden');

    //set the names


    //open up the forms for the Ace row
}