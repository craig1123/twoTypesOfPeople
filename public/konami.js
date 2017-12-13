/* eslint-disable */
var Konami = function (callback) {
	var konami = {
		addEvent: function (obj, type, fn, ref_obj) {
			if (obj.addEventListener)
				obj.addEventListener(type, fn, false);
			else if (obj.attachEvent) {
				// IE
				obj["e" + type + fn] = fn;
				obj[type + fn] = function () {
					obj["e" + type + fn](window.event, ref_obj);
				}
				obj.attachEvent("on" + type, obj[type + fn]);
			}
		},
		removeEvent: function (obj, eventName, eventCallback) {
			if (obj.removeEventListener) {
				obj.removeEventListener(eventName, eventCallback);
			} else if (obj.attachEvent) {
				obj.detachEvent(eventName);
			}
		},
		input: "",
		pattern: "38384040373937396665",
		keydownHandler: function (e, ref_obj) {
			if (ref_obj) {
				konami = ref_obj;
			} // IE
			konami.input += e ? e.keyCode : event.keyCode;
			if (konami.input.length > konami.pattern.length) {
				konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
			}
			if (konami.input === konami.pattern) {
				konami.code(this._currentlink);
				konami.input = '';
				e.preventDefault();
				return false;
			}
		},
		load: function (link) {
			this.addEvent(document, "keydown", this.keydownHandler, this);
			this.iphone.load(link);
		},
		unload: function () {
			this.removeEvent(document, 'keydown', this.keydownHandler);
			this.iphone.unload();
		},
		code: function (link) {
			window.location = link
		},
		iphone: {
			start_x: 0,
			start_y: 0,
			stop_x: 0,
			stop_y: 0,
			tap: false,
			capture: false,
			orig_keys: "",
			keys: ["UP", "UP", "DOWN", "DOWN", "LEFT", "RIGHT", "LEFT", "RIGHT", "TAP", "TAP"],
			input: [],
			code: function (link) {
				konami.code(link);
			},
			touchmoveHandler: function (e) {
				if (e.touches.length === 1 && konami.iphone.capture === true) {
					var touch = e.touches[0];
					konami.iphone.stop_x = touch.pageX;
					konami.iphone.stop_y = touch.pageY;
					konami.iphone.tap = false;
					konami.iphone.capture = false;
					konami.iphone.check_direction();
				}
			},
			toucheendHandler: function () {
				if (konami.iphone.tap === true) {
					konami.iphone.check_direction(this._currentLink);
				}
			},
			touchstartHandler: function (e) {
				konami.iphone.start_x = e.changedTouches[0].pageX;
				konami.iphone.start_y = e.changedTouches[0].pageY;
				konami.iphone.tap = true;
				konami.iphone.capture = true;
			},
			load: function (link) {
				this.orig_keys = this.keys;
				konami.addEvent(document, "touchmove", this.touchmoveHandler);
				konami.addEvent(document, "touchend", this.toucheendHandler, false);
				konami.addEvent(document, "touchstart", this.touchstartHandler);
			},
			unload: function () {
				konami.removeEvent(document, 'touchmove', this.touchmoveHandler);
				konami.removeEvent(document, 'touchend', this.toucheendHandler);
				konami.removeEvent(document, 'touchstart', this.touchstartHandler);
			},
			check_direction: function () {
				x_magnitude = Math.abs(this.start_x - this.stop_x);
				y_magnitude = Math.abs(this.start_y - this.stop_y);
				x = ((this.start_x - this.stop_x) < 0) ? "RIGHT" : "LEFT";
				y = ((this.start_y - this.stop_y) < 0) ? "DOWN" : "UP";
				result = (x_magnitude > y_magnitude) ? x : y;
				result = (this.tap === true) ? "TAP" : result;
				return result;
			}
		}
	}

	typeof callback === "string" && konami.load(callback);
	if (typeof callback === "function") {
		konami.code = callback;
		konami.load();
	}

	return konami;
};

new Konami(function() {
	console.log('KONAMI!!!');
	var konamiEnabled = document.createElement('div');
	var h1 = document.createElement('h1');
	var img = document.createElement('img');
	document.body.appendChild(konamiEnabled);
	konamiEnabled.style.position = 'fixed';
	konamiEnabled.style.zIndex = '9999';
	konamiEnabled.style.top = '0';
	konamiEnabled.style.width = '100%';
	konamiEnabled.style.transition = '1.25s';
	konamiEnabled.appendChild(h1);
	h1.textContent = "You've found an Easter Egg!";
	h1.style.fontSize = '4em';
	h1.style.textAlign = 'center';
	h1.style.color = '#444';
	setTimeout(function() {
		konamiEnabled.style.opacity = 0
	}, 1250);
	setTimeout(function() {
		konamiEnabled.style.display = 'none';
	}, 1500);

	var link = document.createElement('link');
	var balloons = document.getElementById('balloons').children;
	for (var i = 0; i < balloons.length; i += 1) {
		var balloon = balloons[i];
		balloon.addEventListener('click', pop, false);
	}
	function pop(e) {
		e.target.style.display = 'none';
		e.preventDefault();
		e.stopPropagation();
	}
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', './balloons.css');
	document.getElementsByTagName('head')[0].appendChild(link);
});
