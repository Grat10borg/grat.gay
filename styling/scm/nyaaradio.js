let radio = {
	el: false,
	audio: false,
	playlist_el: false,
	initialized: false,

	// default settings, override by supplying an object to
	// `radio.init()`, properties will be merged
	settings: {
		// randomizes playlist track order
		shuffle: false,

		// whether to play track after initializing
		autoplay: false,

		// volume to use when none has been set by the user
		default_volume: 0.1,

		// separator between the timestamps
		time_separator: " | ",

		// a header placed above the tracks in the `<playlist>` element
		playlist_header: "Playlist",
	},

	list: {}
}

// plays or pauses the currently playing track
radio.play = () => {radio.audio.play()}
radio.pause = () => {radio.audio.pause()}

// toggles playback of the currently playing track
radio.toggle = () => {
	if (radio.audio.paused) {
		// change icon to pause btn
		$$.id("pause-play").className = "pause play-pause"

		return radio.audio.play();
	}
	// change icon to play btn
	$$.id("pause-play").className = "play play-pause"

	radio.audio.pause();
}

// gets next or previous tracks and plays them
radio.skip = () => {radio.play_track(radio.list.next())}
radio.prev = () => {radio.play_track(radio.list.prev())}

// loads `track` from the playlist (`radio.list.loaded`) if it exists
radio.play_track = (track) => {
	// find track element, and do nothing if not found
	let track_el = radio.el.querySelector(`track[name="${track}"]`);
	if (! track_el) {return false}

	// remove ".playing" class from all `<track>` elements
	for (let playing of radio.el.querySelectorAll(".playing")) {
		playing.classList.remove("playing");
	}

	// add ".playing" to `track_el`
	track_el.classList.add("playing");

	// update current track properties
	radio.list.current = track;
	radio.audio.setAttribute("name", track);
	radio.audio.src = radio.list.loaded[track];

	// play the track
	radio.play();
}

// loads a `playlist`, with optional `prev_session` object for restoring
// playback state
radio.list.load = (playlist, prev_session) => {
	// save the playlist for later
	radio.list.loaded = playlist;

	// save the currently playing track, restoring old state if there is
	// any, otherwise just picking the first in the playlist
	radio.list.current = prev_session.current
		|| Object.keys(playlist)[0];

	// update the `<audio>` element's `src`
	radio.audio.src = playlist[radio.list.current];

	// restore the play time if there is any set
	if (prev_session.time) {
		radio.audio.currentTime = prev_session.time;
	}

	// update the `name=""` property of `<audio>` to that of the track
	radio.audio.setAttribute("name", radio.list.current);

	// run through all the tracks
	for (let i in playlist) {
		// create `<track>`
		let track = document.createElement("track");

		// make this the currently playing track if it is
		if (i == radio.list.current) {
			track.classList.add("playing");
		}

		// add track name
		track.innerHTML = i;

		// add track properties
		track.setAttribute("name", i);
		track.setAttribute("file", playlist[i]);

		// make clicking `track` play the track
		track.addEventListener("click", () => radio.play_track(i));

		// add `track` to playlist element
		radio.list.el.append(track);
	}
}

// returns the next track in the playlist
radio.list.next = () => {
	// is the next track going to be the next track in the playlist?
	let next_is_next = false;

	// run through tracks in playlist
	for (let i in radio.list.loaded) {
		// if the next track is going to be the next track in the
		// playlist, we return it
		if (next_is_next) {
			return i;
		}

		// get whether the next track is the next track in the playlist,
		// based on whether the current track is the currently playing
		// track or not
		next_is_next = i == radio.list.current;
	}

	// return the first track in the playlist if there was no
	// `next_is_next` found, i.e we're at the end of the playlist
	return Object.keys(radio.list.loaded)[0];
}

// returns the previous track in the playlist
radio.list.prev = () => {
	let prev; // will contain the next track

	// run through tracks in playlist
	for (let i in radio.list.loaded) {
		// if the current track is the playing track we stop, because
		// then `prev` is currently the previous track
		if (i == radio.list.current) {
			break;
		}

		// update `prev` with the current track
		prev = i;
	}

	// if there was no `prev` found, then we're at the beginning of the
	// playlist, so we just return the first track th
	if (! prev) {
		let tracks = Object.keys(radio.list.loaded);
		return tracks[tracks.length - 1];
	}

	return prev;
}

// simple shorthands to show or hide the playlist view
radio.list.hide = () => {radio.list.el.classList.add("hidden")}
radio.list.show = () => {radio.list.el.classList.remove("hidden")}
radio.list.toggle = () => {radio.list.el.classList.toggle("hidden")}

// initializes the radio, with a required list of tracks in `playlist`,
// where the key is the track name, and the value is the audio file's
// path, `settings` can also be supplied to overwrite values in
// `radio.settings`
radio.init = (playlist, settings) => {
	// make sure we've not already initialized
	if (radio.initialized) {
		console.error("Already initialized!");
		return false;
	}

	// merge default settings and overridden settings
	radio.settings = {
		...radio.settings,
		...settings
	}

	// should we shuffle the `playlist`
	if (radio.settings.shuffle) {
		// get playlist keys
		let tracks = Object.keys(playlist || {});

		// shuffle keys
		tracks.sort((a, b) => {
			return Math.random() - 0.5;
		})

		// turn array back into object
		let new_playlist = {};
		for (let track of tracks) {
			new_playlist[track] = playlist[track];
		}; playlist = new_playlist;
	}

	// get the last playstate if there is any
	let prev_session = sessionStorage.getItem("playstate") || false;
	if (prev_session) { // did we find a playstate?
		// attempt to parse as JSON
		prev_session = JSON.parse(prev_session);

		// if the current song in the playstate no longer exists in
		// `playlist` we simply delete the playstate, and move on as if
		// it never existed
		if (! playlist[prev_session.current]) {
			prev_session = false;
			sessionStorage.removeItem("playstate");
		}
	}

	// get the actual `<radio>` element
	radio.el = document.querySelector("radio");
	radio.el.classList.add("paused");

	// if no `<radio>` element is found, create one
	if (! radio.el) {
		console.warn("Couldn't find radio (<radio>) element, creating"
			+ " one manually, ideally there should already be one in"
			+ " the DOM by the time `radio.init()` is run");

		radio.el = document.createElement("radio");
		document.body.prepend(radio.el);
	}

	// formats `time` (in seconds) to "<minutes>:<seconds>"
	let format_time = (time) => {
		// reset `time` to `0` if `NaN`
		if (isNaN(time)) {time = 0}

		// get minutes in `time`
		let minutes = Math.floor(time / 60);

		// get seconds in `time`
		let seconds = Math.floor(time - minutes * 60);

		// pad `seconds` if needed
		if (seconds < 10) {seconds = "0" + seconds}

		// return formatted string
		return `${minutes}:${seconds}`;
	}

	// format `<radio>` element
	radio.el.innerHTML = `
		<button class="previous"></button>
		<button id="pause-play" class="play play-pause"></button>
		<button class="skip"></button>
		<div class="title">${prev_session.current || ""}</div>
		<input class="duration" value="0" type="range"></input>
		<span class="time">
			<label class="current">${format_time(prev_session.current || 0)}</label>
			<label class="separator">${radio.settings.time_separator}</label>
			<label class="total">${format_time(0)}</label>
		</span>
		<input class="volume" step="0.05" min="0" max="1" type="range"></input>
		<button class="list"></button>
	`

	// get the duration slider
	let duration_el = radio.el.querySelector(".duration");

	// update `.moving` if currently moving
	duration_el.addEventListener("input", () => {
		duration_el.moving = true;
	})

	// listen for duration slider changes
	duration_el.addEventListener("change", () => {
		// update the time of the `<audio>` element
		radio.audio.currentTime = duration_el.value;

		duration_el.moving = false; // we're no longer moving!
	})

	// get the volume slider
	let volume_el = radio.el.querySelector(".volume");

	// listen for and update the volume on slider changes
	volume_el.addEventListener("input", () => {
		radio.audio.volume = volume_el.value;
	})

	// listen for clicks inside the `<radio>` element
	radio.el.addEventListener("click", (e) => {
		// shorthand to getting an element with a selector
		let el = (selector) => !! e.target.closest(selector);

		switch(true) {
			case el(".skip"): radio.skip(); break;
			case el(".previous"): radio.prev(); break;
			case el(".list"): radio.list.toggle(); break;
			case el(".play-pause"): radio.toggle(); break;

			case el("playlist .close"): radio.list.hide(); break;
		}
	})

	// create `<audio>` element
	radio.audio = document.createElement("audio");

	// set default volume, or restore from previous playstate
	volume_el.value = prev_session.volume || 0.1;
	radio.audio.volume = prev_session.volume || 0.1;

	// add to DOM
	document.body.append(radio.audio);

	// listen for when the `<audio>` track progresses
	radio.audio.addEventListener("timeupdate", (e) => {
		// update the playstate for later/restoring
		sessionStorage.setItem("playstate", JSON.stringify({
			volume: radio.audio.volume,
			current: radio.list.current,
			playlist: radio.list.loaded,
			time: radio.audio.currentTime,
			playing: ! radio.audio.paused,
		}))

		// set the duration of the track on the duration slider
		duration_el.setAttribute("max", radio.audio.duration);

		// if the duration slider isn't being touched we also update the
		// duration slider with the new time
		if (! duration_el.moving) {
			duration_el.value = radio.audio.currentTime;
		}

		// make sure the track name is up-to-date
		radio.el.querySelector(".title").innerHTML =
			radio.audio.getAttribute("name");

		// format and update with new time stamps
		radio.el.querySelector(".current").innerHTML =
			format_time(radio.audio.currentTime)
		radio.el.querySelector(".total").innerHTML =
			format_time(radio.audio.duration)
	})

	radio.audio.addEventListener("ended", radio.skip);

	// toggle ".playing" and ".paused" accordingly
	radio.audio.addEventListener("play", () => {
		radio.el.classList.add("playing");
		radio.el.classList.remove("paused");
	})

	// toggle ".playing" and ".paused" accordingly
	radio.audio.addEventListener("pause", () => {
		radio.el.classList.add("paused");
		radio.el.classList.remove("playing");
	})

	// create `<playlist>` element
	radio.list.el = document.createElement("playlist");
	radio.list.el.classList.add("hidden"); // hide by default

	// add header if one is set
	if (radio.settings.playlist_header) {
		radio.list.el.innerHTML = `
			<header>${radio.settings.playlist_header}
		`
	}

	// add inside `<radio>`
	radio.el.append(radio.list.el);

	// load `playlist`, with `prev_session` if there is one
	radio.list.load(playlist, prev_session);

	// if we're supposed to autoplay, or was previously playing in a
	// different session, we do so
	if (radio.settings.autoplay || prev_session.playing) {
		radio.play();
		radio.audio.autoplay = true;
	}

	radio.initialized = true;
}
