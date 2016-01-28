/*******************************************************************************
 ********************************************************************************
 ********************************************************************************
Title: jQuery maxChars Plugin
Author: Jacob Heater
Create Date: 1/26/2016
Description: Ensures that the configured maximum number of characters is not exceeded in a text entry field on the UI.
Usage: $('selector').maxChars() | $('selector').maxChars([config]);
Additional Details: {
	//Usage example: https://jsfiddle.net/4qmgmgmh/
}
 ********************************************************************************
 ********************************************************************************
 *******************************************************************************/
(function ($) {
	$.fn.maxChars = function (config) {
		var existing = $('.char-counter-container').filter('[target-control-id="' + this.prop('id') + '"]');
		if (existing.length > 0) {
			//Don't allow the counter to be initialized more than once per DOM element.
			return this;
		}
		//Configuration
		var settings = $.extend({
				max : 500,
				trim : true,
				countDirection : 1,
				separator : '/',
				align : 2,
				autoTruncate : true,
				text : 'Characters Used',
				colors : {
					low : '#00A835',
					lowmid : '#97A800',
					mid : '#BFAF30',
					midhigh : '#E08300',
					high : '#FF0000'
				},
				onMaxChars : function (e) {},
				offMaxChars : function (e) {}
			}, config || {});
		var max = typeof settings.max === 'number' ? settings.max : parseInt(settings.max);
		var dir = typeof settings.countDirection === 'number' ? settings.countDirection : 1;
		//Constants
		var consts = {
			threshold : {
				low : 0,
				lowmid : max / 4,
				mid : max / 2,
				midhigh : max / 1.25,
				high : max
			}
		};
		//DOM components
		var components = {
			container : '<div class="char-counter-container"></div>',
			counter : '<div class="char-counter"></div>',
			low : '<span class="low counter-text"></span>',
			lowmid : '<span class="low-mid counter-text"></span>',
			mid : '<span class="mid counter-text"></span>',
			midhigh : '<span class="mid-high counter-text"></span>',
			high : '<span class="high counter-text"><span>',
			create : function (component) {
				return $(component);
			}
		};
		var separator = settings.separator.toString();
		separator = separator.length > 1 ? ' ' + separator + ' ' : separator;
		var constStr = separator + max + (typeof settings.text === 'string' && settings.text.trim() !== "" ? ' ' + settings.text : '');
		var val = "";
		//Begin counter
		var trunc = function (str) {
			return str.substring(0, max);
		};
		var getVal = function (obj) {
			return settings.trim === true ? obj.val().trim() : obj.val();
		};
		var getValLen = function (obj) {
			return getVal(obj).length;
		};
		var setTruncVal = function (obj) {
			obj.val(trunc(getVal(obj)));
		};
		//Ensure that only text fields are applied.
		this.filter('input:text, textarea').each(function () {
			var $this = $(this);
			var container = components.create(components.container).attr('target-control-id', $this.prop('id'));
			var counter = components.create(components.counter);
			var low = components.create(components.low).css('color', settings.colors.low);
			var lowmid = components.create(components.lowmid).css('color', settings.colors.lowmid);
			var mid = components.create(components.mid).css('color', settings.colors.mid);
			var midhigh = components.create(components.midhigh).css('color', settings.colors.midhigh);
			var high = components.create(components.high).css('color', settings.colors.high);
			var unmax = true;
			var initTxt = dir === 0 ? (max - getValLen($this)) + constStr : getValLen($this) + constStr;
			container.append(counter.append(low.text(initTxt))).width($this.width());
			switch (settings.align) {
			case 0:
				container.css('text-align', 'left');
				break;
			case 1:
				container.css('text-align', 'center');
				break;
			case 2:
				container.css('text-align', 'right');
				break;
			}
			$this.keyup(function (e) {
				var len = getValLen($this);
				var txt = dir === 0 ? ((max - len < 0 ? 0 : max - len) + constStr) : len < max ? len + constStr : max + constStr;
				var eventArgs = {
					keyboardEvent : e,
					textEntry : $this,
					length : len,
					maxLength : max
				};
				counter.children().remove();
				if (len < consts.threshold.lowmid) {
					low.text(txt);
					counter.append(low);
					unmax = true;
				} else if (len < consts.threshold.mid) {
					lowmid.text(txt);
					counter.append(lowmid);
					unmax = true;
				} else if (len < consts.threshold.midhigh) {
					mid.text(txt);
					counter.append(mid);
					unmax = true;
				} else if (len < consts.threshold.high) {
					midhigh.text(txt);
					counter.append(midhigh);
					unmax = true;
				} else {
					high.text(txt);
					counter.append(high);
					if (settings.autoTruncate === true) {
						setTruncVal($this);
					}
					unmax = false;
				}
				if (unmax === true && typeof settings.offMaxChars === 'function') {
					settings.offMaxChars(eventArgs);
				} else if (unmax === false && typeof settings.onMaxChars === 'function') {
					settings.onMaxChars(eventArgs);
				}
			});
			container.insertAfter($this);
		});
		return this;
	};
})(jQuery);