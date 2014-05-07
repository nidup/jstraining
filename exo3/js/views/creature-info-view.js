/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // This view turns a Creature model into HTML
    app.CreatureInfoView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html(
                '<td>' + this.model.getName() + '</td>'
                + '<td>' + this.model.getEnergy() + '</td>'
                + '<td>' + this.model.getLoading() + '</td>'
                + '<td>' + this.model.getPosX() + '-' + this.model.getPosY() + '</td>'
                + '<td>' + this.model.getDirection() + '</td>'
                + '<td>' + this.model.getState().toString() + '</td>'
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
