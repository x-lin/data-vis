var rest = angular.module('rest', ['ngResource']);

rest.factory('RestService', function (
    $resource
) {
    //var testUrl = '/data-vis?name="sdfsd"';
    //
    //var sendRequest = function(url, callbackFunc) {
    //    $resource .get(url).then(callbackFunc);
    //};

    return {
        getTestData : function() {
            var resource = $resource("/data-vis",
                {},
                {
                    get: {method: "GET", params: {name: "1234"}, isArray:false}
                });

            resource.get(function(response) {
                console.log(response.name + " : " + response.mail + " : " + response.link);
            });


        }
    }
});