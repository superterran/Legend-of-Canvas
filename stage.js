
var stage = Class.create({

    block: 50,
    height: 9,
    width: 13,
    level: null,
    room: null,
    step: 1, // how many refereshes, in seconds
    levelsPath: "levels/",

    canvasName: null,

    initialize: function(name) {

        this.buildStage(name);
    },

    load: function(name) {

        ajax = new Ajax.Request("levels/"+name+"/level.json", {
            method:'get',
            data: null,
            requestHeaders: {Accept: 'application/json'},
            onSuccess: function(transport){
                this.level = transport.responseText.evalJSON(); // <-- loads level to memory
                new PeriodicalExecuter(function(pe) { // stage 'loop'
                    this.renderStage(); // renders stage
                }.bind(this), this.step);
            }.bind(this)
        });
        return this.level;
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

    renderStage: function()
    {

        if(!this.level) return false;

        map = this.level.levels;
        tiles = this.level.tiles;
        name = this.level.name;

        var x=0;

        map[0].each(function(e){ // loop top to bottom

            var y=0;

            e.split("").each(function(c) {

                if(tiles[c] == undefined) alert(c + ',' + x + ', ' + y);
                this.draw(this.levelsPath+name+"/"+tiles[c], y*this.block, x*this.block);
                y++;

            }.bind(this));

        x++;

        }.bind(this));

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