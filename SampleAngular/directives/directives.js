//angular.module("app", [])
//.controller("appCtrl", ["$scope", function ($scope) {
//    $scope.customer = {
//        name: "Naomi 1",
//        address: "Ampitheater 1"
//    }
//}])
//.directive("myCustomer", function () {
//    return {
//        template: "Name: {{customer.name}} Address: {{customer.address}}"
//    }
//})

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function ($scope) {
//    $scope.customer = {
//        name: "Naomi 2",
//        address: "Ampitheater 2"
//    }
//}])
//.directive("myCustomer", function () {
//    return {
//        templateUrl: "new-directives.html"
//    }
//})

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function ($scope) {
//    $scope.customer = {
//        name: "Naomi 2",
//        address: "Ampitheater 2"
//    }
//}])
//.directive("myCustomer", function () {
//    return {
//        templateUrl: function (element, attr) {
//            return  attr.type + '.html';
//        }
//    }
//})

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function ($scope) {
//    $scope.customer = {
//        name: "Naomi 3",
//        address: "Ampitheater 3"
//    }
//}])
//.directive("myCustomer", function () {
//    return {
//        restrict: "E",
//        templateUrl: "new-directives.html"
//    };
//});

//angular.module("app", [])
//.controller("appCtrl1", ["$scope", function ($scope) {
//    $scope.customer = {
//        name: "Naomi 4",
//        address: "Ampitheater 4"
//    }
//}])
//.controller("appCtrl2", ["$scope", function ($scope) {
//    $scope.customer = {
//        name: "Naomi 5",
//        address: "Ampitheater 5"
//    }
//}])
//.directive("myCustomer", function () {
//    return {
//        templateUrl: "new-directives.html"
//    }
//})

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function ($scope) {
//    $scope.naomi = {
//        name: "Naomi 6",
//        address: "Ampitheater 6"
//    };
//    $scope.igor = {
//        name: "Igor",
//        address: "Somewhere else"
//    };

//}])
//.directive("myDirective", function () {
//    return {
//        restrict: "E",
//        //$scope.customerInfo=info="naomi"
//        //$scope.customerInfo=info="igor"
//        /*
//        scope: {
//          // same as '=customer'
//          customer: '='
//        },
//        */
//        scope: {
//            customerInfo: "=info"
//        },
//        templateUrl: "new-directives.html"
//    }
//})

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function (s) {
//    s.format = "M/d/yy h:mm:ss a"
//}])
//.directive("currentTime", ["$interval", "dateFilter", function (i, d) {
//    function l(scope, element, attr) {
//        var timeOutId, format;

//        function updateTime() {
//            element.text(d(new Date(), format));
//        }

//        scope.$watch(attr.currentTime, function (value) {
//            format = value;
//            updateTime();
//        })

//        element.on("$destroy", function () {
//            i.cancel(timeOutId);
//        })

//        timeOutId = i(function () {
//            updateTime();
//        }, 1000)
//    }

//    return {
//        link: l
//    }
//}])

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function (s) {
//    s.name = "John";
//}])
//.directive("myDialog", function () {
//    return {
//        restrict: "E",
//        transclude: true,
//        scope: {},
//        templateUrl: "new-directives.html"
//    }
//})

//angular.module("app", [])
//.controller("appCtrl", ["$scope", function (s) {
//    s.name = "John";
//}])
//.directive("myDialog", function () {
//    return {
//        restrict: "E",
//        transclude: true,
//        templateUrl: "new-directives.html",
//        link: function (scope) {
//            scope.name = "Janjan";
//        }

//    }
//})

angular.module("app", [])
.controller("appCtrl", ["$scope", "$timeout", function (s, t) {
    s.name = "John";
    s.message = "";
    s.hideDialog = function (message) {
        s.message = message;
        s.dialogIsHidden = true;
        t(function () {
            s.message = "";
            s.dialogIsHidden = false;
        }, 2000);
    };

}])
.directive("myDialog", function () {
    return {
        restrict: "E",
        transclude: true,
        scope:{
            close:"&onClose"
        },
        templateUrl: "new-directives.html",
    }
})
