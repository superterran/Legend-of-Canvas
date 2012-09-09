
function makewalk() {

//map[mapnum]["enemies"][0]["plusy"] = -1;
// plr['plusy'] = -5;
// alert(map[mapnum]["enemies"][0]["x"]);
}

var block = 50;
var point = 5;
var step = 10;
var xxx = 1;

var plr = new Array;
plr['x'] = 2*block;
plr['y'] = 3*block;
plr['plusx'] = 0;
plr['plusy'] = 0;
plr['sprite'] = sprite['player'];
plr['damage'] = 1;
plr['health'] = 6;
plr['maxhealth'] = 6;


// link moving down


plr['initx'] = 0;
plr['inity'] = 0;
plr['leftdoor'] = false;
var thismap = new Array;
var blockmap = new Array;

var lastmap = 1;
var mapnum = 0;

/*

 MAP LEGEND

 - level -

 r = wall block
 g = fire pit
 b = wall block
 e = entry point
 numbers - doors (exit points)

 */

var map = new Array;
var map = [
    {
        "terrain":  ''
            +'rrrrrrrrrrrrr|'
            +'r           r|'
            +'r  g     g  r|'
            +'r           r|'
            +'2     b     r|'
            +'r           r|'
            +'r  g     g  r|'
            +'r           r|'
            +'r           r|'
            +'rrrrrr1rrrrrr',
        "enemies": [
            {
                "x": 3*block,
                "y": 4.5*block,
                "plusx": 0,
                "plusy": 0,
                "sprite": sprite['bluehardhat']
            }]

    }, {

        "terrain":  ''
            +'rrrrrr0rrrrrr|'
            +'r           r|'
            +'r           r|'
            +'r     g     r|'
            +'3           r|'
            +'r  g  b  g  r|'
            +'r           r|'
            +'r     g     r|'
            +'r           r|'
            +'rrrrrrrrrrrrr|'

    },{

        "terrain":  ''
            +'rrrrrrrrrrrrr|'
            +'r  g        r|'
            +'r           r|'
            +'r     g     r|'
            +'r           0|'
            +'r  g        r|'
            +'r           r|'
            +'r     g     r|'
            +'r           r|'
            +'rrrrrr3rrrrr|'


    },{

        "terrain":  ''
            +'rrrrrr2rrrrrr|'
            +'r  g        r|'
            +'r           r|'
            +'r     g     r|'
            +'r           1|'
            +'r  g        r|'
            +'r           r|'
            +'r     g    rr|'
            +'r        rrrr|'
            +'rrrrrrrrrrrrr|'


    }];


var firstloadoflevel = true;

thismap = new Array (10); for (i = 0; i < thismap . length; ++ i) thismap [i] = new Array (13);
pointmap = new Array (10*block); for (i = 0; i < blockmap.length; ++ i) blockmap [i] = new Array (13*block);


function init() {

    setInterval("loop()", 50);

}

function loop() {

    if(firstloadoflevel == true) {
        // do begining of level stuff

        justentered = true;
        load_stage();


        firstloadoflevel = false;


    }


// refresh canvas with level

    load_stage();

//player

    character('player');

// move enemies

    for(var z=0;z<map[mapnum]['enemies'].length;z++){

        character(z);

        xxx++;
    }


}


function controller(e) {
    keynum = e.which;

// space = 32
// left = 37
// up = 38
// right = 39
// down = 40
//alert(keynum);

    if(keynum == 37) { // left

        plr["plusx"] = plr["plusx"]  - step;
        plr['sprite']['orientation'] = 'left';

    }

    if(keynum == 38) { // up

        plr["plusy"] = plr["plusy"] - step;
        plr['sprite']['orientation'] = 'up';

    }

    if(keynum == 39) { // right

        plr["plusx"] = plr["plusx"] + step;
        plr['sprite']['orientation'] = 'right';

    }


    if(keynum == 40) { // left

        plr["plusy"] = plr["plusy"] + step;
        plr['sprite']['orientation'] = 'down';

    }

// alert('x = ' + plr["plusx"] + ', y = ' + plr['plusy']);

}


function stage_color(x, y, map) {

    var color;
    var cases = map[y][x];
    switch (cases){


        case "r":
            color="#FF0000";
            color = "levels/tile-wall.jpg";
            break;

        case "g":
            color = "sprites/firepit.png";

            break;

        case "b":

            color="#0000FF";
            color = "levels/tile-wall.jpg";

            break;

        case "e":


        case "w":
        case " ":
        case "a":

            color="#FFFFFF";
            color = "levels/tile-floor.jpg";

            break;



        case "b":

            color="#000000";

            break;



    }

    if(!isNaN(map[y][x])) {

        if(justentered == true) {
            if(map[y][x] == lastmap) {

                plr["x"] = x*block;
                plr["y"] = y*block;
                plr['initx'] = x*block;
                plr['inity'] = y*block;
                justentered = false;

            }
        }

        color="#FFFFFF";
        color = "levels/tile-floor.jpg";

    }

    return color;

}



function load_stage() {


// Draw the level
    var cellx = 0;
    var celly = 0;



    cell = map[mapnum]["terrain"].split("");
    for(var i=0;i<cell.length;i++){

        if(cell[i] == '|'){

            var cellx = 0;
            var celly = celly + 1;
            thismap[celly] = [];

        } else {

            thismap[celly][cellx] = cell[i];

            if(firstloadoflevel == true) {
                if(cell[i] == 'e') {

                    plr["x"] = cellx;
                    plr["y"] = celly;
                }}

            var c=document.getElementById("stage");
            var cxt =c.getContext("2d");
            var color = stage_color(cellx, celly, thismap);
            var curx = cellx*50;
            var cury = celly*50;

            var img = new Image();
            img.src = color;
            cxt.drawImage(img,curx,cury,50,50);

            cellx = cellx + 1;

        }

    }

// render heads up display (health infomation, coinage, etc...

    headsupdisplay();


}




function draw(actor, x, y) {


    sprite = actor['sprite'][actor['sprite']['orientation']][actor['sprite']['step']];
    if(actor['sprite']['step'] == actor['sprite']['orientation'].length - 1) actor['sprite']['step'] = 0; else actor['sprite']['step']++;



    var c=document.getElementById("stage");
    var thischar = c.getContext("2d");
    /*

     */

    var img = new Image();
    try{
        img.src = sprite; 
    } catch(e) {
            
    }
    
    thischar.drawImage(img,x,y,block,block);


}



// new UNIVERSAL move function

function character(id) {


    actor = character_move(id);

// get new coordinates for move
    x = actor["x"];
    y = actor["y"];

// draw to screen

    draw(actor, x, y);


}

function character_move(name) {

    if(name == 'player') {
        actor = plr;

    } else {

        actor = map[mapnum]['enemies'][name];


        if(Math.abs(actor['x'] - plr['x']) < 25 && (Math.abs(actor['y'] - plr['y']) < 25)) { // colision?
            actor['repulsex'] = 2*block;
            actor['repulsey'] = 2*block;

            plr['health']--;

        }

        huntplayer(name);


    }


    if(actor['plusy'] > 0) {
        if(actor['repulsey'] > 0) {

            actor['plusy'] = actor['plusy'] - block;
// alert('ouch!');
            actor['repulsey'] = actor['repulsey'] - (step/1.5);

        } else {

            actor['repulsey'] = 0;

        }
    } else {

        if(actor['repulsey'] < 0) {

            actor['plusy'] = actor['plusy'] + block;
// alert('ouch!');
            actor['repulsey'] = actor['repulsey'] + (step/1.5);

        } else {

            actor['repulsey'] = 0;

        }

    }


    if(actor['plusx'] > 0) {
        if(actor['repulsex'] > 0) {

            actor['plusx'] = actor['plusx'] - block;
//alert(actor['plusx']);
            actor['repulsex'] = actor['repulsex'] - (step/1.5);

        } else {

            actor['repulsex'] = 0;

        }
    } else {

        if(actor['repulsex'] < 0) {

            actor['plusx'] = actor['plusx'] + block;
//alert(actor['plusx']);
            actor['repulsex'] = actor['repulsex'] + (step/1.5);

        } else {

            actor['repulsex'] = 0;

        }


    }

    xl = eval(actor['x']); xl = (xl - xl % block)/block;
    xr = eval(actor['x']+block-1); xr = (xr - xr % block)/block;
    yt = eval(actor['y']); yt = (yt - yt % block)/block;
    yb = eval(actor['y']+block-1); yb = (yb - yb % block)/block;


    if(actor['plusy'] != 0) {

        if(actor['plusy'] < 0) { // is y negative (going up?)

            if((thismap[yt][xl] ==  ' ' || !isNaN(thismap[yt][xl])) && (thismap[yt][xr] ==  ' ' || !isNaN(thismap[yt][xr]))) { // top
                actor['y'] = actor['y'] - step;
                actor['plusy'] = actor['plusy'] + step;
            }

        } else { // is y positive (going down?)

            if((thismap[yb][xl] ==  ' ' || !isNaN(thismap[yb][xl])) && (thismap[yb][xr] ==  ' ' || !isNaN(thismap[yb][xr]))) { // top
                actor['y'] = actor['y'] + step;
                actor['plusy'] = actor['plusy'] - step;

            }

        }
    }

    if(actor['plusx'] != 0) {

        if(actor['plusx'] < 0) { // is x negative (going left?)

            if((thismap[yb][xl] ==  ' ' || !isNaN(thismap[yb][xl])) && (thismap[yt][xl] ==  ' ' || !isNaN(thismap[yt][xl]))) { // top
                actor['x'] = actor['x'] - step;
                actor['plusx'] = actor['plusx'] + step;

            }

        } else { // is x postive (going right?)

            if((thismap[yb][xr] ==  ' ' || !isNaN(thismap[yb][xr])) && (thismap[yt][xr] ==  ' ' || !isNaN(thismap[yt][xr]))) { // top
                actor['x'] = actor['x'] + step;
                actor['plusx'] = actor['plusx'] - step;

            }


        }
    }
    if(plr['leftdoor'] == true  && !isNaN(thismap[yt][xl]) && thismap[yt][xl] != ' ') {
        // alert('level change ' + thismap[yt][xl]);
        firstloadoflevel = true;
        plr['leftdoor'] = false;
        lastmap = mapnum;
        mapnum = thismap[yt][xl];

    } else {

        if(Math.abs(plr['x'] - plr['initx']) > block) plr['leftdoor'] = true;
        if(Math.abs(plr['y'] - plr['inity']) > block) plr['leftdoor'] = true;

    }


    if(actor['plusx'] == 0 && actor['plusy'] == 0) actor['sprite']['step'] = 0; // return to sprite 0






    actor['plusy'] = actor['plusy'] - step;
    actor['plusx'] = actor['plusx'] - step;
    if(Math.abs(actor['plusy']) > 5) actor['plusy'] = 0;
    if(Math.abs(actor['plusx']) > 5) actor['plusx'] = 0;



    if(name == 'player') {

        plr = actor;

    } else {

        map[mapnum]["enemies"][name] = actor;

    }

    return actor;



}


function huntplayer(name) {




    actor = map[mapnum]['enemies'][name];

    difx = actor['x'] - plr['x'];
    dify = actor['y'] - plr['y'];


    if(difx < 0) actor['plusx'] = step; else actor['plusx'] = -step;
    if(dify < 0) actor['plusy'] = step; else actor['plusy'] = -step;




    map[mapnum]['enemies'][name] = actor;
}


function headsupdisplay() {

    var context = document.getElementById("stage").getContext("2d");
    context.fillStyle    = '#fff';
    context.font         = '20px Lucida Sans Unicode';
    context.textBaseline = 'top';
    context.fillText(" life: " + plr['health'], 10, 10);


    context.fillText(" plusx: " + plr['plusx'], 10, 30);
    context.fillText(" plusy: " + plr['plusy'], 10, 50);



    context.fillText(" enemey plusx: " + map[mapnum]['enemies'][0]['repulsex'], 100, 30);
    context.fillText(" enemey plusy: " + map[mapnum]['enemies'][0]['repulsey'], 100, 50);


}
