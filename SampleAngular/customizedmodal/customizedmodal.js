var app = angular.module("Demo", ["ngAnimate"]);

app.controller("AppController", function ($scope) {
    $scope.alertSomething = function () {
        
    }
})

app.service("modals", function ($rootScope, $q) {
    var modal = {
        deferred: null,
        params: null
    };

    return ({
        open: open,
        params: params,
        reject: reject,
        resolve: resolve
    });

    function open(type, params, pipeResponse) {
        var previousDeferred = modal.deferred;

        modal.deferred = $q.defer();
        modal.params = params;

        $rootscope.$emit("modals.open", type);

        return (modal.deferred.promise);
    }

    function params() {
        return (modal.params || {});
    }

    function reject(reason) {
        if (!modal.deferred) {
            return;
        }

        modal.deferred.reject(reason);

        modal.deferred = modal.params = null;

        $rootScope.$emit("modals.close");
    }

    function resolve(response) {
        if (!modal.deferred) {
            return;
        }

        modal.deferred.resolve(reponse);

        modal.deferred = modal.params = null;

        $rootScope.$emit("modals.close");
    }
});

app.directive("bnModals", function ($rootScope, modals) {
    return (link);

    function link(scope, element, attributes) {

    }
});

