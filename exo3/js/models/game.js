/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Game model
    app.Game = Backbone.Model.extend({
        defaults:{
            tiles: [],
            tileSize: 20,
            maxTileX: 0,
            maxTileY: 0,
            graph: null,
            treeChar: '#',
            rockChar: 'o',
            snowChar: ' ',
            fps: 3,
            intervalId: null
        },
        initialize: function(){
            // for rendering
            var tiles = [
                "####################################",
                "#      #    #      ##             ##",
                "#                       ##         #",
                "#          #####        ###        #",
                "##    o    #   #    ##             #",
                "###           ##     #             #",
                "#           ###      #             #",
                "#   ###                            #",
                "#    ###                    #o     #",
                "#   ####       ##           oo     #",
                "#   ###         ####               #",
                "#                ###         ##    #",
                "#   ####          ###       ####   #",
                "#   ####                  ##oo#    #",
                "#   ##                  oooooo     #",
                "#                     ooo          #",
                "#                    ooooo         #",
                "#                     ooo          #",
                "#                      o#          #",
                "#                      ##          #",
                "#          ######      ##          #",
                "#           ####       o#ooo       #",
                "#            ##             o      #",
                "#o                 ##              #",
                "#                 ####             #",
                "#                  ####            #",
                "#                     ##           #",
                "#                      #           #",
                "#    #             #           ### #",
                "#    #            ##               #",
                "####################################"];
            this.set('tiles', tiles);
            var maxTileX = tiles[0].length;
            var maxTileY = tiles.length;
            this.set('maxTileX', maxTileX);
            this.set('maxTileY', maxTileY);
            // for path finding
            var initGraph = [];
            for (var indX = 0; indX < maxTileX; indX++) {
                initGraph[indX]= [];
                for (var indY = 0; indY < maxTileY; indY++) {
                    if (tiles[indY].charAt(indX) === ' ') {
                        initGraph[indX][indY]= 1;
                    } else {
                        initGraph[indX][indY]= 0;
                    }
                }
            }
            this.set('graph', new Graph(initGraph));
        },
        start: function(){
            this.set('intervalId', setInterval(this.run, 1000 / this.get('fps')));
            return this;
        },
        stop: function(){
            clearInterval(this.get('intervalId'));
            return this;
        },
        run: function(){
            var hasOneAlive = false;
            app.creatures.each(function(creature){
                if (!creature.isOutOfEnergy()) {
                    hasOneAlive = true;
                    creature.act();
                }
            });

            if (!hasOneAlive) {
                this.stop();
            }

            return this;
        },
        isAvailableTile: function(x, y){
            var tiles = this.get('tiles');
            var tile = tiles[y][x];
            if (tile === this.get('treeChar') || tile === this.get('rockChar')) {
                return false;
            }
            var isAvailable = true;
            app.creatures.each(function(creature){
                if (creature.getPosX() === x && creature.getPosY() === y) {
                    isAvailable = false;
                }
            });
            if (x >= app.base.getPosX() && x <= app.base.getMaxPosX()
                && y >= app.base.getPosY() && y <= app.base.getMaxPosY()) {
                isAvailable = false;
            }

            return isAvailable;
        },
        getShortestPath: function(startX, startY, endX, endY) {
            var start = this.get('graph').nodes[startX][startY];
            var end = this.get('graph').nodes[endX][endY];
            var nodes = astar.search(this.get('graph').nodes, start, end, false);
            var debug = false;
            if (debug === true) {
                for (var ind = 0; ind < nodes.length; ind++) {
                    var id = '#x'+nodes[ind].x+'y'+nodes[ind].y;
                    $(id).addClass('highlight');
                }
            }

            return nodes;
        }
    });
});
