

var engine = Class.create({

    step: 100,


    initialize: function(name) {

        this.stage = new stage(name);
        this.stage.load('dungeon', this);



        this.loop();
    },

    loop: function() {




      //
      //  setTimeout(1000, this.loop());

    }




});