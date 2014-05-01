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
            this.list = $('#map');

            this.listenTo(app.creatures, 'change', this.render);

            app.creatures.each(function(creature){

                var view = new app.CreatureView({ model: creature });
                this.list.append(view.render().el);
                // TODO : to fix original position
                view.render();

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
