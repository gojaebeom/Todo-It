module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,png,txt,js,css,svg,otf,ttf}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/service-worker.js'
};