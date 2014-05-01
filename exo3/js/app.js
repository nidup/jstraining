/*global $ */
var app = app || {};

$(function(){
	'use strict';

    var tileSize = 30;

    // Create a model for the creatures
    var Creature = Backbone.Model.extend({
        defaults:{
            name: 'My creature',
            hp: 100,
            maxHp: 100,
            checked: false,
            posX: 0,
            posY: 0
        },
        toggle: function(){
            this.set('checked', !this.get('checked'));
        }
    });

    // Create a collection of creatures
    var CreatureList = Backbone.Collection.extend({
        model: Creature,
        getChecked: function(){
            return this.where({checked:true});
        }
    });

    // Prefill the collection with a number of creatures.
    var creatures = new CreatureList([
        new Creature({ name: 'Foo', hp: 80}),
        new Creature({ name: 'Bar', hp: 75, posX: 3, posY: 3}),
        new Creature({ name: 'Baz', hp: 100, posX: 4, posY:5}),
    ]);

    // This view turns a Creature model into HTML
    var CreatureView = Backbone.View.extend({
        tagName: 'div',

        events:{
            'click': 'toggleCreature'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html(
                '<div class="creature">'
                + '<span>' + this.model.get('name') + '</span>'
                + '<span>' + this.model.get('hp') + '</span>'
                + '</div>'
            );
            var posX = this.model.get('posX') * tileSize;
            var posY = this.model.get('posY') * tileSize;
            this.$el.offset({left: posX, top: posY});
            this.$el.css('width', tileSize);
            this.$el.css('height', tileSize);

            console.log(posX + ' ' + posY); 

            return this;
        },

        toggleCreature: function(){
            this.model.toggle();
        }
    });

    // The main view of the application
    app.AppView = Backbone.View.extend({

        // Base the view on an existing element
        el: $('#map'),

        initialize: function(){

            this.total = $('#total span');
            this.list = $('#map');

            this.listenTo(creatures, 'change', this.render);

            creatures.each(function(creature){

                var view = new CreatureView({ model: creature });
                this.list.append(view.render().el);
                // TODO : to fix original position
                view.render();

            }, this);
        },

        render: function(){

            var total = 0;
            _.each(creatures.getChecked(), function(elem){
                total += elem.get('hp');
            });
            this.total.text('$'+total);

            return this;
        }
    });

    new app.AppView();

});
