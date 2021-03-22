export {};
import {Player, Position, Direction} from "./adventure_player.js";

window.addEventListener('keydown', function(e) { key_down(e); });
window.addEventListener('keyup', function(e) { key_up(e); });

const SPEED = 5; //REAL SPEED
// const SPEED = 15; //DEBUGGING SPEED

var interval;
var adventure_in_progress: boolean = false;
var player = new Player();
var stopwatch: number = 0;

function key_down(e) {
	// alert(e.keyCode);
	switch(e.keyCode) {
		case 32: //space bar
			//begin game
			begin_game();
			break;
		case 38: //up key
		case 87: //w key
			if (adventure_in_progress) {
				//move up
				jump();
				break;
			}
		case 40: //down key
		case 83: //s key
			if (adventure_in_progress) {
				//move down
				// player.is_falling = true;
			}
			break;
		case 37: //left key
		case 65: //a key
			if (adventure_in_progress) {
				//move left
				move_left(SPEED);
			}
			break;
		case 39: //right key
		case 68: //d key
			if (adventure_in_progress) {
				//move right
				move_right(SPEED);
			}
			break;
		case 81: //q key
			clearInterval(interval);
			adventure_in_progress = false;
			delete_player();
			hide_hidden_entities();
			break;
		default:
			// do nothing
	}
}

function key_up(e) {
	// alert(e.keyCode);
	switch(e.keyCode) {
		case 38: //up key
		case 87: //w key
			//stop moving up
			break;
		case 40: //down key
		case 83: //s key
			if (adventure_in_progress) {
				//stop moving down
				player.is_falling = false;
			}
			break;
		case 37: //left key
		case 65: //a key
			if (adventure_in_progress) {
				//stop moving left
				stop_x();
			}
			break;
		case 39: //right key
		case 68: //d key
			if (adventure_in_progress) {
				//stop moving right
				stop_x();
			}
			break;
		default:
			// do nothing
	}
}

function begin_game() {
	instantiate_player();
	if (document.getElementById("move_instructions_text") && document.getElementById("move_instructions_text").hasAttribute("hidden")) {
		document.getElementById("move_instructions_text").removeAttribute("hidden");
		document.getElementById("move_instructions_coin").removeAttribute("hidden");
	}
}

function instantiate_player() {
	if (!adventure_in_progress) {
		adventure_in_progress = true;

		//build player and player element
		player.create_new_player();
		const player_element = document.createElement("img");
		player_element.src = player.image;
		player_element.id = player.id;
		player_element.style.left = player.position.x;
		player_element.style.top = player.position.y;
		player_element.style.height = player.height;
		player_element.style.width = player.width;
		document.body.insertBefore(player_element, document.getElementById("page_text"));
	
		//start interval
		interval = setInterval(drawScreen, 33);
	}
}

function drawScreen() {
	checkForCollisions();
	updateEntities();
	stopwatch += 1;
}

function checkForCollisions() {
	var player_element = document.getElementById(player.id);

	//check collisions with text
	if (!player.is_rising) {
		var player_is_falling = true;
		document.getElementById("page_text").querySelectorAll("p, h1, span, button, a, tr").forEach(text_element => {
			if (y_collision_between(player_element, text_element)) {
				player_is_falling = false;
				player.set_y_position_to_top_of(text_element);
				if (text_element.id === "ground") {
					unlock_area(text_element);
				}
			}
		})
		player.is_falling = player_is_falling;
	}

	//check collisions with coins
	var coins = document.getElementsByClassName("coin");
	for (var i = 0; i < coins.length; i++) {
		if (!coins[i].getAttribute("hidden")) {
			if (coin_is_inside_player(player_element, coins[i])) {
				unlock_area(coins[i]);
				coins[i].setAttribute("hidden", "true");
			}
		}
	}
}

function y_collision_between(top_element, bottom_element): boolean {
	var top_bc = top_element.getBoundingClientRect();
	var bottom_bc = bottom_element.getBoundingClientRect();
	return top_bc.bottom >= bottom_bc.top && top_bc.left <= bottom_bc.right && top_bc.right >= bottom_bc.left && bottom_bc.bottom > top_bc.bottom;
}

function coin_is_inside_player(player_element, coin) {
	var player_bc = player_element.getBoundingClientRect();
	var coin_bc = coin.getBoundingClientRect(); 
	return coin_bc.top >= player_bc.top && coin_bc.bottom <= player_bc.bottom && coin_bc.left >= player_bc.left && coin_bc.right <= player_bc.right;
}

function updateEntities() {
	//update player
	player.update_position();
	(<HTMLImageElement>document.getElementById(player.id)).src = player.image;
	update_entity_position(player.id);

	//update coins
	var coins = document.getElementsByClassName("coin");
	for (var i = 0; i < coins.length; i++) {
		(<HTMLImageElement>coins[i]).src = "../img/coins/coins_" + (stopwatch % 6 + 1) + ".png";
	}
}

function update_entity_position(id) {
	var entity_element = document.getElementById(id);
	entity_element.style.left = player.position.x;
	entity_element.style.top = player.position.y;
}

function move_left(num_pixels) {
	player.move_left(num_pixels);
}

function move_right(num_pixels) {
	player.move_right(num_pixels);
}

function stop_x() {
	player.stop_x();
}

function jump() {
	if (!player.is_falling && !player.is_rising) {
		player.jump();
	}
}

function delete_player() {
	document.body.removeChild(document.getElementById(player.id));
	player = new Player();
}

function hide_hidden_entities() {
	var hidden_entities = document.getElementsByClassName("hidden_at_start");
	for (var i = 0; i < hidden_entities.length; i++) {
		hidden_entities[i].setAttribute("hidden", "true");
	}
}

function unlock_area(unlocker) {
	if (unlocker) {
		if (unlocker.id === "move_instructions_coin") {
			document.getElementById("coin_instructions_text").removeAttribute("hidden");
			document.getElementById("coin_instructions_coin").removeAttribute("hidden");
		} else if (unlocker.id === "coin_instructions_coin") {
			document.getElementById("jump_instructions_text").removeAttribute("hidden");
			document.getElementById("jump_instructions_coin").removeAttribute("hidden");
		} else if (unlocker.id === "jump_instructions_coin") {
			//TODO: add next coin unlock which sets a cookie that makes the adventure exist on every url within my webiste
			//This will require:
				//ground on every level √
				//cookie to store whether or not adventure mode is on
				//page_text that player spawns on top of
		} else if (unlocker.id === "ground") {
			if (document.getElementById("q_instructions_text") && document.getElementById("necessary_instructions_text")) {
				document.getElementById("q_instructions_text").removeAttribute("hidden");
				document.getElementById("necessary_instructions_text").removeAttribute("hidden");
			}
		}
	}
}

