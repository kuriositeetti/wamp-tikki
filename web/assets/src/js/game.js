(function(){
'use strict';

var app = angular.module('app', ['player_module']);

// FACTORY GAME

app.factory('game', [function(){
    var game_service = {};
    var game = {};

    game.players = [];
    game.player = function(){
        this.cards = [];
    };
    // hard-coded player amounts
    game.players.push(new game.player());
    game.players.push(new game.player());
    game.players.push(new game.player());
    game.deck = [];

    console.log('players: ', game.players);

    game.init_round = function(){
        game.reset_deck();
        game.deal();
    }

    game.reset_deck = function(){
        game.deck = [];
        game.create_suit('hearts', 'red', '\u2665');
        game.create_suit('clubs', 'black', '\u2663');
        game.create_suit('diamonds', 'red', '\u2666');
        game.create_suit('spades', 'black', '\u2660');
    }

    game.create_suit = function(suit, color, code){
        for(var i = 2; i <= 14; i++){
            var card_display_value = '';
            switch(i){
                case 11:
                    card_display_value = 'J';
                break;
                case 12:
                    card_display_value = 'Q';
                break;
                case 13:
                    card_display_value = 'K';
                break;
                case 14:
                    card_display_value = 'A';
                break;
                default:
                    card_display_value = i;
                break;
            }
            game.deck.push({ card_value: i, card_suit: suit, card_display_value: card_display_value, card_suit_color: color, card_suit_code: code });
        }
    }

    game.deal = function(){
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < game.players.length; j++){
                //console.log(j, ': ', game.players[j]);
                game.players[j].cards.push(game.draw_card());
            }
        }
    }

    game.draw_card = function(){
        var random_index = game.random_from_range(0, game.deck.length - 1)
        var new_card = game.deck[random_index];
        game.deck.splice(random_index, 1);
        console.log(game.deck.length);

        return new_card;
    }

    game.random_from_range = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    game_service.get_player_cards = function(player_id){
        return game.players[player_id].cards;
    }

    game.init_round();

    return game_service;
}]);

// MODULE PLAYER

var player_module = angular.module('player_module', []);

player_module.directive('player', ['game', function(game){ return {
    restrict: 'C',
    template: '<ul class="cards"><li class="card" data-ng-class="x.card_suit_color" data-ng-repeat="x in cards | orderBy:[\'card_suit\', \'card_value\']">{{ x.card_display_value }}<br>{{ x.card_suit_code }}</li></ul>',
    scope: {},
    controller: function($scope){},
    link: function(scope, el, attr){
        scope.game = game;
        scope.cards = scope.game.get_player_cards(attr.id);
    }
}}]);

}());
