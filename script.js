// Code goes here

(function() {

  // Create new module called bookViewer
  var app = angular.module("bookViewer", []);

  var MainController = function($scope, $http) {

    $scope.message = "Welcome to the Book Viewer!";
    $scope.bookSortOrder = "";
    $scope.searchterm = "harrypotter";
    $scope.countdown = 5;

    var onSuccess = function(response) {
      $scope.books = response.data;
    };

    var onError = function(error) {
      $scope.error = "Search request failed";
    };
    
    //invoke once a second to time limit input
    var decrementCountdown = function() {
        $scope.countdown -= 1;
        if ($scope.countdown < 1){
            $scope.search($scope.searchterm);
        }
    };

    $scope.search = function(searchterm){
        $http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchterm)
          .then(onSuccess, onError);
    };
    

  };
  
  app.controller("MainController", ["$scope", "$http", MainController]);


}());