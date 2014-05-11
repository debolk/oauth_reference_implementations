var OAuth = (function(options){

    // Supply default options
    options = $.extend({
        url: 'https://auth.debolk.nl/',
    }, options);

    var getURLParameter = function (name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    };

    var access_token = null;
    var authorization_token = null;

    return {
        authenticate: function(callback){
            var authorization_token = getURLParameter('code');
            if (authorization_token === 'null') {  // Yes, this is correct
                // Not authenticated, must login
                window.location = options.url+'authorize?response_type=code&client_id='+options.client+'&client_pass='+options.secret+'&redirect_uri='+options.callback+'&state=1';
            }
            else {
                // Logged in, request access_token to access services
                $.ajax({
                    method: 'POST',
                    url: options.url+'token',
                    dataType: 'JSON',
                    data: {
                        grant_type: 'authorization_code',
                        code: authorization_token,
                        redirect_uri: options.callback,
                        client_id: options.client,
                        client_secret: options.secret,
                    },
                    success: function(result){
                        // Store the access token for later usage
                        this.access_token = result.access_token;
                        // Clear the browser URL for cleaner reloads
                        history.pushState(null, '', options.callback);

                        // Check for authorization
                        $.ajax({
                            method: 'GET',
                            url: options.endpoint+options.resource+'?access_token='+this.access_token,
                            success: callback(true),
                        });
                    },
                    error: callback(false),
                });
            }
        },
    };
});
