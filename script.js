var ionApp = angular.module('ionAppH', ['ionic', 'ngResource']);

ionApp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/menu.html"
    })
    .state('eventmenu.main', {
      url: "/main",
      views: {
        'menuContent' :{
          templateUrl: "templates/main.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.page1', {
      url: "/page1",
      views: {
        'menuContent' :{
          templateUrl: "templates/page1.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.page2', {
      url: "/page2",
      views: {
        'menuContent' :{
          templateUrl: "templates/page2.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.meta', {
      url: "/meta",
      views: {
        'menuContent' :{
          templateUrl: "templates/meta.html",
          controller: "MainCtrl"
        }
      }
    });
  
  $urlRouterProvider.otherwise("/event/main");

  $httpProvider.defaults.headers.common = {
   'x-apikey': '569a2b87566759cf4b984a50'
  };

});

ionApp.run( function ($rootScope, $http, DBservice) {
  var ii = 0;  var jj = 0;

  DBservice.getMeta;
  DBservice.getContact();
  // $rootScope.ngrContact = DBservice.ngrContact().get({id: '5630807cb153815f00000058'}); 
  $rootScope.ngrContact = DBservice.ngrContact('{"comment":"test"}').query();  
  $rootScope.prod = DBservice.getAll('{"serialno": {"$bt": [400, 999]}}').query();
});

ionApp.controller('MainCtrl', function($rootScope, $scope, $ionicSideMenuDelegate,
     $ionicModal, $ionicActionSheet, $ionicPopup, $timeout, DBservice) {
 // controller stuff here
});

// DB Service
ionApp.factory ('DBservice', function ($rootScope, $http, $resource) {

var _getContact = function () {
  $http.get('https://rdb-simpledb.restdb.io/rest/contact?&sort=_changed&dir=-1')
   .success(function (jsonData) {
     $rootScope.allContacts = jsonData;
  });
};

var _getMeta = function () {
  // $http.get('https://rdb-simpledb.restdb.io/rest/_meta')
  // $http.get('https://rdb-simpledb.restdb.io/rest/product/_meta')
  $http.get('https://rdb-simpledb.restdb.io/rest/contact/_meta')
   .success(function (jsonData) {
     $rootScope.getMeta = jsonData;
   });
};

var _ngrContact = function (xp) {
  var url = 'https://rdb-simpledb.restdb.io/rest/contact';
  if (xp > ' ') {
    url += '?&q=' + xp;
   }  else {
    url += '/:id';
  }  
  return $resource(url,
   {id: '@_id'}, {
    update: {
      method: 'PUT' // this method issues a PUT request  
   }
  });
};

var _ngrProduct = function (xp) {
  var url = 'https://rdb-simpledb.restdb.io/rest/product';
  if (xp > ' ') {
    url += '?&q=' + xp;
   }  else {
    url += '/:id';
  }  
  return $resource(url,
   {id: '@_id'}, {
    update: {
      method: 'PUT' // this method issues a PUT request  
   }
  });
};

  return {
    getMeta: _getMeta(),
    getContact: _getContact,
    getAll: _ngrProduct,  
    ngrContact: _ngrContact  // get({id: '587539877b9ba00600000455'})
  };

/* 
  
  // Alpha Vantage ::  https://www.alphavantage.co/query?function=SECTOR&apikey=52DCT7KVVJXBU7VT
  
var Todo = $resource('https://rdb-simpledb.restdb.io/rest/contact/:id');

// create new record
var todo1 = new Todo();
todo1.foo = 'bar';
todo1.something = 123;
todo1.$save();

// update record
Todo.get({id: '5875445d7b9ba006000005f5'}, function(todo) {
  todo.foo += '!lee';
  todo.$save();
});

// get list of records
Todo.query(function(todos) {
  //do something with todos
  angular.forEach(todos, function(todo) {
     todo.foo += 'bEach!';
     todo.$save();
  });
});

// delete a record
Todo.$delete({id: 123});

*/

});
