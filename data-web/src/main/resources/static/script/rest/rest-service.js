var rest = angular.module('rest', ['ngResource'])
    .factory('RestResources', function (
        $resource) {
        var service = {};

        service.Project = $resource("/search/projects/:key", {key:'@id'});
        service.Projects = $resource("/search/projects/all", {});
        service.ProjectsLike = $resource("/search/projects/startLike/:string", {string:'@id'});
        service.ProjectsByIssue = $resource("/search/projects/indirect", {value:'@id', key: 'issue', limit: 10});
        service.ProjectNeighbors = $resource("/search/projects/neighbors/:key", {key:'@id', limit: 20});

        service.Issue = $resource("/search/issues/:key", {key:'@id'});
        service.Issues = $resource("/search/issues/indirect", {value:'@id', key: 'project', limit: 10});
        service.IssuesLike = $resource("/search/issues/startLike/:string", {string:'@id', limit: 10});
        service.IssueNeighbors = $resource("/search/issues/neighbors/:key", {key:'@id', limit: 20});

        service.Requirement = $resource("/search/reqs/:key", {key:'@id'});
        service.RequirementsLike = $resource("/search/reqs/startLike/:string", {string:'@id', limit: 10});
        service.RequirementNeighbors = $resource("/search/reqs/neighbors/:key", {key:'@id', limit: 20});

        service.User = $resource("/search/users/:key", {key:'@id'});
        service.UsersLike = $resource("/search/users/startLike/:string", {string:'@id', limit: 10});
        service.UserNeighbors = $resource("/search/users/neighbors/:key", {key:'@id', limit: 20});

        return service;
    })

    .factory('RestService', function (
        RestResources,
        DeferredWrapper) {

        return {
            getNeighbors: function(type, key) {
                if(type === "Project") {
                    return DeferredWrapper.deferredGet(RestResources.ProjectNeighbors, {key: key});
                } else if(type === "Issue") {
                    return DeferredWrapper.deferredGet(RestResources.IssueNeighbors, {key: key});
                } else if(type === "Requirement") {
                    return DeferredWrapper.deferredGet(RestResources.RequirementNeighbors, {key: key});
                } else if(type === "User") {
                    return DeferredWrapper.deferredGet(RestResources.UserNeighbors, {key: key});
                }
            },
            getEntity: function(type, key) {
                if(type === "Project") {
                    return DeferredWrapper.deferredGet(RestResources.Project, {key: key});
                } else if(type === "Issue") {
                    return DeferredWrapper.deferredGet(RestResources.Issue, {key: key});
                } else if(type === "Requirement") {
                    return DeferredWrapper.deferredGet(RestResources.Requirement, {key: key});
                } else if(type === "User") {
                    return DeferredWrapper.deferredGet(RestResources.User, {key: key});
                }
            },
            getEntityStartingWith: function(type, string) {
                if(type === "Project") {
                    return DeferredWrapper.deferredQuery(RestResources.ProjectsLike, {string: string});
                } else if(type === "Issue") {
                    return DeferredWrapper.deferredQuery(RestResources.IssuesLike, {string: string});
                } else if(type === "Requirement") {
                    return DeferredWrapper.deferredQuery(RestResources.RequirementsLike, {string: string});
                } else if(type === "User") {
                    return DeferredWrapper.deferredQuery(RestResources.UsersLike, {string: string});
                }
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