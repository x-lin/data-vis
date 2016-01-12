

rest.factory('RestService', function (
    $resource
) {
    return {
        getProjects : function() {
            var resource = $resource("/search/projects",
                {},
                {
                    get: {method: "GET", isArray: true}
                });
            return resource;
        },
        getIssues : function() {
            var resource = $resource("/search/issues/:projectKey",
                {projectKey:'@id'},
                {
                    get: {method: "GET", isArray:true}
                }
            );
            return resource;
        },
        getProject : function() {
            return $resource("/search/projects/:key",
                {key:'@id'},
                {
                    get: {method: "GET"}
                }
            );
        },
        getIssuesStartingWith : function() {
            var resource = $resource("/search/issues/like/:string",
                {string:'@id'},
                {
                    get: {method: "GET", isArray:true}
                }
            );
            return resource;
        },
        getIssue : function() {
            var resource = $resource("/search/issue/:key",
                {key:'@id'},
                {
                    get: {method: "GET"}
                }
            );
            return resource;
        },
    }
});