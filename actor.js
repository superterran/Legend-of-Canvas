
var actor = Class.create({

    name: null,
    data: null,
    health: 100,

    x: 0,
    y: 0,

    speed: 10,

    tol: 40,
    block: 50,

    exitedDoor: false,
    orient: 'up',
    orient_x: 0,

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


        if(this.parent.stage.spawnFlag == true) {

            this.parent.stage.spawnFlag = false;
            this.x = this.parent.stage.spawnPointX;
            this.y = this.parent.stage.spawnPointY;

        }

        if(this.parent.stage.isDoor(this.x, this.y)) {

            if(this.exitedDoor == true) {
                var door = this.parent.stage.getTile(this.x,this.y);
                this.exitedDoor = false;  this.parent.stage.useDoor(door);
            }

         } else {
            this.exitedDoor = true;
        }

        if(action) this.action = action;
        this.actions[this.action]();

        // sanity checks to make sure character is always in bounds

        if(this.x < 0) this.x = this.speed;
        if(this.y < 0) this.y = this.speed;
        if(this.x > this.parent.stage.width * this.parent.stage.block) this.x = (this.parent.stage.width * this.parent.stage.block) - this.block
        if(this.y > this.parent.stage.height * this.parent.stage.block) this.y = (this.parent.stage.height * this.parent.stage.block) + this.block;
    },

    loadActions: function() {

        this.actions['stop']    = function(){ this.orient_x = 0; /* no action */ }.bind(this);
        this.actions['up']      = function(){ this.orient = 'up'; var y = this.y - this.speed; if(this.canMove(this.x, y)){ this.y = y }}.bind(this);
        this.actions['down']    = function(){ this.orient = 'down'; var y = this.y + this.speed; if(this.canMove(this.x, y)){ this.y = y }}.bind(this);
        this.actions['left']    = function(){ this.orient = 'left'; var x = this.x - this.speed; if(this.canMove(x, this.y)){ this.x = x }}.bind(this);
        this.actions['right']   = function(){ this.orient = 'right'; var x = this.x + this.speed; if(this.canMove(x, this.y)){ this.x = x }}.bind(this);
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