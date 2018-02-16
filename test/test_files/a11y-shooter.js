$(document).ready(function() {

    // Variables
    var gun = document.createElement('img');

    // Setup
    gun.attr('src', window.A11yShooter.gunImgData);
    gun.css({
        'position': 'fixed',
        'left': '50%',
        'top': '50%',
        'transform': 'translate(-50%, -50%)',
    });

});
