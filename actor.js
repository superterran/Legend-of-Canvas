
var actor = Class.create({

    name: null,
    health: 100,

    x: 0,
    y: 0,

    block: 50,

    data: null,

    speed: 10,
    tol: 40,

    action: 'wasd',
    actions: [],

    charPath: 'actors/',
    parent: false,

    initialize: function(name, parent) {

        this.name = name;
        this.parent = parent;
        this.charPath = this.charPath + name + '/';

        this.x = this.parent.stage.spawnPointX;
        this.y = this.parent.stage.spawnPointY;

        this.data = this.parent.loadJson(this.charPath + 'actor.json');

        this.loadActions();

    },

    act: function(action) {

        if(action) this.action = action;
        this.actions[this.action]();

    },

    loadActions: function() {

        this.actions['stop']    = function(){ /* no action */ }.bind(this);
        this.actions['up']      = function(){ var y = this.y - this.speed; if(this.canMove(this.x, y)){ this.y = y }}.bind(this);
        this.actions['down']    = function(){ var y = this.y + this.speed; if(this.canMove(this.x, y)){ this.y = y }}.bind(this);
        this.actions['left']    = function(){ var x = this.x - this.speed; if(this.canMove(x, this.y)){ this.x = x }}.bind(this);
        this.actions['right']   = function(){ var x = this.x + this.speed; if(this.canMove(x, this.y)){ this.x = x }}.bind(this);
        this.actions['wasd']    = function(){
            this.action = 'stop';
            Event.observe(document, 'keydown', function(event){
                this.action = event.keyIdentifier.toLowerCase();
            }.bind(this));
            Event.observe(document, 'keyup', function(){
                this.action = 'stop';
            }.bind(this));
        }.bind(this);

    },
    /**
     * determines if attempted move is valid
     * @param x
     * @param y
     * @return {Boolean}
     */
    canMove: function(x,y) {

        var yy = this.y - y;
        var xx = this.x - x;

        var dir;

        var answer = true;

            if(yy >= 0) {
                dir = 'up';
                answer = answer && this.parent.stage.isMovable(x,y) && this.parent.stage.isMovable(x+this.tol, y);
            } else {
                dir = 'down';
                answer = answer && this.parent.stage.isMovable(x,y+this.tol) && this.parent.stage.isMovable(x+this.tol, y+this.tol);
            }

            if(xx >= 0) {
                dir = 'left';
                answer = answer && this.parent.stage.isMovable(x,y) && this.parent.stage.isMovable(x,y+this.tol);
            } else {
                dir = 'right';
                answer = answer && this.parent.stage.isMovable(x+this.tol,y) && this.parent.stage.isMovable(x+this.tol, y+this.tol);
            }

       // console.log(this.name + ": x="+xx+ ", y=" + yy + ", " + dir + ", " + answer);
        return answer;
    }

});