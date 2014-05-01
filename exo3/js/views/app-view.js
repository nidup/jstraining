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

        render: function(){

            var total = 0;
            _.each(app.creatures.getChecked(), function(elem){
                total += elem.get('hp');
            });
            this.total.text('$'+total);

            return this;
        }
    });
});
