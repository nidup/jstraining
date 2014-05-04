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

            var view = new app.BaseView({ model: app.base });
            this.map.append(view.render().el);

            app.mines.each(function(mine){
                var view = new app.MineView({ model: mine });
                this.map.append(view.render().el);
                view.render(); // TODO : to fix original rendering
            }, this);

            app.creatures.each(function(creature){
                // map view
                var view = new app.CreatureView({ model: creature });
                this.map.append(view.render().el);
                view.render(); // TODO : to fix original rendering
                // detail view
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
                     tileDiv.attr('id', 'x'+x+'y'+y);
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
