// Generated by CoffeeScript 1.3.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Capybara || (window.Capybara = {});

  Capybara.Recorders || (Capybara.Recorders = {});

  Capybara.Recorders.Actions = (function() {

    Actions.name = 'Actions';

    Actions.prototype.actions = [];

    Actions.prototype.namespace = 'actionrecorder';

    Actions.prototype.events = {
      'change input[type=file]': 'attachFile',
      'change input[type=checkbox]': 'check',
      'click input[type=radio]': 'choose',
      'click input[type=submit]': 'clickButton',
      'click input[type=reset]': 'clickButton',
      'click input[type=button]': 'clickButton',
      'click button': 'clickButton',
      'click a': 'clickLink',
      'keyup input[type=text]': 'fillIn',
      'keyup input[type=password]': 'fillIn',
      'keyup input[type=email]': 'fillIn',
      'keyup input[type=search]': 'fillIn',
      'keyup textarea': 'fillIn',
      'change select': 'select'
    };

    function Actions(options) {
      this.select = __bind(this.select, this);

      this.fillIn = __bind(this.fillIn, this);

      this.clickLink = __bind(this.clickLink, this);

      this.clickButton = __bind(this.clickButton, this);

      this.choose = __bind(this.choose, this);

      this.uncheck = __bind(this.uncheck, this);

      this.check = __bind(this.check, this);

      this.attachFile = __bind(this.attachFile, this);

      var _ref;
      this.$scope = $(options.scope || document);
      this.afterCaptureCallback = (_ref = options.afterCapture) != null ? _ref : function() {};
    }

    Actions.prototype.start = function() {
      return this._attachEvents();
    };

    Actions.prototype.stop = function() {
      return this._detachEvents();
    };

    Actions.prototype.attachFile = function(e) {
      var $el, locator;
      $el = $(e.target);
      locator = $el.getLocator(['name', 'id', 'label']);
      return this.findScopeAndCapture('attachFile', $el, locator, {
        file: $el.val()
      });
    };

    Actions.prototype.check = function(e) {
      var $el, locator;
      $el = $(e.target);
      if ($el.is(':checked')) {
        locator = $el.getLocator(['name', 'id', 'label']);
        return this.findScopeAndCapture('check', $el, locator);
      } else {
        return this.uncheck($el);
      }
    };

    Actions.prototype.uncheck = function(e) {
      var $el, locator;
      $el = $(e.target);
      locator = $el.getLocator(['name', 'id', 'label']);
      return this.findScopeAndCapture('uncheck', $el, locator);
    };

    Actions.prototype.choose = function(e) {
      var $el, locator;
      $el = $(e.target);
      locator = $el.getLocator(['label', 'id', 'name']);
      return this.findScopeAndCapture('choose', $el, locator);
    };

    Actions.prototype.clickButton = function(e) {
      var $el, locator;
      $el = $(e.target);
      locator = $el.getLocator(['id', 'text', 'value']);
      return this.findScopeAndCapture('clickButton', $el, locator);
    };

    Actions.prototype.clickLink = function(e) {
      var $el, locator;
      $el = $(e.target);
      locator = $el.getLocator(['id', 'text', 'imgAlt']);
      return this.findScopeAndCapture('clickLink', $el, locator);
    };

    Actions.prototype.fillIn = function(e) {
      var $el, locator, previous;
      $el = $(e.target);
      locator = $el.getLocator(['name', 'id', 'label']);
      previous = _.last(this.actions);
      if (previous && previous.name === 'fillIn' && previous.locator === locator) {
        return previous.options["with"] = $el.val();
      } else {
        return this.findScopeAndCapture('fillIn', $el, locator, {
          width: $el.val()
        });
      }
    };

    Actions.prototype.select = function(e) {
      var $el, locator;
      $el = $(e.target);
      locator = $el.getLocator(['name', 'id', 'label']);
      return this.findScopeAndCapture('select', $el, $el.val(), {
        from: locator
      });
    };

    Actions.prototype.findScopeAndCapture = function(name, $el, locator, options) {
      return this.capture(name, locator, this._formScope($el), options);
    };

    Actions.prototype.capture = function(name, locator, scope, options) {
      var action;
      if (options == null) {
        options = {};
      }
      action = {
        type: this.namespace,
        name: name,
        locator: locator,
        scope: scope,
        options: options
      };
      this.actions.push(action);
      return this.afterCaptureCallback(action);
    };

    Actions.prototype._formScope = function($el) {
      var $form;
      if (($form = $el.parents('form')).length) {
        return $form.locator(['id']);
      } else {
        return null;
      }
    };

    Actions.prototype._nsevent = function(event) {
      return [event, this.namespace].join('.');
    };

    Actions.prototype._attachEvents = function() {
      var event, method, selector, target, _ref, _ref1, _results;
      _ref = this.events;
      _results = [];
      for (target in _ref) {
        method = _ref[target];
        _ref1 = target.split(' '), event = _ref1[0], selector = _ref1[1];
        _results.push(this.$scope.delegate(selector, event, this[method]));
      }
      return _results;
    };

    Actions.prototype._detachEvents = function() {
      return this.$scope.undelegate("." + this.namespace);
    };

    return Actions;

  })();

}).call(this);
