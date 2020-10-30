class CoffeeIntake {
    cups_of_coffee: number;
    date: Date;

    constructor(cups_of_coffee: number, date: Date) {
        this.cups_of_coffee = cups_of_coffee;
        this.date = date;
    }

    get_cups_of_coffee() {
        return this.cups_of_coffee;
    }

    get_date() {
        return this.date;
    }
}

var pointthreefivecoffee = new CoffeeIntake(2, new Date(2020 /*year*/, 9 /*month but for some reason off by 1?*/, 29 /*day*/, 11 /*hour*/, 30 /*minute*/));
var onecupcoffee = new CoffeeIntake(1, new Date());
var all_cups_of_coffee: CoffeeIntake[] = [pointthreefivecoffee];
var SVG_HEIGHT: number = 500;
var SVG_WIDTH: number = 500;
var THERMO_HEIGHT = SVG_HEIGHT * 4/5;
var THERMO_STARTING_TOP = SVG_HEIGHT * 1/10;
var PX_FROM_SIDES = 3;
var THERMO_COLOR: string = "black";
var CAFFEINE_COLOR: string = "red";
var CAFFEINE_HALF_LIFE_IN_HOURS = 5;

function build_coffee_meter() {
    //draw the coffee meter outline
    draw_coffee_meter();

    //calculate the current amount of coffee in the bloodstream
    var cur_coffee = calc_cur_coffee();

    //populate the coffee meter based off the last caffeine input
    populate_coffee_meter(cur_coffee);

    //write how people should treat arnold based off the current BCC (blood caffiene content)
    output_arnold_advice(cur_coffee);
}

function draw_coffee_meter() {
    var coffee_meter_div = document.getElementById("coffee_meter");
   
    // create the svg element
    const thermo_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    // set width and height
    thermo_svg.setAttribute("width", `${SVG_WIDTH}`);
    thermo_svg.setAttribute("height", `${SVG_HEIGHT}`);
    thermo_svg.setAttribute("id", "thermo_svg");

    // attach it to the container
    thermo_svg.appendChild(get_top(THERMO_COLOR, 0, 0));
    thermo_svg.appendChild(get_shaft(THERMO_COLOR, 0, 0, thermo_svg));
    thermo_svg.appendChild(get_bulb(THERMO_COLOR, 0));

    // attach container to document
    document.getElementById("coffee_meter").appendChild(thermo_svg);
}

function calc_cur_coffee() {
    var total = 0;
    for (var CoffeeIntake of all_cups_of_coffee) {
        total += get_cur_quantity_exp_decay(CoffeeIntake.cups_of_coffee, CoffeeIntake.date);
    }
    return total;
}

function get_cur_quantity_exp_decay(a_naught: number, ingestion_date: Date) {
    var delta_hours = (new Date().getTime() - ingestion_date.getTime()) / 36e5;
    // A_t = A_0 * (1/2)^(t/k)
    // console.log(delta_hours);
    // console.log(new Date().getTime());
    // console.log(ingestion_date.getTime());
    // console.log(new Date());
    // console.log(ingestion_date);
    return a_naught * Math.pow((1/2), delta_hours/CAFFEINE_HALF_LIFE_IN_HOURS);
}

function populate_coffee_meter(cur_coffee: number) {
    console.log("Cur Coffee: " + cur_coffee);
    var thermo_svg: SVGSVGElement = <SVGSVGElement><unknown>document.getElementById("thermo_svg");

    if (cur_coffee != 0) {
        var px_from_top = (1 - Math.min(cur_coffee, 1.5)) * THERMO_HEIGHT;
        thermo_svg.appendChild(get_top(CAFFEINE_COLOR, PX_FROM_SIDES, px_from_top));
        thermo_svg.appendChild(get_shaft(CAFFEINE_COLOR, PX_FROM_SIDES, px_from_top, thermo_svg));
        thermo_svg.appendChild(get_bulb(CAFFEINE_COLOR, PX_FROM_SIDES));
    }
}

function populate_bulb() {

}

function get_bulb(color: string, px_from_radius: number): Node {
    const thermo_bulb = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    thermo_bulb.setAttribute("cx", `${SVG_WIDTH / 2}`);
    thermo_bulb.setAttribute("cy", `${THERMO_HEIGHT + THERMO_STARTING_TOP}`);
    thermo_bulb.setAttribute("r", `${(SVG_WIDTH / 20) - px_from_radius}`);
    thermo_bulb.setAttribute("fill", color);
    return thermo_bulb;
}

function get_shaft(color: string, px_from_side: number, px_from_top: number, svg: SVGSVGElement): Node {
    // create a triangle
    const thermo_shaft = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    var array = [ [ (SVG_WIDTH / 2) - (SVG_HEIGHT / 50) + px_from_side,(SVG_HEIGHT / 50) + px_from_top + THERMO_STARTING_TOP ], 
                  [ (SVG_WIDTH / 2) + (SVG_HEIGHT / 50) - px_from_side,(SVG_HEIGHT / 50) + px_from_top + THERMO_STARTING_TOP ],
                  [ (SVG_WIDTH / 2) + (SVG_HEIGHT / 50) - px_from_side,THERMO_HEIGHT + THERMO_STARTING_TOP],
                  [ (SVG_WIDTH / 2) - (SVG_HEIGHT / 50) + px_from_side,THERMO_HEIGHT + THERMO_STARTING_TOP], ];

    for (var value of array) {
        var point = svg.createSVGPoint();
        point.x = value[0];
        point.y = value[1];
        thermo_shaft.points.appendItem(point);
    }
    thermo_shaft.setAttribute("fill", color);
    return thermo_shaft;
}

function get_top(color: string, px_from_radius: number, px_from_top: number): Node {
    const thermo_top = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    thermo_top.setAttribute("cx", `${SVG_WIDTH / 2}`);
    thermo_top.setAttribute("cy", `${(SVG_HEIGHT / 50) + px_from_top + THERMO_STARTING_TOP}`);
    thermo_top.setAttribute("r", `${(SVG_HEIGHT / 50) - px_from_radius}`);
    thermo_top.setAttribute("fill", color);
    return thermo_top;
}

function output_arnold_advice(cur_coffee: number) {
    var advice_div = document.getElementById("coffee_meter_meaning");

    if (cur_coffee > 1) {
        advice_div.innerHTML = "Arnold is fully caffeinated, he'll be fun to talk to and have lots of ideas.";
    } else if (cur_coffee > 0.8) {
        advice_div.innerHTML = "Arnold has had caffeine recently. He's in a good mood.";
    } else if (cur_coffee > 0.5) {
        advice_div.innerHTML = "Arnold had coffee earlier. He's feeling pleasantly alert.";
    } else if (cur_coffee > 0.25) {
        advice_div.innerHTML = "Arnold has less than half a cup of coffee in his bloodstream, and might show occassional signs of withdrawal.";
    } else if (cur_coffee > 0.1) {
        advice_div.innerHTML = "Arnold needs caffeine quick; if you bring him some, he'll really appreciate you for the rest of the day.";
    } else {
        advice_div.innerHTML = "Arnold is in critical condition. He needs caffeine now!!! Do not approach unless trained."
    }
}