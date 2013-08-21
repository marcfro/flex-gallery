FlexGallery
===========

FlexGallery is a very lightweight plugin which takes an `ul` element and laying out the `li` elements left to right and fills in the shortest row with the next element... like Pinterest.


Installation
------------

Include the flex-gallery-min.js in your page


Usage
-----

Give your `ul` element an `id` (the default is 'flexList') and create a new FlexGallery (after jQuery has loaded)

var flexGallery = new FlexGallery({id:'customId'});


Customization
-------------

Pass in an object with any of the following properties to override:

`{
	id: 'flexList',
	gutter: 20,						//minimum size - will expand to fit parent evenly
	columnWidth: 260,
	fireOnComplete: 'flex-gallery', //triggers jquery event when draw is complete
	addFillers: true
}`