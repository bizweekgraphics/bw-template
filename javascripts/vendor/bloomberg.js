/**
 * Bloomberg base module
 * 
 * @module bloomberg
 * @requires jQuery
 * @requires Underscore
 * @requires Backbone
 */

/** 
 * The root node of a namespace in dot notation.
 * @namespace bloomberg
 * @param {object} window - Reference to the window object.
 * @param {string} rootObject - Identifier for the root node.
 */
var root = (function (window, rootObject) {
  /* jshint strict: true */
  "use strict";
/**
  * Represents the base class for the root node.
  * 
  * It prepares the event bus and initializes the root node into the global namespace.
  * 
  * @constructor Base
  * @param {string} rootObject - The identifier of your namespace's root node.
  * @protected
  */
  function Base(rootObject) {
    if (typeof rootObject !== "undefined") {
      window[rootObject] = this;
    }

    /** 
     * Event bus 
     * @member {object}
     * @example
     * $(bloomberg.pool).on("customEvent", function () {
     *   console.log('customEvent has been triggered!');
     * })
     */
    this.pool = _.extend({}, Backbone.Events);

    this.namespace("");
  }
  
  var registry = {},
      root;

  Backbone.$ = $;

  /**
  * *Base Collection class.*
  * 
  * This is the base class for all data model collections. It simply connects the namespaced model.
  * 
  * A collection is used when you have multiple models that you want to iterate over.  An example could be
  * a list of students in a class room.  Each student would be its own model, but be part of a class
  * room which would be the collection.
  * 
  * Notice in the example below that we don't have to explicitly wire up which Model is being used as the 
  * default is always the data model (namespaceObject.Model).
  * 
  * All collections can extend this base class and inherit all members.
  * 
  * One would usually extend this Collection within a namespace as shown below.
  * 
  * @example
  * bloomberg.namespace("module", {
  *   "Model" : bloomberg.Model.extend({
  *     defaults : {
  *       "first" : "",
  *       "last" : ""
  *     }
  *   }),
  *   "Collection": bloomberg.Collection.extend(),
  *   "View" : bloomberg.View.extend({
  *     main : function () {
  *       var config = this.config,
  *           namespace = config.get("namespace"),
  *           namespaceObject = namespace.object;
  *       this.collection = new namespaceObject.Collection([{
  *           first: "John", 
  *           last : "Doe"
  *         }, { 
  *           first : "Jane",
  *           last : "Doe" 
  *          }], {
  *         "view" : this
  *       });
  *     }
  *   })
  * });
  * @class Collection
  * @extends Backbone.Collection
  * @name Base.prototype.Collection
  * @param {object} models Optional array of models to initialize Collection with
  * @param {object} options Optional options as defined by BackboneJS
  * @see {@link http://backbonejs.org/#Collection-constructor|BackboneJS Collection initialize method} 
  */
  Base.prototype.Collection = Backbone.Collection.extend({
    "initialize" : function (models, options) {
      var config,
          namespace,
          namespaceObject;

      if (options && options.view) {
        config = options.view.config;
        namespace = config.namespace || config.get("namespace");
        namespaceObject = namespace.object;

        this.model = namespaceObject.Model;
      }

      config =
      namespace =
      namespaceObject = null;
    }
  });

  /**
  * *Base Config class.*
  * 
  * All config can extend this base class and inherit all members.
  * 
  * One would usually extend this Config within a namespace as shown below.
  * 
  * @example
  * bloomberg.namespace("module", {
  *   "Config": bloomberg.Config.extend()
  * });
  * @class Config
  * @extends Backbone.Model
  * @name Base.prototype.Config
  * @param {object} models Optional array of models to initialize Collection with.
  * @param {object} options Optional options as defined by BackboneJS.
  * @see {@link http://backbonejs.org/#Collection-constructor|BackboneJS Collection initialize method} 
  */
  Base.prototype.Config = Backbone.Model.extend({
    "defaults" : {
      "map" : {}
    }
  });

  /**
  * *Base Model class.*
  * 
  * All models can extend this base class and inherit all members.
  * 
  * One would usually extend this Model within a namespace as shown below.
  * 
  * @example
  * bloomberg.namespace("module", {
  *   "Model": bloomberg.Model
  * });
  * @class Model
  * @extends Backbone.Model
  * @name Base.prototype.Model
  * @param {object} properties Optional object literal to extend the model with.
  * @see {@link http://backbonejs.org/#Model-constructor|BackboneJS Model initialize method} 
  */
  Base.prototype.Model = Backbone.Model.extend();

  /**
  * *Base Templates class.*
  * 
  * A model containing all template fragments needed within a namespace.
  * 
  * Having all fragments in a central model makes for cleaner code with no scattered markup throughout the code.
  * 
  * Treating templates as a model gives one the luxury of using the features of a Model to either have the 
  * templates pre-packaged with the JS or retrieved as any other model from a service.
  * 
  * The templates model gets initialized and mapped to this.templates automatically for you, if defined.
  * 
  * In the example below main() gets called automatically at instantiation.
  * 
  * @example
  * bloomberg.namespace("module", {
  *   "Templates": bloomberg.Templates.extend({
  *     "defaults" : {
  *       "greeting" : "<p>Hello <span>{{data.user}}</span></p>"
  *     }
  *   })
  *   "View" : bloomberg.View.extend({
  *     "main" : function () {
  *       var html,
  *           templateGreeting,
  *           templates = this.templates;
  * 
  *       templateGreeting = templates.greeting;
  * 
  *       html = _.template(templateGreeting, {
  *         "data" : {
  *           "user" : "joeDoe"
  *         }
  *       });
  * 
  *       this.render(html);
  *     }
  *   })
  * });
  * 
  * var view = new bloomberg.module.View();
  * 
  * @class Templates
  * @extends Backbone.Model
  * @name Base.prototype.Templates
  * @param {object} templates Optional object literal containing the various template fragments.
  */
  Base.prototype.Templates = Backbone.Model.extend();

  /**
  * *Base View class.*
  * 
  * All views can extend this base class and inherit all members into their views.
  * 
  * One would usually extend this View within a namespace as shown below.
  * 
  * All members can be overridden but care should be exercised to see if chaining the base methods may be necessary.
  * 
  * @example
  * bloomberg.namespace("module", {
  *   "View": bloomberg.View.extend({
  *     "main" : function () {
  *       console.log("Hello World");
  *     }
  *   })
  * });
  * @class View
  * @name Base.prototype.View
  * @param {object} arguments Optional arguments that get passed on to the initialize method.
  */
  Base.prototype.View = Backbone.View.extend({
    /**
     * @property {object} - Configurable properties for the view and really for the whole module.
     * @name Base.prototype.View.config
     * @public
     */
    config : {},
    /**
     * Caution should be exercised when specifying an el on a new View.  If an element already exists on the
     * page that matches the given el, it will take that element rather than creating a new one.
     * 
     * If the intention is to create a brand new element with every View instance simply leave the el null 
     * and instead specify the tagName property to reflect the type of tag that should be created as shown 
     * below.
     * 
     * @example
     * bloomberg.namespace("module", {
     *   "View": bloomberg.View.extend({
     *     "tagName" : "div"
     *   })
     * });
     * 
     * @property {DOMElement} - DOM element that the view should be attached to.
     * @name Base.prototype.View.el
     * @public
     */
    el : null,
    /** 
     * All events bindings and unbindings should occur in this method. If we use BackboneJS as the MVC engine 
     * (which as of this writing, we do), then this can also be a key/value hash.  The difference is function 
     * gets defined at runtime whereas hash is known at compile-time.
     * 
     * It is good practice to namespace your events using the built-in namespace helper config.
     * 
     * Namespacing events allows you to leverage jQuery's ability to unbind or target events that pertain only 
     * to your given namespace.
     * 
     * @example
     * bloomberg.namespace("module", {
     *   "View": bloomberg.View.extend({
     *     "events" : function () {
     *       var config = this.config,
     *           namespaceLiteral = config.namespace.literal;
     *
     *       $(bloomberg.pool).on("greetWorld." + namespaceLiteral, function () {
     *         alert('Hello World!');
     *       });
     *     }
     *   })
     * });
     * 
     * @method
     * @name Base.prototype.View.events
     * @see {@link http://backbonejs.org/#View-extend|BackboneJS events member}
     * @see {@link http://backbonejs.org/#Events-listenTo|BackboneJS listenTo function}
     */
    events : function events() {
    },
    /** 
     * This method gets called automatically when the View class is instantiated.  
     * 
     * Its purpose is to allow an abstract initialization layer.
     *
     * @method
     * @name Base.prototype.View.initialize
     * @param {object} options - Same arguments as passed into the View during instantiation.
     * @see View
     * @see main
     */
    initialize : function (options) {
      var config = this.config,
          namespace = config.namespace || config.get("namespace"),
          namespaceLiteral = namespace.literal,
          namespaceObject = namespace.object,
          override = options && options.config || {};

      /**
       * @property {object} - Cache for each module to be used for anything needing caching
       * @public
       */
      this.cache = {
        views : []
      };

      if (namespaceObject.Config) {
        this.config = new namespaceObject.Config(override);
        this.config.set("namespace", namespace);
      }
      else if (options && options.config) {
        this.config = new root.Config(override);
        this.config.set("namespace", namespace);
      }

      if (namespaceObject.Model && ((options && !options.model) || !options)) {
        if (this.config) {
          namespaceObject.Model = namespaceObject.Model.extend({
            config : this.config
          });
        }
        this.model = new namespaceObject.Model();
      }

      if (namespaceObject.Templates) {
        this.templates = new namespaceObject.Templates();
      }

      if (options) {
        if (options.config) {
          delete options.config;
        }
        if (options.model && namespaceObject.Model) {
          this.model = new namespaceObject.Model(options.model);
          delete options.model;
        }
      }

      if (!this.collection && namespaceObject.Collection) {
        this.collection = new namespaceObject.Collection([], {
          view : this
        });
      }

      if (this.model && this.config) {
        this.model.config = this.config;
      }

      this.main(options);

      options = null;
    },
    /** 
     * This method gets called by the initialize() method automatically and has the arguments from the View's 
     * intantiation passed in.
     * 
     * Its purpose is to abstract your code from the low-level plumbing.
     * 
     * The convention is for the main to act as _your_ initialize method.
     * 
     * Remember that this method gets called immediately on your module's instantiation.  You can choose to call
     * render() from here to render your view immediately, or explicitly call render() later.
     *
     * @method
     * @name Base.prototype.View.main
     * @param {object} options - Same arguments as passed into the View during instantiation.
     * @see View
     * @see initialize
     * @see render
     */
    main : function (options) {
    },
    /** 
     * This method handles its own removal as well as the removal of all its subviews.
     * @method
     * @name Base.prototype.View.remove
     * @fires destroy
     * @see View
     */
    remove : function remove() {
      var cachedViews,
          config = this.config,
          counter = 0,
          eventPool = window[rootObject].pool,
          namespace = config.namespace || config.get("namespace"),
          namespaceLiteral = namespace.literal,
          namespaceObject = namespace.object;

      cachedViews = this.cache.views;
      counter = cachedViews.length;

      /*jshint expr: true */
      eventPool.trigger("destroy." + namespaceLiteral, { view : this });

      while (cachedViews[--counter]) {
        cachedViews[counter].remove();
        cachedViews[counter] = null;
      }

      this.cache.views = [];
      this.config = {};
      this.model = null;
      
      delete this.config;
      delete this.model;

      Backbone.View.prototype.remove.apply(this, arguments);

      cachedViews =
      counter = null;
    },
    /** 
     * This method is responsible for everything related to assemble all moving parts into one final view.
     * 
     * While it is common for the render() method to reveal the view to the end-user, it is not necessary to do 
     * so.  It could return markup for the rendered view that could be revealed (e.g. added to the DOM) to the 
     * end-user at a later time.
     *
     * Since this method is not called automatically by any of the base functionality, it is completely up to 
     * you what, if any, arguments it takes and what it returns.
     * 
     * @method
     * @name Base.prototype.View.render
     * @see main
     * @see {@link http://backbonejs.org/#View-render|BackboneJS render function}
     */
    render : function () {
    }
  });

  /**
  * *Namespace function.*
  * 
  * This method is responsible for namespacing, or properly insulating, your module from any other.  
  * 
  * A namespace is defined in dot notation and promotes a nested object namespace.
  * 
  * If a namespace's parent nodes do not exist the function will autovivify them.
  * 
  * The chosen namespace will map across the assets and filesystems.  Each node in the namespace maps directly 
  * onto a corresponding node in other places (e.g. filesystem).
  * 
  * Once the module has completely loaded it fires off a namespaced ready event.
  * 
  * @example
  * bloomberg.namespace("bcom.common.header.logo", {
  *   "View": bloomberg.View.extend({
  *     "main" : function () {
  *       console.log("Hello World");
  *     }
  *   })
  * });
  * 
  * new bloomberg.bcom.common.header.logo.View(); // console will write out "Hello World"
  * 
  * @method
  * @name Base.prototype.namespace
  * @param {string} namespace A string literal containing the desired namespace that will hinge off of given 
  * object
  * @param {object} literal Object literal containing all module classes to be placed in given namespace
  * @fires ready
  * @see {@link http://addyosmani.com/blog/essential-js-namespacing/|Addy Osmani on namespaces}
  */
  Base.prototype.namespace = function (namespace, literal) {
    var count = 0,
        eventPool = window[rootObject].pool,
        key,
        parts = namespace ? namespace.split(".") : [],
        partsCount = parts.length,
        verified = this;

    literal = literal || {};

    /*jshint forin: false */
    for (; count < partsCount; count++) {
      if (typeof verified[parts[count]] === "undefined") {
        /* jshint laxbreak: true */
        verified[parts[count]] = count === partsCount - 1
          ? literal
          : {};
      }
      else if (count === partsCount - 1) {
      // TODO $.extend() verified w/ Base prototype
        for (key in literal) {
          verified[parts[count]][key] = literal[key];
        }
      }
      verified = verified[parts[count]];
    }

    verified.View = verified.View.extend({
      config : {
        namespace : {
          "literal": namespace ? rootObject + "." + namespace : rootObject,
          "object": verified
        }
      }
    });

    // TODO - we may not need this registry.  Spend some time on the .ready() function
    registry[verified.View.prototype.config.namespace.literal] = {
      "object": verified
    };
    /**
     * Notifies given event pool of module readiness.
     * 
     * This merely informs the namespace has been created and the given literal has been associated with the 
     * given namespace.
     * 
     * It does not imply any of the initialization or logic of the module has executed.
     * 
     * Remember that each module will emit its own _namespaced_ ready event.
     * 
     * @example
     * $(bloomberg.pool).on("ready.bloomberg.bcom.common.header.logo", function () {
     *   console.log('bloomberg.bcom.common.header.logo is ready!');
     * });
     * 
     * @event Base#ready
     * @see ready
     */
    $(eventPool).trigger("ready." + verified.View.prototype.config.namespace.literal);

    count =
    key =
    parts =
    partsCount = null;

    return verified;
  };

  /**
   * Similar to jQuery's $.ready() except this allows for a callback on module readiness instead of DOM.
   * 
   * Resolves whether or not module is already ready or not and properly handles callback accordingly.
   * 
   * @example
   * bloomberg.ready("bloomberg.bcom.common.header.logo", function () {
   *   console.log('bloomberg.bcom.common.header.logo is ready!');
   * });
   * 
   * @method
   * @name Base.prototype.ready
   * @fires ready
   * @see Base#event:ready
   */
  Base.prototype.ready = function (namespace, callback) {
    var eventName = "ready." + namespace,
        eventPool = window[rootObject].pool,
        self = this;

    if (typeof registry[namespace] !== "undefined") {
      callback.call(this,
        jQuery.Event(eventName));
    }
    else {
      $(eventPool).on(eventName,
        function (evt) {
          callback.call(self, evt);
        });
    }
  };

  /* The code below is only used by BCom modules and will eventually be deprecated */
  Base.prototype.views = (function () {
    var views = [];
    return {
      add : function (view) {
        views.push(view);
      },
      list : function() {
        return views;
      },
      render : function() {
        _.each(views, function (view) {
          if (typeof view.render === "function") {
            view.render();
          }
        });
      },
      destroy : function () {
        _.each(views, function (view) {
          if (typeof view.destroy === "function") {
            view.destroy();
          }
        });
        // TODO: check if the modules destroy action succeeded
        views = [];
      }
    };
  
  })();

  root = window[rootObject] = new Base(rootObject);

  return root;
})(this, "bloomberg");
