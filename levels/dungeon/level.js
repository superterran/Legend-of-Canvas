var stage = Class.create({
level:     
    
{
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
}

});
