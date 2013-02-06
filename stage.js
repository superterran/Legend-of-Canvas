
var stage = Class.create({

    block: 50,
    height: 9,
    width: 13,
    level: null,
    room: null,
    step: 10, // how many refereshes, in seconds
    levelsPath: "levels/",
    canvasName: null,

    spawnPointX: 0,
    spawnPointY: 0,

    parent: false,

    initialize: function(name, parent) {

        this.buildStage(name);
        this.parent = parent;
    },

    load: function(name) {

        this.level = this.parent.loadJson("levels/"+name+"/level.json");
        this.room = 0;
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

            this.draw(e.charPath + e.data.sprite['down'][0], e.x, e.y);

        }.bind(this));

    },

    renderStage: function()
    {

        if(!this.level) return false;

        map = this.level.levels;
        tiles = this.level.tiles;
        name = this.level.name;

        var x=0;

        map[0].each(function(e){ // loop top to bottom

            var y=0;

            e.split("").each(function(c) { // loop left to right

                var url;

                if(tiles[c]) { // doorways are numbers
                    url = this.levelsPath+name+"/"+tiles[c]; // rest of level
                } else {
                    url = this.levelsPath+name+"/"+tiles[' ']; // doorway
                    this.spawnPointY = x*this.block;
                    this.spawnPointX = y*this.block;
                }

                this.draw(url, y*this.block, x*this.block);
                y++;

            }.bind(this));

        x++;

        }.bind(this));

    },

    isMovable: function(x, y) {

        var xx = this.toBlock(x);
        var yy = this.toBlock(y);
        var yyy = this.level.levels[this.room][yy];
        if(yyy.charAt(xx) == " " || !isNaN(yyy.charAt(xx))) return true; else return false;

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