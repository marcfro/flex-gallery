FlexGallery
===========

FlexGallery is a very lightweight plugin (3kb) which takes any `ul` element and lays out the `li` elements left to right and fills in the shortest row with the next element... Pinterest-like.

Requirements
------------

jQuery 1.x


Installation
------------

Include the flex-gallery-min.js in your document

	<script type="text/javascript" src="path/to/flex-gallery-min.js"></script>

Usage
-----

Give your `ul` element an `id` (the default is 'flexGallery') and create a new FlexGallery (after jQuery has loaded)

	var flexGallery = new FlexGallery( {id: 'customId'} );

An event handler is automatically added to window resize for you but you can call `flexGallery.draw()` if you need to manually redraw the layout

Customization
-------------

Pass in an object with any of the following properties to override:


	{
		id: 'flexGallery',
		gutter: 20, //minimum size - will expand to fit parent evenly
		columnWidth: 260,
		fireOnComplete: 'flex-gallery', //triggers jquery event when draw is complete
		addFillers: true
	}
	
Fillers:
By default filler divs will be placed at the bottom of your columns.  The divs will have the class `flex-gallery-filler` which you can style however you'd like, or you can pass `addFillers:false` as an option to prevent them
