// FRONT PAGE CODE
function show_game_type_element() {
    var game_type = document.getElementById("game_type");
    console.log(game_type, "show");
    if (game_type.getAttribute("hidden")) {
        game_type.removeAttribute("hidden");
    }
}
function remove_game_type_element() {
    var game_type = document.getElementById("game_type");
    console.log(game_type, "remove");
    game_type.setAttribute("hidden", "true");
}
function set_game_type_element() {
    var game_select_value = document.getElementById("game_select").value;
    console.log(game_select_value);
    if (game_select_value === "0") { //classic game
        show_game_type_element();
    }
    else if (game_select_value === "1") { //cricket
        remove_game_type_element();
    }
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
//# sourceMappingURL=darts.js.map