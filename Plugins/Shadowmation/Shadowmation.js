(function ($) {
    /***********************************************************
     ************************************************************
	 Shadowmation v1.1.0
	 A jQuery Plugin Animating CSS3 box-shadow property
     © Jacob Heater
     ************************************************************
     ************************************************************/
    $.fn.Shadowmation = function (options) {
        //For maintaining the context of the jQuery object.
        var $this = this;
        //Settings that can be customized
        var settings = $.extend({
            defaultX: 0,
            defaultY: 0,
            endX: 15,
            endY: 15,
            defaultBlur: 0,
            endBlur: 15,
            defaultSpread: 0,
            endSpread: 0,
            forwardColor: 'black',
            backwardColor: 'black',
            speed: 1,
            isInset: false,
            trigger: 'mouseover',
            forwardOnly: false
        }, typeof options === 'object' ? options : {});

        //Checks if the forward animation is complete
        function IsForwardComplete(x, y, sh, sp) {
            return x === settings.endX && y === settings.endY && sh === settings.endBlur && sp === settings.endSpread;
        }
        //Checks if the backward animation is complete
        function IsBackwardComplete(x, y, sh, sp) {
            return x === settings.defaultX && y === settings.defaultY && sh === settings.defaultBlur && sp === settings.defaultSpread;
        }
        //Returns a string formatted for styling to set the box shadow.
        function SetShadow(x, y, sh, sp, color) {
            var inset = settings.isInset ? "inset" : "";
            return x + "px " + y + "px " + sh + "px " + sp + "px " + color + " " + inset;
        }
        //The maximum speed that can be set is 10.
        settings.speed = settings.speed > 10 ? 10 : settings.speed;
        //The minimum speed is 1
        settings.speed = settings.speed < 1 ? 1 : settings.speed;
        //This will be set to an interval
        var forwardTimer;
        //This will be set to an interval
        var backwardTimer;
        //For stopping the forward timer/interval
        var killForward = false;
        //For stopping the backward timer/interval
        var killBackward = false;
        //Control variables
        var baseX = settings.defaultX;
        var baseY = settings.defaultY;
        var baseShadow = settings.defaultBlur;
        var baseSpread = settings.defaultSpread;
        //Setup event listeners based on the defined trigger
        this.on(settings.trigger, function () {
            //Clear the backwardTimer interval if it may be running
            window.clearInterval(backwardTimer);
            //Check if the timer is to be stopped on event trigger
            killForward = IsForwardComplete(baseX, baseY, baseShadow, baseSpread);
            //Initialize the forwardTimer variable
            forwardTimer = setInterval(function () {
                //Check every time the interval iterates whether the timer is to be killed
                killForward = IsForwardComplete(baseX, baseY, baseShadow, baseSpread);
                //If true, stop the interval
                if (killForward) window.clearInterval(forwardTimer);
                //Increment the control variables for animation
                baseX = baseX < settings.endX ? baseX + settings.speed : baseX;
                baseY = baseY < settings.endY ? baseY + settings.speed : baseY;
                baseShadow = baseShadow < settings.endBlur ? baseShadow + settings.speed : baseShadow;
                baseSpread = baseSpread < settings.endSpread ? baseSpread + settings.speed : baseSpread;
                //Set the shadow string for use with the jQuery css function
                var shadow = SetShadow(baseX, baseY, baseShadow, baseSpread, settings.forwardColor);
                $this.css({
                    'box-shadow': shadow,
                        '-webkit-box-shadow': shadow,
                        '-moz-box-shadow': shadow
                });
            }, 10);
            if (killForward) window.clearInterval(forwardTimer);
        }).on(settings.trigger === 'mouseover' ? 'mouseleave' : 'mouseup', function () {
            //Clear the forwardTimer interval if it's running
            window.clearInterval(forwardTimer);
            //Check if the settings are set to allow forward only animations
            if (!settings.forwardOnly) {
                //Check if the timer is to be cleared
                killBackward = IsBackwardComplete(baseX, baseY, baseShadow, baseSpread);
                //Initialze the backwardTimer variable
                backwardTimer = setInterval(function () {
                    //Check every time the interval iterates whether to kill the timer
                    killBackward = IsBackwardComplete(baseX, baseY, baseShadow, baseSpread);
                    //If true, clear the backward interval
                    if (killBackward) window.clearInterval(backwardTimer);
                    //Increment the control variables
                    baseX = baseX > settings.defaultX ? baseX - settings.speed : baseX;
                    baseY = baseY > settings.defaultY ? baseY - settings.speed : baseY;
                    baseShadow = baseShadow > settings.defaultBlur ? baseShadow - settings.speed : baseShadow;
                    baseSpread = baseSpread > settings.defaultSpread ? baseSpread - settings.speed : baseSpread;
                    //Set the shadow string for the jQuery css function
                    var shadow = SetShadow(baseX, baseY, baseShadow, baseSpread, settings.backwardColor);
                    //Set the css of the element
                    $this.css({
                        'box-shadow': shadow,
                            '-webkit-box-shadow': shadow,
                            '-moz-box-shadow': shadow
                    });
                }, 10);
            }
        });
        /*End of Shadowmation*/
    };
}(jQuery));