

var engine = Class.create({

    stage: null,
    chars: [],
    step: 1,

    initialize: function(name) {


        this.chars['p1'] = new char;

        this.stage = new stage(name);
        this.stage.load('dungeon', this);

        this.loop();


    },

    loop: function() {

        new PeriodicalExecuter(function(pe) { // stage 'loop'

            this.stage.renderStage(); // renders stage

        }.bind(this), this.step);
    }

});