(function() {
	const Hash = "#page2048"
	// window.addEventListener("load", function() {
		// history.replaceState(null, null, Hash)
		// history.pushState(null, null, "#")
		setTimeout(function() {
			// var hash = location.hash.toString()
			// if (hash == Hash)
				history.pushState(null, null, Hash)
		}, 2000)
	// });
	window.addEventListener("popstate",function(){
		
		setTimeout(function() {
			// var hash = location.hash.toString()
			// if (hash == Hash)
				history.pushState(null, null, Hash)
		}, 1000)
	})
	
})();
