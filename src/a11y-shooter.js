var jqueryScript = document.createElement('script');
jqueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.3.1.min.js');
jqueryScript.setAttribute('integrity', 'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=');
jqueryScript.setAttribute('crossorigin', 'anonymous');
jqueryScript.onload = function() {
    $(document).ready(function() {

        // Variables
        var
        gun = $(document.createElement('img')),
        bang = $(document.createElement('img')),
        styles = $(document.createElement('style')),
        clip = $(document.createElement('input')),
        feed = function(str) {
            var div = $(document.createElement('div'));
            div.html(str);
            div.css({
                'position': 'fixed',
                'bottom': '300px',
                'right': '15px',
                'width': '250px',
                'text-align': 'center',
                'z-index': '1000',
                'animation': 'feedFlow 2s',
                'font-size': '22px',
                'font-weight': 'bold',
                'color': 'red',
            });
            $('body').append(div);
            setTimeout(function() {
                div.remove();
            }, 2000);
        };

        // Setup styles
        styles.html('@keyframes glowingBorders { 0% { border: 2px solid red } 50% { border: 4px solid red; margin: 3px; } 100% { border: 2px solid red } }');
        styles.html(styles.html() + '@keyframes feedFlow { 100% { bottom: 400px; opacity: 0; } }');
        styles.html(styles.html() + 'img { margin: 5px; }');
        $('head').append(styles);

        // Setup gun
        gun.attr('src', window.A11yShooter.gunImgData);
        gun.attr('id', 'a11y-gun');
        gun.css({
            'position': 'fixed',
            'right': '0px',
            'bottom': '0px',
            'transform-origin': '50% 50%',
            'transform': 'rotate(45deg)',
            'z-index': '9000',
        });
        $('body').append(gun);

        // Setup bang
        bang.attr('src', window.A11yShooter.bangImgData);
        bang.attr('id', 'a11y-gun');
        bang.css({
            'display': 'none',
            'position': 'fixed',
            'right': '11px',
            'bottom': '127px',
            'transform-origin': '50% 50%',
            'transform': 'rotate(45deg) scale(0.3)',
            'z-index': '9020'
        });
        $('body').append(bang);

        // Add CSS to body
        $('body').css({
            'cursor': 'crosshair',
        });

        // Setup clip
        clip.attr('id', 'a11y-gun-clip');
        clip.css({
            'position': 'fixed',
            'right': '0',
            'bottom': '165px',
            'width': '210px',
            'font-size': '36px',
            'background-color': 'rgba(255,255,255,0.8)',
            'border': '2px solid black',
            'padding': '5px',
            'transform-origin': '50% 50%',
            'transform': 'rotate(45deg)',
            'z-index': '9010',
        });
        $('body').append(clip);

        // Make target images flash
        $('img').each(function(i, e) {
            var img = $(e);
            if(img.attr('id') !== 'a11y-gun') {
                img.css({
                    'animation': 'glowingBorders 1s infinite'
                });
                img.addClass('shootable');
            }
        });

        // If a letter/number is typed anywhere, focus the input
        $(document).keydown(function(event) {
            if((event.keyCode >= 48 && event.keyCode <= 57) || // Number
               (event.keyCode >= 65 && event.keyCode <= 90) || // Uppercase letter
               (event.keyCode >= 97 && event.keyCode <= 122)) { // Lowercase letter
                   clip.focus();
            }
        });

        // Make the gun move slightly as the mouse moves
        $(document).mousemove(function(e) {
            var
            wd = $(window).width(),
            ht = $(window).height(),
            x = e.clientX,
            y = e.clientY,
            distX = 1 - (x / wd),
            distY = 1 - (y / ht),
            moveAmount = 50;

            gun.css({
                'right': (moveAmount * distX) + 'px',
                'bottom': (moveAmount * distY) + 'px',
            });
            clip.css({
                'right': (moveAmount * distX) + 'px',
                'bottom': (165 + (moveAmount * distY)) + 'px'
            });
            bang.css({
                'right': (11 + (moveAmount * distX)) + 'px',
                'bottom': (127 + (moveAmount * distY)) + 'px'
            });
        });

        // GAME LOGIC
        $(document).click(function(e) {
            e.preventDefault();
            if(clip.val() !== '') {
                if($(e.target).hasClass('shootable')) {
                    // Shoot the word
                    var word = clip.val();
                    $(e.target).attr('alt', word);
                    clip.val('');

                    // Display bang
                    bang.css('display', 'block');
                    setTimeout(function() {
                        bang.css('display', 'none');
                    }, 35);

                    clip.focus();
                    feed('Nice shot!');
                }
                else {
                    feed('You must shoot the word at an image!')
                }
            }
            else {
                feed('Type a word to shoot it!');
            }
        });

    });

};

document.getElementsByTagName('body')[0].appendChild(jqueryScript);
