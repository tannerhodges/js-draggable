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
    this.mousemoveListener = function(){};
    this.mouseupListener = function(){};

    this.el.addEventListener('mousedown', this.startMoving.bind(this));
}

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
};

/**
 * Remove mousemove event listener and reset.
 * @param  {Event}  event
 * @return {void}
 */
Draggable.prototype.stopMoving = function(event) {
    document.removeEventListener('mousemove', this.mousemoveListener);
    document.addEventListener('mouseup', this.mouseupListener);
};
