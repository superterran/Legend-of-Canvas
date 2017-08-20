
var stage = Class.create({

    block: 50,
    height: 9,
    width: 13,
    level: null,
    room: null,
    lastRoom: null,
    step: 10, // how many refereshes, in seconds
    levelsPath: "levels/",
    canvasName: null,

    spawnPointX: 0,
    spawnPointY: 0,
    spawnFlag: false,

    parent: false,

    initialize: function(name, parent) {

        this.buildStage(name);
        this.parent = parent;
    },

    load: function(name) {

        // this.level = this.parent.loadJson(this.levelsPath+name+"/level.js");
        
        this.level = {
        "name": "dungeon",

        "tiles":
        {
            " ":    "tile-floor.jpg",
            "r":    "tile-wall.jpg",
            "g":    "firepit.png"
        },

        "levels":
        {
            "0":[
                "rrrrrrrrrrrrr",
                "r           r",
                "r  g     g  r",
                "r           r",
                "3     g     r",
                "r           r",
                "r  g  0  g  r",
                "r           r",
                "rrrrrr1rrrrrr"
            ],

            "1":[
                "rrrrrr0rrrrrr",
                "r           r",
                "r     g     r",
                "r           r",
                "2  g     g  r",
                "r           r",
                "r     g     r",
                "r           r",
                "rrrrrrrrrrrrr"
            ],

            "2":[
                "rrrrrr3rrrrrr",
                "r           r",
                "r  g     g  r",
                "r   g       r",
                "r    g      1",
                "r     g     r",
                "r  g   ggg  r",
                "r           r",
                "rrrrrrrrrrrrr"
            ],

            "3":[
                "rrrrrrrrrrrrr",
                "r           r",
                "r  g     g  r",
                "r           r",
                "r           0",
                "r           r",
                "r  g        r",
                "r           r",
                "rrrrrr2rrrrrr"
            ]


        }
            
        this.room = 0;
        this.lastRoom = 0;
        this.renderStage();

    },

    buildStage: function(name) {

        this.canvas = document.createElement("canvas");
        this.canvas.id = name;
        this.canvas.width = this.width * this.block;
        this.canvas.height= this.height * this.block;
        document.body.update(this.canvas);
        this.canvasName = name;

        return this;
    },

    renderActors: function(actors)
    {

        actors.each(function(e) {

            if(!e.data.sprite[e.orient][e.orient_x]) e.orient_x = 0;
            this.draw(e.charPath + e.data.sprite[e.orient][e.orient_x], e.x, e.y);
            this.draw(e.charPath + e.data.sprite[e.orient][e.orient_x], e.x, e.y); // renders twice to smooth animations
            e.orient_x++;
        }.bind(this));

    },

    renderStage: function()
    {

        if(!this.level) return false;

        map = this.level.levels;
        tiles = this.level.tiles;
        name = this.level.name;

        var x=0;

        map[this.room].each(function(e){ // loop top to bottom

            var y=0;

            e.split("").each(function(c) { // loop left to right

                var url;

                if(tiles[c]) { // doorways are numbers
                    url = this.levelsPath+name+"/"+tiles[c]; // rest of level
                } else {
                    url = this.levelsPath+name+"/"+tiles[' ']; // doorway

                    if(c == this.lastRoom) {

                        this.spawnPointY = x*this.block;
                        this.spawnPointX = y*this.block;

                    }
                }

                this.draw(url, y*this.block, x*this.block);
                y++;

            }.bind(this));

        x++;

        }.bind(this));

    },

    isMovable: function(x, y) {

        var tile = this.getTile(x,y);
        if(tile == " " || !isNaN(tile)) return true; else return false;

    },

    isDoor: function(x,y) {

      if(this.getTile(x,y) != " ") return true; else false;

    },

    useDoor: function(door) {

      this.spawnFlag = true;
      this.lastRoom = this.room;
      this.room = door;

    },

    getTile: function(x, y) {

        var xx = this.toBlock(x);
        var yy = this.toBlock(y);
        if(this.level.levels[this.room][yy]) {
            var yyy = this.level.levels[this.room][yy];
        } else {
            var yyy = this.level.levels[this.room][yy-1]
        }
        if(yyy.charAt(xx)) return yyy.charAt(xx); else return yyy.charAt(xx-1);

    },

    toBlock: function(xy) {
        return Math.floor(xy / this.block);
    },

    draw: function(imgurl, x, y) {

        img = document.createElement('img');
        // console.log(imgurl);
        img.src = imgurl;
        img.onload = function() {
            img.src = imgurl;
            $('game').getContext('2d').drawImage(img, x,y);
        }

        return this;
    }

});
