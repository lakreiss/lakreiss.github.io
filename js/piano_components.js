var STROKE_VALUE = 50;
var PIANO_WIDTH = 1000;
var PIANO_HEIGHT = 600;
var WHITE_KEY_WIDTH = 50;
var BLACK_KEY_WIDTH = WHITE_KEY_WIDTH * 2 / 3;
var WHITE_KEY_HEIGHT = 200;
var BLACK_KEY_HEIGHT = WHITE_KEY_HEIGHT * 2 / 3;
var WHITE_KEY_TEXT_SIZE = 20;
var BLACK_KEY_TEXT_SIZE = WHITE_KEY_TEXT_SIZE * 2 / 3;
var MAJOR_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
var MINOR_NOTES = ["C#", "D#", "E#", "F#", "G#", "A#", "B#"];
var BLACK = "#000000";
var WHITE = "#FFFFFF";
var FONT = "Consolas";
var NOTE_PATH_PREFIX = "../files/sounds/piano-";
var NOTE_PATH_POSTFIX = ".wav";
var Key = /** @class */ (function () {
    function Key(x, y, width, height, color, name, note) {
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
        }
        catch (error) {
            this.audio = null;
        }
    }
    Key.prototype.draw = function (context) {
        if (this.color === BLACK) {
            context.fillStyle = BLACK;
            context.fillRect(this.x, this.y, this.width, this.height);
            this.drawNoteName(context, WHITE);
        }
        else {
            context.strokeStyle = BLACK;
            context.strokeRect(this.x, this.y, this.width, this.height);
            this.drawNoteName(context, BLACK);
        }
    };
    Key.prototype.drawNoteName = function (context, textColor) {
        context.font = this.textSize + " " + FONT;
        context.fillStyle = textColor;
        var offset = textColor === BLACK ? 2 : -1; //black text means white key
        context.fillText(this.name, this.x + this.textSize + offset, this.y + this.height - this.textSize);
    };
    Key.prototype.containsPoint = function (point_x, point_y) {
        return this.x <= point_x && this.x + this.width >= point_x && this.y <= point_y && this.y + this.height >= point_y;
    };
    Key.prototype.playSound = function () {
        if (this.audio) {
            this.audio.play();
        }
    };
    return Key;
}());
var Piano = /** @class */ (function () {
    function Piano() {
        var _this = this;
        this.blackKeys = [];
        this.whiteKeys = [];
        this.canvas = document.createElement("canvas");
        this.canvas.width = PIANO_WIDTH;
        this.canvas.height = PIANO_HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.getElementById("piano_container").appendChild(this.canvas);
        var context = this.canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        this.canvas.addEventListener("mousedown", function (evt) { return _this.clickPiano(_this.canvas, evt); });
        this.build();
        this.draw();
        // this.createUserEvents();
    }
    Piano.prototype.build = function () {
        //white keys
        for (var i = 0; i < PIANO_WIDTH / WHITE_KEY_WIDTH; i++) {
            var name_1 = MAJOR_NOTES[i % MAJOR_NOTES.length];
            var note = NOTE_PATH_PREFIX + name_1.toLowerCase() + "_" + name_1 + "_major" + NOTE_PATH_POSTFIX;
            this.whiteKeys.push(new Key(i * WHITE_KEY_WIDTH, 0, WHITE_KEY_WIDTH, WHITE_KEY_HEIGHT, WHITE, name_1, note));
        }
        //black keys
        for (var i = 0; i < PIANO_WIDTH / WHITE_KEY_WIDTH - 1; i++) {
            var name_2 = MINOR_NOTES[i % MINOR_NOTES.length];
            var note = NOTE_PATH_PREFIX + name_2.toLowerCase() + "_" + name_2 + "_minor" + NOTE_PATH_POSTFIX;
            if (i % MINOR_NOTES.length !== 2 && i % MINOR_NOTES.length !== 6) {
                this.blackKeys.push(new Key(i * WHITE_KEY_WIDTH + (WHITE_KEY_WIDTH - (BLACK_KEY_WIDTH / 2)), 0, BLACK_KEY_WIDTH, BLACK_KEY_HEIGHT, BLACK, name_2, note));
            }
        }
    };
    Piano.prototype.draw = function () {
        var _this = this;
        this.whiteKeys.forEach(function (key) { return key.draw(_this.context); });
        this.blackKeys.forEach(function (key) { return key.draw(_this.context); });
    };
    Piano.prototype.clickPiano = function (canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        // console.log("Coordinate x: " + x, 
        //             "Coordinate y: " + y);
        var keyFound = false;
        this.blackKeys.forEach(function (key) {
            if (key.containsPoint(x, y)) {
                keyFound = true;
                console.log(key.name);
            }
        });
        if (!keyFound) {
            this.whiteKeys.forEach(function (key) {
                if (key.containsPoint(x, y)) {
                    keyFound = true;
                    console.log(key.name);
                    key.playSound();
                }
            });
        }
    };
    return Piano;
}());
export { Piano };
//# sourceMappingURL=piano_components.js.map