var rest = angular.module('rest', ['ngResource'])
    .factory('RestResources', function (
        $resource) {
        var service = {};

        service.Project = $resource("/search/projects/:key", {key:'@id'});
        service.Projects = $resource("/search/projects", {});
        service.ProjectsLike = $resource("/search/projects/like/:string", {string:'@id'});
        service.Issue = $resource("/search/issue/:key", {key:'@id'});
        service.Issues = $resource("/search/issues/:projectKey", {projectKey:'@id'});
        service.IssuesLike = $resource("/search/issues/like/:string", {string:'@id'});

        return service;
    })

    .factory('RestService', function (
        RestResources,
        DeferredWrapper) {

        return {
            getProject: function(key){
                return DeferredWrapper.deferredGet(RestResources.Project, {key: key});
            },
            getProjects: function(){
                return DeferredWrapper.deferredQuery(RestResources.Projects);
            },
            getProjectsStartingWith: function(string) {
                return DeferredWrapper.deferredQuery(RestResources.ProjectsLike, {string: string});
            },
            getIssue: function(key){
                return DeferredWrapper.deferredGet(RestResources.Issue, {key: key});
            },
            getIssues: function(projectKey) {
                return DeferredWrapper.deferredQuery(RestResources.Issues, {projectKey: projectKey});
            },
            getIssuesStartingWith: function(string) {
                return DeferredWrapper.deferredQuery(RestResources.IssuesLike, {string: string});
            },
        };
    })

    .factory('DeferredWrapper', function (
    $resource,
    $q) {
        /**
         * Wraps a function with a deferred object, returning a promise. This is done, so that we can
         * pass on asynchronous functions.
         *
         * @param func
         * @param resource
         * @param paramObject
         * @returns {*}
         */
        var deferredFunc = function(func, resource, paramObject) {
            var deferred = $q.defer();

            func(paramObject, function(response) {
                //removing $promise and other angular related array entries
                return deferred.resolve(angular.fromJson(angular.toJson(response)));
            });

            return deferred.promise;
        };

        return {
            /**
             * Wraps the query method of the resource with a deferred object.
             *
             * @param resource
             * @param paramObject
             * @returns {*}
             */
            deferredQuery : function(resource, paramObject) {
                return deferredFunc(resource.query, resource, paramObject);
            },
            /**
             * Wraps the get method of the resource with a deferred object.
             *
             * @param resource
             * @param paramObject
             * @returns {*}
             */
            deferredGet : function(resource, paramObject) {
                return deferredFunc(resource.get, resource, paramObject);
            }
        }
    })
;