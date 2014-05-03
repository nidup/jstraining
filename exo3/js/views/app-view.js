/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // The main view of the application
    app.AppView = Backbone.View.extend({

        // Base the view on an existing element
        el: $('#map'),

        initialize: function(){

            this.total = $('#total span');
            this.map = $('#map');
            this.details = $('#details tbody');

            this.initializeMap(this.map);


            this.listenTo(app.creatures, 'change', this.render);

            app.creatures.each(function(creature){
                // add map view
                var view = new app.CreatureView({ model: creature });
                this.map.append(view.render().el);
                // TODO : to fix original position
                view.render();
                // add detail view
                var detailView = new app.DetailView({ model: creature });
                this.details.append(detailView.render().el);

            }, this);
        },

        initializeMap: function(mapDiv){
            var y = 0;
            var tileSize = app.game.get('tileSize');
            _.each(app.game.get('tiles'), function(row) {
                var x = 0;
                 _.each(row, function(cell) {
                     var tileDiv = $(document.createElement("div"));
                     tileDiv.addClass('tile');
                     if (cell === '#') {
                         tileDiv.addClass('trees');
                     } else if (cell === 'o') {
                         tileDiv.addClass('rock');
                     } else {
                         tileDiv.addClass('snow');
                     }
                     tileDiv.css('width', tileSize);
                     tileDiv.css('height', tileSize);
                     var posX = x*tileSize;
                     var posY = y*tileSize;
                     tileDiv.offset({left: posX, top: posY});
                     tileDiv.appendTo(mapDiv);
                     x++;
                 });
                 y++;
            });
        },
        render: function(){

            var total = 0;
            _.each(app.creatures.getChecked(), function(elem){
                total += elem.getEnergy();
            });
            this.total.text('$'+total);

            return this;
        }
    });
});
