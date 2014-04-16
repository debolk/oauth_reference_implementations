$(document).ready(function(){
    //FIXME Add an example of using the class

    var oauth = new OAuth({
        url: 'https://auth.debolk.nl/',
        client: 'test-dev',
        secret: '1234',
        callback: 'http://local.dev/',
        resource: 'mp3control',
    });
});
