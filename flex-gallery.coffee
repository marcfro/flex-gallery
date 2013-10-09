# /*! FlexGallery v0.0.1 | https://github.com/marcfro/flex-gallery | Copyright 2013, Marco DiDomenico | http://kit.mit-license.org */

class FlexGallery
	
	constructor: (options) ->
		@parentWidth = 0
		@outerGutter = 0
		@columns = []
		defOptions = {
			id: 'flexGallery'
			gutter: 20 #minimum size - will expand to fit parent evenly
			columnWidth: 260 #min-width
			fireOnComplete: 'flex-gallery'
			addFillers: yes
		}
		@options = @extend defOptions, options
		$('#'+@options.id).css({'position':'relative', 'display':'block', 'margin':'0','padding':'0'})
		i = @
		$(window).resize -> i.draw()
		$(window).on('load', -> i.draw(yes))
		@draw()
	
	draw: (force = no) =>
		redraw = force
		newWidth = $('#'+@options.id).parent().width()
		if @parentWidth is 0 or newWidth isnt @parentWidth or force
			redraw = yes
			@parentWidth = newWidth
			startingColumnCount = Math.floor (@parentWidth / @options.columnWidth)
			gutterCount = startingColumnCount - 1
			columnCount = Math.floor( (@parentWidth - (gutterCount * @options.gutter)) / @options.columnWidth)
			if columnCount <= 0
				columnCount = 1
			@outerGutter = Math.floor((@parentWidth - ((columnCount * @options.columnWidth) + (gutterCount * @options.gutter))) / 2)
			@columns = (0 for i in [1..columnCount])

		instance = this;
		$('#'+@options.id + ' li').each (index,el) ->
			if redraw or typeof $(el).data('flex-gallery-set') is 'undefined'
				$(el).css({
					'max-width':instance.options.columnWidth+'px'
					'position': 'absolute'
					'left': '0'
					'top': '0'
					'display': 'block'
					'visibility': 'hidden'
					'min-width': instance.options.columnWidth+'px'
				});
				myHeight = $(el).height()
				shortestColumnKey = instance.getShortestColumnKey()
				$(el).css({ 
					'top' : instance.columns[shortestColumnKey]+'px'
					'left': instance.calculateLeftPosition(shortestColumnKey)+'px'
					'visibility':'visible'
				})
				instance.columns[shortestColumnKey] += parseInt myHeight + instance.options.gutter, 10
				$(el).data('flex-gallery-set', 1)
		columnsCopy = @columns.slice()
		columnsCopy.sort(@sorter)
		tallest = columnsCopy[@columns.length-1]
		$('#'+@options.id).css({'height': tallest+'px'})
		if redraw and @options.addFillers
			@addFillers(tallest)
		$('#'+@options.id).trigger(@options.fireOnComplete, null, {outerGutter : @outerGutter})
		$('#'+@options.id)
	
	addFillers: (tallest) =>
		$('.flex-gallery-filler').each (i,e) ->
			e.remove()
		for key, val of @columns
			if val < tallest
				key = parseInt key, 10
				$(document.createElement('div')).appendTo($('#'+@options.id)).css({
					'max-width':@options.columnWidth+'px'
					'position': 'absolute'
					'display': 'block'
					'min-width': @options.columnWidth+'px'
					'height' : (tallest - val - @options.gutter) + 'px'
					'left': @calculateLeftPosition(key) + 'px'
					'top': val + 'px'
				}).addClass('flex-gallery-filler')
				
		return
	
	calculateLeftPosition: (column) ->
		(column * @options.columnWidth) + (@options.gutter * column) + @outerGutter

	getShortestColumnKey: =>
		shortyKey = 0
		cols = @columns.slice()
		cols.sort(@sorter)
		for key, val of @columns
			if val is 0
				return key
			j = 0
			while j < cols.length
				if val == cols[0]
					return key
				j++
		shortyKey
		
	sorter: (a,b) ->
		a-b
			
	extend: (object, properties) ->
		for key, val of properties
			object[key] = val
		object