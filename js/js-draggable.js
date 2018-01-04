// Universal Module Definition: Return Exports
// https://github.com/umdjs/umd/blob/master/templates/amdWeb.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // ------------------------------
  // Simple JS Draggable
  // ------------------------------

  /**
   * Create a simple, draggable element.
   * @param {Element}  el
   */
  function Draggable(el) {
    this.el = el;
    this.diffX = 0;
    this.diffY = 0;
    this.callbacks = {
      dragstart: [],
      dragend: [],
      move: []
    };
    this.mousemoveListener = function(){};
    this.mouseupListener = function(){};

    this.el.addEventListener('mousedown', this.startMoving.bind(this));
  }

  /**
   * Add event callbacks.
   * @param  {String}    type
   * @param  {Function}  callback
   * @return {void}
   */
  Draggable.prototype.on = function(type, callback) {
    this.callbacks[type].push(callback);
  };

  /**
   * Move an element by setting its left and top positions.
   * @param  {Number}  x
   * @param  {Number}  y
   * @return {void}
   */
  Draggable.prototype.move = function(event) {
    var newX = event.clientX - this.diffX,
      newY = event.clientY - this.diffY;

    requestAnimationFrame((function() {
      this.el.style.left = newX + 'px';
      this.el.style.top  = newY + 'px';

      // Callback: move
      if (this.callbacks.move.length > 0) {
        this.callbacks.move.forEach((function(fn) {
          fn.call(this);
        }).bind(this));
      }
    }).bind(this));
  };

  /**
   * Add mousemove event listener for element.
   * @param  {Event}  event
   * @return {void}
   */
  Draggable.prototype.startMoving = function(event) {
    var mouseX = event.clientX,
      mouseY = event.clientY;

    this.diffX = mouseX - (this.el.style.left.replace('px', '') || 0);
    this.diffY = mouseY - (this.el.style.top.replace('px', '') || 0);

    this.mousemoveListener = this.move.bind(this);
    this.mouseupListener = this.stopMoving.bind(this);

    document.addEventListener('mousemove', this.mousemoveListener);
    document.addEventListener('mouseup', this.mouseupListener);

    // Callback: dragstart
    if (this.callbacks.dragstart.length > 0) {
      this.callbacks.dragstart.forEach((function(fn) {
        fn.call(this);
      }).bind(this));
    }
  };

  /**
   * Remove mousemove event listener and reset.
   * @param  {Event}  event
   * @return {void}
   */
  Draggable.prototype.stopMoving = function(event) {
    document.removeEventListener('mousemove', this.mousemoveListener);
    document.addEventListener('mouseup', this.mouseupListener);

    // Callback: dragend
    if (this.callbacks.dragend.length > 0) {
      this.callbacks.dragend.forEach((function(fn) {
        fn.call(this);
      }).bind(this));
    }
  };

  return Draggable;

}));
