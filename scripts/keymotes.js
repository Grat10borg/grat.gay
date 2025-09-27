if (typeof keymotes_settings == "undefined") {
	keymotes_settings = {};
}

let keymotes = {
	// ideally this should be your own instance or similar
	instance: "https://transfem.social",

	// add any user overridden settings
	...(keymotes_settings || {}),

	// emulated `sessionStorage` when running outside of browser
	cache: {}
}

// returns a list of emotes for `keymotes.instance`
keymotes.list = async () => {
	// sessionStorage item name
	let cache_key = `keymote-${keymotes.instance}`;

	// check if there's a cached result
	if (sessionStorage.getItem(cache_key)) {
		try {
			// attempt to parse result as JSON and return it
			return JSON.parse(sessionStorage.getItem(cache_key));
		} catch(err) {
			// somehow failed to parse, so we delete the item
			sessionStorage.removeItem(cache_key);
		}
	}

	try {
		// get list of emotes for instance
		let emotes = (await (await fetch(
			`${keymotes.instance}/api/emojis`,
		)).json());

		// show error message if something went wrong
		if (! emotes || emotes.error || ! emotes.emojis) {
			console.error(`Couldn't get list of emotes (${keymotes.instance}):`, emotes);
			return [];
		}

		// save/cache emote list
		sessionStorage.setItem(cache_key, JSON.stringify(emotes.emojis));

		return emotes.emojis;
	} catch(err) {
		console.error(`Couldn't get list of emotes (${keymotes.instance}):`, err);
		return [];
	}
}

// attempts to return the URL for `emote` given the `keymotes.instance`
keymotes.resolve = async (emote) => {
	// remove ":" from `emote`
	emote = emote.replace(/^:/, "").replace(/:$/, "");

	// get list of emotes
	let emotes = await keymotes.list();

	// run through list and try and find an emote named `emote`
	for (emote_obj of emotes) {
		if (emote_obj.name == emote) {return emote_obj.url}
	}

	// no emote with name found!
	return false;
}

// formats `element` by replacing everything that looks to be a *key
// emote with the image of the emote, if found
keymotes.format = async (element) => {
	// returns all the children for `el` from deepest in to furthest out
	let get_children = (el) => {
		let children = [];

		// are there any children to begin with?
		if (el.children.length) {
			// run through children
			for (let child of el.children) {
				// recursively get children of children
				children = [
					...get_children(child),
					...children
				]
			}
		}

		// return finalized list of children
		return [...children, el];
	}

	// get all the children inside `element` and itself
	let children = get_children(element);

	// run through list of `children`
	for (let child of children) {
		// attempt to format `child.innerHTML`
		let html_edited = await keymotes.format_str(child.innerHTML);

		// only actually set `child.innerHTML` if something changed
		if (html_edited != child.innerHTML) {
			child.innerHTML = html_edited;
		}
	}
}

// get list of emotes inside `str`, according to the allowed name
// specification for an emote for *key
keymotes.in_str = (str) => {
	return str.match(
		/:[\p{L}\p{N}\p{M}_+-]+:/ug
	) || []
}

// formats `str` by replacing emotes with an `<img>` tag with the
// correct properties on it to show the image
keymotes.format_str = async (str) => {
	let emotes = keymotes.in_str(str);

	// if no emotes were found, just move along
	if (! emotes.length) {return str}

	// go through each emote
	for (let emote of emotes) {
		// attempt to get the URL of this `emote`
		let url = await keymotes.resolve(emote);

		// no URL found for some reason
		if (! url) {continue}

		// make use of a middleware function if one is defined
		if (typeof keymotes.url_middleware == "function") {
			url = await keymotes.url_middleware(url, emote);
		}

		// URL found! replace emote text with emote image!
		let emote_raw = emote.replace(/^:/, "").replace(/:$/, "");
		str = str.replace(
			emote, `<img
				src="${url}"
				loading="lazy"
				class="keymote"
				title="${emote_raw}"
				alt='An image of the "${emote_raw}" emote'>`
		)
	}

	return str;
}

// example of a middleware function to edit the URL
keymotes.url_middleware = (url, emote) => {
	return url;
}

// returns the CSS related needed
keymotes.styling = () => {
	return `
		.keymote {
			height: 1.8em;
			vertical-align: middle;
			transition: 0.2s ease-in-out;
		}

		.keymote:hover {
			transform: scale(1.2);
		}
	`.trim()
}

// are we running inside a browser?
if (typeof document != "undefined") {
	// get and apply styling
	let keymote_style = document.createElement("style");
	keymote_style.innerHTML = keymotes.styling();
	document.body.append(keymote_style);

	// auto format all elements with `.keymotes` on it
	(async () => {
		for (let auto_format of document.querySelectorAll(".keymotes")) {
			await keymotes.format(auto_format);
		}

		document.body.classList.add("auto-keymotes-loaded");
	})()
} else {
	// create pseudo `sessionStorage` (no actual caching currently)
	sessionStorage = {
		removeItem: (item) => {
			delete keymotes.cache[item];
		},

		setItem: (item, value) => {
			keymotes.cache[item] = value;
		},

		getItem: (item) => {
			return keymotes.cache[item] || null;
		}
	}
}

// are we running as a CommonJS module? if so export everything
if (typeof module != "undefined" && module.exports) {
	module.exports = keymotes;
}
