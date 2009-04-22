/*
 * jQuery.tabScrollify 0.2 - scrollify your tabs, baby.
 *
 * 0.1 - initial release
 * 0.2 - fixed some width bugs
 * 
 * Copyright (c) 2009 Lim Chee Aun (cheeaun.com)
 * Licensed under the MIT license.
 */

;(function($){
	$.fn.tabScrollify = function(options) {

		var defaults = {
			tabSelector: 'li',
			prevText: '&laquo;',
			nextText: '&raquo;'
		};
		
		var options = $.extend(defaults, options);

		return this.each(function() {
			var el = $(this);
			
			// setup the tab panel
			el.css({
				position: 'relative',
				overflow: 'hidden',
				width: 'auto'
			});

			// setup the next/prev buttons
			var prev = $('<a href="#" id="tabScrollify-prev" class="tabScrollify-button">'+options.prevText+'</a>').hide().insertBefore(el);
			var next = $('<a href="#" id="tabScrollify-next" class="tabScrollify-button">'+options.nextText+'</a>').hide().insertBefore(el);
			
			// setup the tabs if there are many tabs
			var setupTabs = function(){
				
				// get total width of the tabs
				var tabsWidth = 0;
				el.find(options.tabSelector).each(function(i, elem){
					var elem = $(elem);
					tabsWidth += elem.outerWidth(true);
				})
				
				var ul = el.find('ul');
				tabsWidth = tabsWidth + ul.outerWidth(true) - ul.width() + 10;
				if (tabsWidth <= el.width()) return;
				
				// set the widths
				ul.width(tabsWidth);
				el.height(ul.outerHeight(true));
				next.show();
				
			};
			
			setupTabs();
			$(document).bind('tabScrollify:refresh', setupTabs);
			
			// time for the scollification stuff
			var interval;
			next.click(function(){
				next.blur();
				return false;
			}).hover(
				function(){
					clearTimeout(interval);
					prev.show();
					interval = setInterval(function(){
						if (el[0].scrollLeft + el[0].clientWidth >= el[0].scrollWidth){
							next.hide();
							clearTimeout(interval);
						}
						else el[0].scrollLeft +=10;
					}, 50);
				},
				function(){
					clearTimeout(interval);
					return false;
				}
			);
			prev.click(function(){
				prev.blur();
				return false;
			}).hover(
				function(){
					clearTimeout(interval);
					next.show();
					interval = setInterval(function(){
						if (el[0].scrollLeft == 0){
							prev.hide();
							clearTimeout(interval);
						}
						else el[0].scrollLeft -=10;
					}, 50);
				},
				function(){
					clearTimeout(interval);
					return false;
				}
			);
			
		});
	};
})(jQuery);
