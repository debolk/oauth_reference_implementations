var OAuth = (function(config){
    //FIXME Rewrite explictly as a jQuery plugin

    var getURLParameter = function (name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    };

    var access_token = null;
    var authorization_token = null;
    var config = config;

    return {
        authenticate: function(callback){
            var authorization_token = getURLParameter('code');
            if (authorization_token === 'null') {  // Yes, this is correct
                // Not authenticated, must login
                window.location = config.url+'authorize?response_type=code&client_id='+config.client+'&client_pass='+config.secret+'&redirect_uri='+config.callback+'&state=1';
            }
            else {
                // Logged in, request access_token to access services
                $.ajax({
                    method: 'POST',
                    url: config.url+'token',
                    dataType: 'JSON',
                    data: {
                        grant_type: 'authorization_code',
                        code: authorization_token,
                        redirect_uri: config.callback,
                        client_id: config.client,
                        client_secret: config.secret,
                    },
                    success: function(result){
                        // Store the access token for later usage
                        this.access_token = result.access_token;
                        // Clear the browser URL for cleaner reloads
                        history.pushState(null, '', config.callback);

                        // Check for authorization
                        $.ajax({
                            method: 'GET',
                            url: config.endpoint+config.resource+'?access_token='+this.access_token,
                            success: callback(true),
                        });
                    },
                    error: callback(false),
                });
            }
        },
    };
});