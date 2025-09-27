let nyaallery = {
	settings: {
		speed: 150, // in milliseconds
		buttons: {
			close: "X",
			prev: "&lt;",
			next: "&gt;",
		},

		...(window.nyaallery_settings || {})
	}
}

// creates the `nyaallery.el` and sets up events
nyaallery.init = () => {
	document.body.style.setProperty("--nyaallery-speed", nyaallery.settings.speed + "ms");

	// make sure no `<nyaallery>` elements already exist
	for (let el of document.querySelectorAll("nyaallery")) {
		el.remove();
	}

	// create `<nyaallery>` element
	nyaallery.el = document.createElement("nyaallery");
	nyaallery.el.innerHTML = `
		<div class="top">
			<button onclick="nyaallery.hide()">
				${nyaallery.settings.buttons.close}
			</button>
		</div>

		<button class="prev hidden" onclick="nyaallery.prev()">
			${nyaallery.settings.buttons.prev}
		</button>
		<button class="next hidden" onclick="nyaallery.next()">
			${nyaallery.settings.buttons.next}
		</button>

		<images></images>
	`

	nyaallery.el.images = nyaallery.el.querySelector("images");

	// make sure gallery is hidden
	nyaallery.hide();

	// setup initial variables
	nyaallery.el.moved_by = 0;
	nyaallery.el.animating = false;
	nyaallery.el.pointer_down = false;

	// set correct `nyaallery.el.pointer_down` state, and sometimes
	// `nyaallery.el.moved_by`
	nyaallery.el.images.addEventListener("pointercancel", () => {
		// reset `.moved_by` if not using a mouse
		if (e.pointerType != "mouse") {
			nyaallery.el.moved_by = 0;
		}

		nyaallery.el.pointer_down = false;
	}); nyaallery.el.images.addEventListener("pointerup", (e) => {
		// reset `.moved_by` if not using a mouse
		if (e.pointerType != "mouse") {
			nyaallery.el.moved_by = 0;
		}

		nyaallery.el.pointer_down = false;
	}); nyaallery.el.images.addEventListener("pointerleave", () => {
		nyaallery.el.moved_by = 0;
		nyaallery.el.pointer_down = false;
	}); nyaallery.el.images.addEventListener("pointerdown", () => {
		nyaallery.el.pointer_down = true;
	})

	// scroll gallery on pointer movement if pointer is down
	nyaallery.el.images.addEventListener("pointermove", (e) => {
		if (nyaallery.el.pointer_down) {
			nyaallery.el.moved_by += Math.abs(e.movementX);

			nyaallery.el.images.scrollBy({
				left: e.movementX * -1,
				behavior: "smooth"
			})

			nyaallery.update();
		} else {
			nyaallery.el.moved_by = 0;
		}
	})

	// hide gallery if we've effectively not moved yet
	nyaallery.el.addEventListener("click", (e) => {
		// do nothing if we're clicking a button
		if (e.target.closest("button")) {return}

		if (nyaallery.el.moved_by <= 10) {
			nyaallery.hide();
			nyaallery.el.moved_by = 0;
		}
	})

	// add `<nyaallery>` to body
	document.body.prepend(nyaallery.el);
}

// shows or hides the next or previous buttons if we're at the last or
// the first image
nyaallery.update = async () => {
	let active_image = await nyaallery.active_img.wait_for_scroll();

	// make sure both buttons are shown
	nyaallery.el.querySelector(".prev").classList.remove("hidden");
	nyaallery.el.querySelector(".next").classList.remove("hidden");

	// do nothing if no active image was found
	if (! active_image) {return}

	// hide previous button if at the first image, and the next button
	// if at the last image
	let images = nyaallery.el.images.querySelectorAll("img");
	if (images[0] == active_image) {
		nyaallery.el.querySelector(".prev").classList.add("hidden");
	} if (images[images.length - 1] == active_image) {
		nyaallery.el.querySelector(".next").classList.add("hidden");
	}
}

// takes in `el` and returns data and parses and returns data about if
// it is a valid nyaallery image or is inside one
nyaallery.parse_img = (el) => {
	// get actual image element
	let img_el = el.closest("img, .nyaallery-img");

	if (! img_el) {return false}

	// attempts to find image/background URL via CSS
	let css_img = () => {
		// attempt to find the contents of `url("")` for the background
		// CSS property
		let match = getComputedStyle(img_el).background.match(
			/url\("(.*?)"\)/
		)

		// did we not find a match? stop here
		if (! match || ! match[1]) {
			return false;
		}

		// return URL
		return match[1];
	}

	return {
		el: img_el,
		styling: getComputedStyle(img_el),
		bounds: img_el.getBoundingClientRect(),
		url: img_el.getAttribute("src") || css_img(),
		alt_text: img_el.getAttribute("alt") || img_el.title
	}
}

// navigate to the next or previous images
nyaallery.next = () => {nyaallery.move(1)}
nyaallery.prev = () => {nyaallery.move(-1)}
nyaallery.move = async (direction_multiplier) => {
	nyaallery.el.images.scrollBy({
		behavior: "smooth",
		left: innerWidth * direction_multiplier
	})

	await nyaallery.update();
	await nyaallery.update();
}

// returns the active image if there is one, otherwise `false`, if we're
// in the middle of scrolling `false` is returned instead
nyaallery.active_img = () => {
	// get the current active image index via scrolling
	let img_index = nyaallery.el.images.scrollLeft / innerWidth;

	// reset index if we're likely in the middle of scrolling
	if (Math.abs(Math.round(img_index) - img_index) > 0.05) {
		img_index = -1;
	} else {
		img_index = Math.round(img_index);
	}

	// get the active image if there is one, if in the middle of
	// scrolling to a different one, this returns nothing
	return nyaallery.el.querySelectorAll("images img")[
		img_index
	] || false;
}

// `nyaallery.active_img()` but if it cant find an active image, it
// attempts to keep trying, in hopes that it's probably just because
// something is being scrolled
nyaallery.active_img.wait_for_scroll = () => {
	// keep track of how many times we've tried to get the active image
	let attempts = 0;

	return new Promise((resolve) => {
		let finished_scrolling = setInterval(() => {
			let active_image = nyaallery.active_img();

			// give up after `attempts` reaches `5`
			if (attempts >= 15) {
				resolve(false);
				clearInterval(finished_scrolling);
			}

			// no image found, retry!
			if (! active_image) {
				attempts++;
				return;
			}

			// image found!
			resolve(active_image);
			clearInterval(finished_scrolling);
		}, 100)
	})
}

// hides the gallery, with an animation if possible
nyaallery.hide = () => {
	// do nothing if already hidden
	if (nyaallery.el.classList.contains("hidden")) {return}

	// do nothing if already animating
	if (nyaallery.el.animating) {return}
	nyaallery.el.animating = true;

	// get the active image
	let active_img = nyaallery.active_img();

	// make sure we found an `active_img` and that it has an element it
	// originated from, so we can actually animate to it
	if (! active_img || ! active_img.data.el) {
		nyaallery.el.animating = false;
		return nyaallery.el.classList.add("hidden");
	}

	// get bounds of active image
	active_img.bounds = active_img.getBoundingClientRect();

	// create overlay
	let overlay_img = document.createElement("img");
	overlay_img.classList.add("nyaallery-overlay-img");

	// position and style overlay on top of gallery image
	overlay_img.style.zIndex = 110;
	overlay_img.style.borderRadius = null;
	overlay_img.style.top = active_img.bounds.top + "px";
	overlay_img.style.left = active_img.bounds.left + "px";
	overlay_img.style.width = active_img.bounds.width + "px";
	overlay_img.style.height = active_img.bounds.height + "px";

	// add overlay to DOM
	document.body.append(overlay_img);

	return new Promise((resolve) => {
		// this runs when the image loads or fails to load
		let load_handler = () => {
			// hide gallery
			nyaallery.el.classList.add("hidden");

			// wait until fully hidden
			setTimeout(() => {
				// update `active_img.data`
				active_img.data = nyaallery.parse_img(
					active_img.data.el
				)

				// position and style overlay on top of original image
				overlay_img.style.width = active_img.data.bounds.width;
				overlay_img.style.top = active_img.data.bounds.top + "px";
				overlay_img.style.left = active_img.data.bounds.left + "px";
				overlay_img.style.height = active_img.data.bounds.height + "px";
				overlay_img.style.borderRadius = active_img.data.styling.borderRadius;

				// wait until move is done
				setTimeout(() => {
					// remove overlay
					overlay_img.remove();

					resolve();
					nyaallery.el.animating = false;
				}, nyaallery.settings.speed)
			}, nyaallery.settings.speed)
		}

		// wait until the image has been loaded
		overlay_img.addEventListener("load", load_handler);
		overlay_img.addEventListener("error", load_handler);

		// attempt to load the active image's source onto the overlay
		overlay_img.src = active_img.data.url;
	})
}

// shows the gallery, with an animation if possible
nyaallery.show = () => {
	// do nothing if already shown
	if (! nyaallery.el.classList.contains("hidden")) {return}

	// do nothing if already showing
	if (nyaallery.el.animating) {return}
	nyaallery.el.animating = true;

	// get the active image
	let active_img = nyaallery.active_img();

	// make sure we found an `active_img` and that it has an element it
	// originated from, so we can actually animate to it
	if (! active_img || ! active_img.data.el) {
		nyaallery.el.animating = false;
		return nyaallery.el.classList.remove("hidden");
	}

	// get bounds of active image
	active_img.bounds = active_img.getBoundingClientRect();

	// update `active_img.data`
	active_img.data = nyaallery.parse_img(active_img.data.el);

	// create overlay
	let overlay_img = document.createElement("img");
	overlay_img.classList.add("nyaallery-overlay-img");

	// position and style overlay on top of original image
	overlay_img.style.top = active_img.data.bounds.top + "px";
	overlay_img.style.left = active_img.data.bounds.left + "px";
	overlay_img.style.width = active_img.data.bounds.width + "px";
	overlay_img.style.height = active_img.data.bounds.height + "px";
	overlay_img.style.borderRadius = active_img.data.styling.borderRadius;

	// add overlay to DOM
	document.body.append(overlay_img);

	return new Promise((resolve) => {
		// this runs when the image loads or fails to load
		let load_handler = () => {
			// get bounds of original image container
			let final_bounds = active_img.getBoundingClientRect();

			// position and style overlay on top of gallery image
			overlay_img.style.borderRadius = null;
			overlay_img.style.width = final_bounds.width;
			overlay_img.style.top = final_bounds.top + "px";
			overlay_img.style.left = final_bounds.left + "px";
			overlay_img.style.height = final_bounds.height + "px";

			// wait until move is done
			setTimeout(() => {
				// show gallery
				nyaallery.el.classList.remove("hidden");

				// wait until fully shown
				setTimeout(() => {
					// remove overlay
					overlay_img.remove();

					resolve();
					nyaallery.el.animating = false;
				}, nyaallery.settings.speed)
			}, nyaallery.settings.speed)
		}

		// wait until the image has been loaded
		overlay_img.addEventListener("load", load_handler);
		overlay_img.addEventListener("error", load_handler);

		// attempt to load the active image's source onto the overlay
		overlay_img.src = active_img.data.url;
	})
}

// toggles visibility of gallery with an animation if possible
nyaallery.toggle = async () => {
	// show if hidden
	if (nyaallery.el.classList.contains("hidden")) {
		await nyaallery.show();
	} else { // hide if shown
		await nyaallery.hide();
	}
}

// creates a gallery and shows it from `images[]`
nyaallery.create_gallery = async (images) => {
	// make sure gallery is hidden
	await nyaallery.hide();

	// empty gallery's image list
	nyaallery.el.images.innerHTML = "";

	let active_img; // keep track of the active image
	for (let image of images) {
		// create container for image
		let container = document.createElement("container");

		// create image with data
		let image_el = document.createElement("img");
		image_el.src = image.url;
		image_el.data = image;
		container.append(image_el);

		if (image.alt_text) {
			let alt_text = document.createElement("div");
			alt_text.classList.add("alt-text");
			alt_text.innerHTML = image.alt_text;
			container.append(alt_text);
		}

		// add container to image list
		nyaallery.el.images.append(container);

		// if no active image is set or `.active` is set, make this the
		// active image
		if (! active_img || image.active) {
			// update `active_img`
			active_img = container;
			
			// make sure this image is scrolled to
			container.scrollIntoView();
		}
	}

	// show the gallery
	await nyaallery.update();
	await nyaallery.show();
}

document.addEventListener("click", (e) => {
	// do nothing if target isn't inside a gallery
	let gallery_el = e.target.closest(".nyaallery");
	if (! gallery_el) {
		return;
	}

	// get actual image data
	let img = nyaallery.parse_img(e.target);

	// do nothing if no data could be found
	if (! img) {return}

	// list of images in this gallery
	let gallery = [];

	// run through images that are in this gallery
	for (let gallery_img of gallery_el.querySelectorAll("img, .nyaallery-img")) {
		// parse `gallery_img`
		let img_data = nyaallery.parse_img(gallery_img);

		// if this is a valid gallery image, add it to `gallery[]` and
		// set `.active` if `.el` is `img.el`
		if (img_data) {
			img_data.active = img_data.el == img.el;
			gallery.push(img_data);
		}
	}

	// create and show the `gallery[]`
	nyaallery.create_gallery(gallery);
})

nyaallery.init();

// nyaallery.create_gallery([
// 	{url: "https://safebooru.org//samples/2577/sample_45ebb7e943bb87060983675a454e4b37fe2e7525.jpg?5860094"},
// 	{url: "https://safebooru.org//samples/2577/sample_45ebb7e943bb87060983675a454e4b37fe2e7525.jpg?5860094", active: true},
// 	{url: "https://safebooru.org//samples/2577/sample_45ebb7e943bb87060983675a454e4b37fe2e7525.jpg?5860094"},
// ])
