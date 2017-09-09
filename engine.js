

var engine = Class.create({

    stage: null,
    actors: [],
    step:.05,

    preload: ['stage.js','actor.js'],


    initialize: function(name) {

        this.load(); //new stage(name, this);
        this.stage = new stage(name, this);

        this.stage.load('dungeon');

        this.actors[0] = new actor('link', this);

        this.loop();

    },

    loop: function() {

        new PeriodicalExecuter(function(pe) { // stage 'loop'

            this.actors[0].act();

            this.stage.renderStage(); // renders stage
            this.stage.renderActors(this.actors); // renders actors


        }.bind(this),this.step);
    },


    loadJson: function(url) {

        ajax = new Ajax.Request(url, {
            asynchronous:false,
            requestHeaders: {Accept: '*/*'}
        });

        return ajax.transport.responseText.evalJSON();
    },

    load: function() {

        this.preload.each(function(e) {

            script = document.createElement("script");
            script.type = 'text/javascript';
            script.src = e;
            $$('head').first().appendChild(script);

        });

    }

});
