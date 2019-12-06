//angular.module('app', [])
//  .run(function ($rootScope, $q) {


//      $rootScope.value = 'init value';

//      var promise = asyncGreet('Pavel');

//      promise.then(function (greeting) {
//          $rootScope.value = 'Success: ' + greeting + 1;
//      }, function (reason) {
//          $rootScope.value = 'Failed: ' + reason;
//      });


//      function asyncGreet(name) {

//          // perform some asynchronous operation, resolve or reject the promise when appropriate.
//          return $q(function (resolve, reject) {
//              setTimeout(function () {
//                  if (okToGreet(name)) {
//                      resolve('Hello, ' + name + '!');
//                  } else {
//                      reject('Greeting ' + name + ' is not allowed.');
//                  }
//              }, 10000);
//          });
//      }
//  });



//function okToGreet(name) {
//    return name == 'Pavel' ? true : false;
//}

//angular.module('app', [])
//  .run(function ($rootScope, $q) {
//      function processLotsOfData(data) {
//          var output = ["sample", "output"],
//              deferred = $q.defer(),
//              percentComplete = 0;

//          for (var i = 0; i < data.length; i++) {
//              //output.push(processDataItem(data[i]));
//              percentComplete = (i + 1) / data.length * 100;
//              deferred.notify(percentComplete);
//          }

//          deferred.resolve(output);

//          return deferred.promise;
//      };


//      processLotsOfData(["bill", "jef"])
//        .then(function (result) {
//            // success
//            console.log("Success")
//        }, function (error) {
//            // error
//            console.log("Error")
//        }, function (percentComplete) {
//            $scope.progress = percentComplete;
//        });
//  });


//angular.module('app', [])
//.controller('appCtrl', function ($scope, $q) {
//    function getBio() {
//        var deferred = $q.defer();
        
//        return deferred.promise;
//    }

//    getBio()
//    .then(function (bio) {
//        $scope.bio = bio;
//    }, function () {
//        console.log("Warning");
//    });
//})

angular.module('app', [])
.controller('appCtrl', ['$scope', '$q', function ($scope, $q) {
    $scope.greeting = "hello";

    var updateGreeting = function (message) {
        var deferred = $q.defer();

        setTimeout(function () {
            $scope.$apply(function () {
                deferred.resolve(message);
            });
            
        }, 5000);

        return deferred.promise;
    }

    $scope.goodbye = function () {
        $scope.greeting = updateGreeting('goodbye');
        console.log($scope.greeting);
    }
}])

/*
    Sources: 

    http://liamkaufman.com/blog/2013/09/09/using-angularjs-promises/

      From: https://stackoverflow.com/questions/3884281/what-does-the-function-then-mean-in-javascript
      By Sid

      The traditional way to deal with asynchronous calls in JavaScript has been with callbacks. 
      Say we had to make three calls to the server, one after the other, to set up our application. 
      With callbacks, the code might look something like the following (assuming a xhrGET function to make the server call):

        // Fetch some server configuration
        xhrGET('/api/server-config', function(config) {
        // Fetch the user information, if he's logged in
        xhrGET('/api/' + config.USER_END_POINT, function(user) {
            // Fetch the items for the user
            xhrGET('/api/' + user.id + '/items', function(items) {
                // Actually display the items here
            });
        });
        });

        In this example, we first fetch the server configuration. 
        Then based on that, we fetch information about the current user, and then finally get the list of items for the current user. 
        Each xhrGET call takes a callback function that is executed when the server responds.

        Now of course the more levels of nesting we have, the harder the code is to read, debug, maintain, upgrade, and basically work with. 
        This is generally known as callback hell. 
        Also, if we needed to handle errors, we need to possibly pass in another function to each xhrGET call to tell it what it needs to do in case of an error. 
        If we wanted to have just one common error handler, that is not possible.

        The Promise API was designed to solve this nesting problem and the problem of error handling.

        The Promise API proposes the following:

        1. Each asynchronous task will return a promise object.
        2. Each promise object will have a then function that can take two arguments, a success handler and an error handler.
        3. The success or the error handler in the then function will be called only once, after the asynchronous task finishes.
        4. The then function will also return a promise, to allow chaining multiple calls.
        5. Each handler (success or error) can return a value, which will be passed to the next function as an argument, in the chain of promises.
        6. If a handler returns a promise (makes another asynchronous request), then the next handler (success or error) will be called only after that request is finished.

        So the previous example code might translate to something like the following, using promises and the $http service(in AngularJs):

        $http.get('/api/server-config').then(
            function(configResponse) {
                return $http.get('/api/' + configResponse.data.USER_END_POINT);
            }
        ).then(
            function(userResponse) {
                return $http.get('/api/' + userResponse.data.id + '/items');
            }
        ).then(
            function(itemResponse) {
                // Display items here
            }, 
            function(error) {
                // Common error handling
            }
        );


        Propagating Success and Error

        Chaining promises is a very powerful technique that allows us to accomplish a lot of functionality, like having a service make a server call, do some postprocessing of the data, and then return the processed data to the controller. 
        But when we work with promise chains, there are a few things we need to keep in mind.

        Consider the following hypothetical promise chain with three promises, P1, P2, and P3. 
        Each promise has a success handler and an error handler, so S1 and E1 for P1, S2 and E2 for P2, and S3 and E3 for P3:

        xhrCall()
        .then(S1, E1) //P1
        .then(S2, E2) //P2
        .then(S3, E3) //P3

        In the normal flow of things, where there are no errors, the application would flow through S1, S2, and finally, S3. 
        But in real life, things are never that smooth. P1 might encounter an error, or P2 might encounter an error, triggering E1 or E2.

        Consider the following cases:

        • We receive a successful response from the server in P1, but the data returned is not correct, or there is no data available on the server (think empty array). 
        In such a case, for the next promise P2, it should trigger the error handler E2.

        • We receive an error for promise P2, triggering E2. But inside the handler, we have data from the cache, ensuring that the application can load as normal. 
        In that case, we might want to ensure that after E2, S3 is called.

        So each time we write a success or an error handler, we need to make a call—given our current function, is this promise a success or a failure for the next handler in the promise chain?

        If we want to trigger the success handler for the next promise in the chain, we can just return a value from the success or the error handler

        If, on the other hand, we want to trigger the error handler for the next promise in the chain, we can do that using a deferred object and calling its reject() method

        Now What is deferred object?

        Deferred objects in jQuery represents a unit of work that will be completed later, typically asynchronously. 
        Once the unit of work completes, the deferred object can be set to resolved or failed.

        A deferred object contains a promise object. 
        Via the promise object you can specify what is to happen when the unit of work completes. 
        You do so by setting callback functions on the promise object.
*/