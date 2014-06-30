Shadowmation
=============

This plugin offers flexible settings that allow the developer to achieve any desired effect of the box-shadow animation.

Available Settings in the Plugin:

			1. defaultBlur: 0, [Defines the default blur. Accepts: int value. Default: 0]
            2. endBlur: 15, [Defines the point to which the plugin should animate the blur. Accepts: int value. Default: 15]
            3. defaultSpread: 0, [Defines the default spread. Accepts: int value. Default: 0]
            4. endSpread: 0, [Defines the point to which the plugin should animate the spread. Accepts: int value. Default: 0]
            5. defaultX: 0, [Defines the default X (horizontal) coordinate of the shadow. Accepts: int value. Default: 0]
            6. endX: 0, [Defines the end X (horizontal) coordinate to which the plugin should animate. Accepts: int value. Default: 0]
            7. defaultY: 0, [Defines the default Y (vertical) coordinate of the shadow. Accepts: int value. Default: 0]
            8. endY: 0, [Defines the end Y (vertical) coordinate to which the plugin should animate. Accepts: int value. Default: 0]
            9. isInset: false, [Defines whether the shadow should be inset or not. Accepts: boolean value. Default: false]
            10. forwardColor: "black", [Defines the color appearance during the forward animation event. Accepts: string value. Default: "black"]
            11. backwardColor: "black", [Defines the color appearance during the backward animation event. Accepts: string value. Default: "black"]
            12. speed: 1, [Defines the speed at which the animation should occur. Max: 10. Min: 1. Accepts: int value. Default: 1]
            13. trigger: 'mouseenter', [Defines how the animation should be triggered. Accepts: string value. Default: 'mouseenter', Alternatives: 'mousedown']
            14. forwardOnly: false [Defines whether the animation should only animate forward. Will not animate backward if set. Accepts: boolean value. Default: false]
			
			**Note:
				forwardColor and backwardColor accept rgb/rgba values.
				E.G. color: "rgba(50,0,0,0.8)"
			
Sample Usage:

			$(document).ready(function(){
				/*Uses default settings*/
				$('.shadow').Shadowmation();
				/*Settings altered*/
				$('.shadow').Shadowmation({
					trigger: 'mouseover',
					defaultBlur: 5,
					endBlur: 50,
					defaultSpread: 0,
					endSpread: 50,
					defaultX: 10,
					endX: 100,
					defaultY: 10,
					endY: 100,
					forwardColor: 'rgba(0,0,0,0.5)',
					backwardColor: 'blue',
					speed: 5
				});
			});

Shadowmation