$(document).ready(function(){

    // Initiate a new OAuth-object with proper settings
    var oauth = new OAuth({
        url: 'https://auth.debolk.nl/',     // Optional; defaults to https://auth.debolk.nl/
        client: 'reference-implementation', // Required; while these credentials work, you MUST change them through auth.debolk.nl
        secret: 'MO3632MPM3RP2K',           // Required; while these credentials work, you MUST change them through auth.debolk.nl
        callback: 'http://local.dev/',      // Required
        resource: 'mp3control',             // Required
    });

    /*Call the authenticate()-function with a callback supplied
    the callback is always called, with a single argument (status)
    that is true if the user is authorized, false if not
    Note that calling authenticate() will redirect away from your
    page if the user isn't authenticated yet */
    oauth.authenticate(function(status){
        if (status) {
            alert('You\'ve proper access to this system!');
        }
        else {
            alert('Nope, you\'re not welcome here!');
        }
    });
});
