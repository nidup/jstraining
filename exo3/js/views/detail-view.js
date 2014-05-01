/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // This view turns a Creature model into HTML
    app.DetailView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html(
                '<td>' + this.model.get('name') + '</td>'
                + '<td>' + this.model.get('hp') + '</td>'
                + '<td>' + this.model.get('maxHp') + '</td>'
                + '<td>' + this.model.get('posX') + '-' + this.model.get('posY') + '</td>'
            );

            return this;
        }
    });
});
