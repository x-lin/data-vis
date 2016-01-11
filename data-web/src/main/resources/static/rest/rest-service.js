

rest.factory('RestService', function (
    $resource
) {
    return {
        getProjects : function() {
            console.log("abc");
            var resource = $resource("/search/projects",
                {},
                {
                    get: {method: "GET", isArray: true}
                });
            return resource;
        },
        getIssues : function() {
            console.log("fetching issues");
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
        }
    }
});