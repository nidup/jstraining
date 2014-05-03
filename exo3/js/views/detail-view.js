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
                + '<td>' + this.model.getEnergy() + '</td>'
                + '<td>' + this.model.getPosX() + '-' + this.model.getPosY() + '</td>'
                + '<td>' + this.model.get('state').toString() + '</td>'
            );
            this.$el.removeClass('warning danger');
            if (this.model.isOutOfEnergy()) {
                this.$el.addClass( 'danger');
            } else if(this.model.needRecharge()) {
                this.$el.addClass( 'warning');
            }

            return this;
        }
    });
});
