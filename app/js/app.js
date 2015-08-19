/**
 * Created by FLX on 11.08.2015.
 */

'use strict';

// module: Ein Modul ist eine Sammlung von Controllern, Services, Filtern und Direktiven
var app = angular.module('pizzaApp', ['ngRoute', 'ngAnimate']);

/*app.all('*', function (req, res) {
    res.sendFile(__dirname+'/index.html') /!* <= Where my ng-view is located *!/
});*/

    // letz route
    app.config(function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: "templates/start.html",
            controller: ""
        })
        .when('/order', {
            templateUrl: "templates/order.html",
            controller:""
        })
        .when('/configurate', {
            templateUrl: "templates/configurate.html",
            controller:""
        })
        .when('/staff', {
            templateUrl: "templates/staff.html",
            controller: ""
        })
        .when('/summary', {
            templateUrl: "templates/summary.html",
            controller: ""
        })
        .when('/adress', {
            templateUrl: "templates/adress.html",
            controller: ""
        })
        .when('/whatthehell', {
            templateUrl: "templates/wth.html",
            controller: ""
        })
        .otherwise({
                redirectTo: '/'
        });
    });


    //directive preis = 0 -> gratis
    app.directive('price', function(){
        return{
            restrict: 'E',
            //isolated by scope
            scope: {
                value: '='
            },
            template: '<span ng-show="value == 0">gratis</span>' +
            '<span ng-show="value > 0">{{value | currency}}</span>'
        };
    });



    // factory cart
    app.factory('Cart', function() {
        var items = [];
        return {
            getItems: function() {
                return items;
            },
            addArticle: function(article) {
                items.push(article);
            },
            sum: function() {
                return items.reduce(function(total, article) {
                    return total + article.price;
                }, 0);
            }
        };
    });


    // factory myOwnPizza
    app.factory('Pizza', function(){
        //empty pizza
        var pizza =[];
        //var hasbasic = false;
            return{
                getIngredients: function(){
                    return pizza;
                },

                addIngredients: function(zutat){
                    pizza.push(zutat);
                    //alert(zutat);
                },
                sum: function(){
                    return pizza.reduce(function(total, zutat){
                        return total + zutat.cost;
                    }, 0)
                },
                addBasic: function(zutat){
                    // push first in ingredients-array: 'basic pizza' to pizza-array
                    pizza.push(zutat[0]);

                }
            };
    });


    // article controller with Cart factory
    app.controller("ArticlesCtrl",  function($scope, $http, Cart){
        $scope.cart = Cart;
        $http.get('data/foodlist.json').then(function(articlesResponse){
            //$http is a promise here
            $scope.articles = articlesResponse.data;
        });

    });

    // Cart controller
    app.controller("CartCtrl", function($scope, Cart){
        $scope.cart = Cart;
    });


    // myownPizza Controller
    app.controller("PizzaCtrl", function($scope, Pizza ){
        $scope.pizza = Pizza;

    });



    // controller for ingredients with OwnPizza
    app.controller("ingredientsCtrl", function($scope, $http, Pizza){
        $scope.pizza = Pizza;
        $http.get('data/ingredients.json').then(function(ingredientsResponse){
            $scope.ingredients = ingredientsResponse.data;

        });
    });



    // our footer is served on a pizzablech.
    app.directive('pizzablech', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            templateUrl: "templates/footer.html",
            controller: ""
        };
    });


    // myownPizza Controller
  /*  app.controller("formService", function($scope, formResponse){
        $scope.finalperson = formResponse;

    });*/

    // Person Data controller
    app.controller("PersonCtrl",  ['$scope', function($scope){
        $scope.persondata ={};

        $scope.finalperson ={};
        $scope.personSubmit = function(){
            $scope.finalperson = angular.copy($scope.persondata);

            //$scope.finalperson = formService.saveFormService(persondata);

            console.log(this.persondata);
            console.log(this.finalperson);

        }
    }]);

    app.controller("ExampleCtrl", ['$scope',  function($scope){

        $scope.masta = {};

        $scope.update = function(user){
            $scope.masta = angular.copy(user);

            console.log("masta is now:" + $scope.masta);
            //console.log("extdata is now:" +exampleService.exdata)
        };

    }]);

