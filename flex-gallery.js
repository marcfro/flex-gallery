var FlexGallery,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

FlexGallery = (function() {
  function FlexGallery(options) {
    this.getShortestColumnKey = __bind(this.getShortestColumnKey, this);
    this.addFillers = __bind(this.addFillers, this);
    this.draw = __bind(this.draw, this);
    var defOptions, i;
    this.parentWidth = 0;
    this.outerGutter = 0;
    this.columns = [];
    defOptions = {
      id: 'flexGallery',
      gutter: 20,
      columnWidth: 260,
      fireOnComplete: 'flex-gallery',
      addFillers: true
    };
    this.options = this.extend(defOptions, options);
    $('#' + this.options.id).css({
      'position': 'relative',
      'display': 'block',
      'margin': '0',
      'padding': '0'
    });
    i = this;
    $(window).resize(function() {
      return i.draw();
    });
    $(window).load(function() {
      return i.draw();
    });
    this.draw();
  }

  FlexGallery.prototype.draw = function() {
    var columnCount, columnsCopy, gutterCount, i, instance, newWidth, redraw, startingColumnCount, tallest;
    redraw = false;
    newWidth = $('#' + this.options.id).parent().width();
    if (this.parentWidth === 0 || newWidth !== this.parentWidth) {
      redraw = true;
      this.parentWidth = newWidth;
      startingColumnCount = Math.floor(this.parentWidth / this.options.columnWidth);
      gutterCount = startingColumnCount - 1;
      columnCount = Math.floor((this.parentWidth - (gutterCount * this.options.gutter)) / this.options.columnWidth);
      if (columnCount <= 0) {
        columnCount = 1;
      }
      this.outerGutter = Math.floor((this.parentWidth - ((columnCount * this.options.columnWidth) + (gutterCount * this.options.gutter))) / 2);
      this.columns = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; 1 <= columnCount ? _i <= columnCount : _i >= columnCount; i = 1 <= columnCount ? ++_i : --_i) {
          _results.push(0);
        }
        return _results;
      })();
    }
    instance = this;
    $('#' + this.options.id + ' li').each(function(index, el) {
      var myHeight, shortestColumnKey;
      if (redraw || typeof $(el).data('flex-gallery-set') === 'undefined') {
        $(el).css({
          'max-width': instance.options.columnWidth + 'px',
          'position': 'absolute',
          'left': '0',
          'top': '0',
          'display': 'block',
          'visibility': 'hidden',
          'min-width': instance.options.columnWidth + 'px'
        });
        myHeight = $(el).height();
        shortestColumnKey = instance.getShortestColumnKey();
        $(el).css({
          'top': instance.columns[shortestColumnKey] + 'px',
          'left': instance.calculateLeftPosition(shortestColumnKey) + 'px',
          'visibility': 'visible'
        });
        instance.columns[shortestColumnKey] += parseInt(myHeight + instance.options.gutter, 10);
        return $(el).data('flex-gallery-set', 1);
      }
    });
    columnsCopy = this.columns.slice();
    columnsCopy.sort(this.sorter);
    tallest = columnsCopy[this.columns.length - 1];
    $('#' + this.options.id).css({
      'height': tallest + 'px'
    });
    if (redraw && this.options.addFillers) {
      this.addFillers(tallest);
    }
    $('#' + this.options.id).trigger(this.options.fireOnComplete, null, {
      outerGutter: this.outerGutter
    });
    return $('#' + this.options.id);
  };

  FlexGallery.prototype.addFillers = function(tallest) {
    var key, val, _ref;
    $('.flex-gallery-filler').each(function(i, e) {
      return e.remove();
    });
    _ref = this.columns;
    for (key in _ref) {
      val = _ref[key];
      if (val < tallest) {
        key = parseInt(key, 10);
        $(document.createElement('div')).appendTo($('#' + this.options.id)).css({
          'max-width': this.options.columnWidth + 'px',
          'position': 'absolute',
          'display': 'block',
          'min-width': this.options.columnWidth + 'px',
          'height': (tallest - val - this.options.gutter) + 'px',
          'left': this.calculateLeftPosition(key) + 'px',
          'top': val + 'px'
        }).addClass('flex-gallery-filler');
      }
    }
  };

  FlexGallery.prototype.calculateLeftPosition = function(column) {
    return (column * this.options.columnWidth) + (this.options.gutter * column) + this.outerGutter;
  };

  FlexGallery.prototype.getShortestColumnKey = function() {
    var cols, j, key, shortyKey, val, _ref;
    shortyKey = 0;
    cols = this.columns.slice();
    cols.sort(this.sorter);
    _ref = this.columns;
    for (key in _ref) {
      val = _ref[key];
      if (val === 0) {
        return key;
      }
      j = 0;
      while (j < cols.length) {
        if (val === cols[0]) {
          return key;
        }
        j++;
      }
    }
    return shortyKey;
  };

  FlexGallery.prototype.sorter = function(a, b) {
    return a - b;
  };

  FlexGallery.prototype.extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  };

  return FlexGallery;

})();
