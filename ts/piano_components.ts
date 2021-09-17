let STROKE_VALUE = 50;
let PIANO_WIDTH = 1000;
let PIANO_HEIGHT = 600;
let WHITE_KEY_WIDTH = 50;
let BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 2/3;
let WHITE_KEY_HEIGHT = 200;
let BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 2/3;
let WHITE_KEY_TEXT_SIZE = 20;
let BLACK_KEY_TEXT_SIZE = WHITE_KEY_TEXT_SIZE * 2/3;
let MAJOR_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
let MINOR_NOTES = ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];
let BLACK = "#000000";
let WHITE = "#FFFFFF";
let FONT = "Consolas";
let NOTE_PATH_PREFIX = "../files/sounds/piano-";
let NOTE_PATH_POSTFIX = ".wav";

class Key {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    name: string;
    note: string; //change to a different sound object later?
    textSize: number;
    audio; //saves memory by only initializing once

    constructor(x: number, y: number, width: number, height: number, color: string, name: string, note: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.name = name;
        this.note = note;
        this.textSize = this.color == WHITE ? WHITE_KEY_TEXT_SIZE : BLACK_KEY_TEXT_SIZE;
        try {
            this.audio = new Audio(note);
        } catch (error) {
            this.audio = null;
        }
    }

    draw(context) {
        if (this.color === BLACK) {
            context.fillStyle = BLACK;
            context.fillRect(this.x, this.y, this.width, this.height);
            this.drawNoteName(context, WHITE);
        } else {
            context.strokeStyle = BLACK;
            context.strokeRect(this.x, this.y, this.width, this.height);
            this.drawNoteName(context, BLACK);
        }
    }

    drawNoteName(context, textColor) {
        context.font = this.textSize + " " + FONT;
        context.fillStyle = textColor;
        let offset = textColor === BLACK ? 2 : -1; //black text means white key
        context.fillText(this.name, this.x + this.textSize + offset, this.y + this.height - this.textSize);
    }

    containsPoint(point_x, point_y) {
        return this.x <= point_x && this.x + this.width >= point_x && this.y <= point_y && this.y + this.height >= point_y;
    }

    playSound() {
        if (this.audio) {
            this.audio.play();
        }
    }
}

export class Piano {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    blackKeys: Key[] = [];
    whiteKeys: Key[] = [];

    constructor() {
        this.canvas = document.createElement("canvas") as HTMLCanvasElement;
        this.canvas.width = PIANO_WIDTH;
        this.canvas.height = PIANO_HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.getElementById("piano_container").appendChild(this.canvas);

        let context = this.canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        this.canvas.addEventListener("mousedown", evt => this.clickPiano(this.canvas, evt));

        this.build();
        this.draw();
        // this.createUserEvents();
    }

    build() {
        //white keys
        for (let i = 0; i < PIANO_WIDTH / WHITE_KEY_WIDTH; i++) {
            let name = MAJOR_NOTES[i % MAJOR_NOTES.length];
            let note = NOTE_PATH_PREFIX + name.toLowerCase() + "_" + name + "_major" + NOTE_PATH_POSTFIX;
            this.whiteKeys.push(new Key(i * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT, WHITE, name, note));
        }

        //black keys
        for (let i = 0; i < PIANO_WIDTH / WHITE_KEY_WIDTH - 1; i++) {
            let name = MINOR_NOTES[i % MINOR_NOTES.length];
            let note = NOTE_PATH_PREFIX + name.toLowerCase() + "_" + name + "_minor" + NOTE_PATH_POSTFIX;
            if (i % MINOR_NOTES.length !== 2 && i% MINOR_NOTES.length !== 6) {
                this.blackKeys.push(new Key(i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH - (BLACK_KEY_WIDTH / 2)), 0, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT, BLACK, name, note));
            }
        }
    }

    draw() {
        this.whiteKeys.forEach(key => key.draw(this.context));
        this.blackKeys.forEach(key => key.draw(this.context));
    }

    clickPiano(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        // console.log("Coordinate x: " + x, 
        //             "Coordinate y: " + y);

        let keyFound = false;

        this.blackKeys.forEach(key => {
            if (key.containsPoint(x, y)) {
                keyFound = true;
                console.log(key.name);
            }
        });

        if (!keyFound) {
            this.whiteKeys.forEach(key => {
                if (key.containsPoint(x, y)) {
                    keyFound = true;
                    console.log(key.name);
                    key.playSound();
                }
            });
        }
    }
}