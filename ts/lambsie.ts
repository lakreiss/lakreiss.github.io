var lambsie_rows = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
var cur_turn = 0, STARTING_NUM_PLAYERS = 4;
var num_players = 0; //temporary value

function build_lamsbie_scorecard() {

    document.write("<form>")
    //create edit, save, and cancel buttons
    document.write("<button class='lambsie_button' hidden>Edit</button>");
    document.write("<button class='lambsie_button'>Save</button>");
    document.write("<button class='lambsie_button' hidden>Cancel</button>");
    document.write("<button class='lambsie_button'>Add Row</button>");
    document.write("<button class='lambsie_button'>Remove Row</button>");
    document.write('<br><br>')
    document.write("<table>");

    //create the player row
    document.write('<tr><th class="bottom_lined">Players</th>');
    for (var i = 0; i < STARTING_NUM_PLAYERS; i++) {
        document.write('<td class="bottom_lined"><input type="text"id="player_' + i + '_name" size="6" placeholder="Name"></input></td>');
    }
    document.write('</tr>');

    num_players = STARTING_NUM_PLAYERS; //filler, to be changed


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
    document.write('<tr><th class="top_lined">Total:</th>');
    for (var i = 0; i < num_players; i++) {
        document.write('<td class="top_lined">0</td>')
    }
    document.write('</tr>');
    
    document.write("</table>");
    document.write("</form>")

}

function is_a_double_point_row(row) {
    return (row % 3 == 0)
}