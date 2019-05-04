describe('css', function() {

  describe('set', function() {

    it('should set style property on element', function() {
      var element = $('<div/>');
      var expected = '#f00';
      var actually = 'rgb(255, 0, 0)';
      element.css('color', expected);
      var actual = element[0].style.color;
      assert(actual === actually);
    });

    it('should set dashed style property on elements', function() {
      var expected = '10px';
      $('#testFragment').css('padding-left', expected);
      var actual = getComputedStyle($('#testFragment')[0]).paddingLeft;
      assert(actual === expected);
    });

    it('should set camelCased style property on elements', function() {
      var expected = '10px';
      $('#testFragment').css('paddingRight', expected);
      var actual = getComputedStyle($('#testFragment')[0]).paddingRight;
      assert(actual === expected);
    });

    it('should set multiple style property on elements', function() {
      var element = $('#testFragment');
      var expected = ['300', 'italic'];
      element.css({
        'font-weight': expected[0],
        'font-style': expected[1]
      });
      var actual = [getComputedStyle(element[0]).fontWeight, getComputedStyle(element[0]).fontStyle];
      assert(actual[0] === expected[0]);
      assert(actual[1] === expected[1]);
    });

    it('should empty style property on element', function() {
      var expected = '';
      $('#testFragment')[0].style.marginBottom = '1px';
      $('#testFragment').css('marginBottom', expected);
      var actual = $('#testFragment')[0].style.marginBottom;
      assert(actual === expected);
    });

    it('should not throw when trying to set style property in empty collection', function() {
      var element = $('#not-there');
      var fn = element.css.bind(element, 'color', '#00f');
      assert.doesNotThrow(fn, TypeError);
    });

    it('should set style property with important priority on elements', function() {
      var expected = '15px';
      $('#testFragment').css('paddingRight', expected + ' !important');
      var element = $('#testFragment')[0];
      var actualValue = element.style.getPropertyValue('padding-right');
      var actualPriority = element.style.getPropertyPriority('padding-right');
      console.log('actual/expected', actualValue, expected);
      assert(actualValue === expected);
      assert(actualPriority === 'important');
    });

    it('should set style property without important priority on elements', function() {
      var expected = '20px';
      $('#testFragment').css('paddingRight', '20px');
      var element = $('#testFragment')[0];
      var actualValue = element.style.getPropertyValue('padding-right');
      var actualPriority = element.style.getPropertyPriority('padding-right');
      assert(actualValue === expected);
      assert(actualPriority === '');
    });

    it('should set multiple style property with important priority on elements', function() {
      var element = $('#testFragment');
      var expected = ['400', 'normal'];
      element.css({
        'font-weight': expected[0] + ' !important',
        'font-style': expected[1]
      });
      var actualValue = [
        element[0].style.getPropertyValue('font-weight'),
        element[0].style.getPropertyValue('font-style')
      ];
      var actualPriority = [
        element[0].style.getPropertyPriority('font-weight'),
        element[0].style.getPropertyPriority('font-style')
      ];
      assert(actualValue[0] === expected[0]);
      assert(actualPriority[0] === 'important');
      assert(actualValue[1] === expected[1]);
      assert(actualPriority[1] === '');
    });

  });

  describe('get', function() {

    it('should get dashed style property from first element', function() {
      var expected = 2;
      $('#testFragment .two').css('zIndex', expected);
      var actual = $('#testFragment [class]').css('z-index');
      assert(actual === expected);
    });

    it('should get camelCased style property from first element', function() {
      var expected = '#00f';
      var actually = 'rgb(0, 0, 255)';
      $('#testFragment .two').css('background-color', expected);
      var actual = $('#testFragment [class]').css('backgroundColor');
      assert(actual === actually);
    });

    it('should not throw when trying to get style property in empty collection', function() {
      var element = $('#not-there');
      var fn = element.css.bind(element);
      var actual = element.css('foo');
      assert.doesNotThrow(fn, TypeError);
      assert(actual === undefined);
    });

  });

  it('should provide a chainable API', function() {
    var expected = 'italic';
    var element = $('#testFragment').css('font-style', 'inherit').css('font-style', expected);
    var actual = getComputedStyle(element[0]).fontStyle;
    assert(actual === expected);
  });

});
