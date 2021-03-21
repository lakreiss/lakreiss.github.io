export {};
import {Player, Position, Direction} from "./adventure_player.js";
import { Dir } from "fs";

window.addEventListener('keydown', function(e) { key_down(e); });
window.addEventListener('keyup', function(e) { key_up(e); });

const SPEED = 5;

var interval;
var adventure_in_progress: boolean = false;
var player = new Player();

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
}

function checkForCollisions() {
	var player_element = document.getElementById(player.id);

	if (!player.is_rising) {
		var player_is_falling = true;
		document.getElementById("page_text").querySelectorAll("p, h1").forEach(text_element => {
			if (y_collision_between(player_element, text_element)) {
				player_is_falling = false;
				player.set_y_position_to_top_of(text_element);
			}
		})
		player.is_falling = player_is_falling;
	}
}

function y_collision_between(top_element, bottom_element): boolean {
	var top_bc = top_element.getBoundingClientRect();
	var bottom_bc = bottom_element.getBoundingClientRect();
	return top_bc.bottom >= bottom_bc.top && top_bc.left <= bottom_bc.right && top_bc.right >= bottom_bc.left && bottom_bc.bottom > top_bc.bottom;
}

function updateEntities() {
	player.update_position();
	(<HTMLImageElement>document.getElementById(player.id)).src = player.image;
	update_entity_position(player.id);
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

