# Simple JS Draggable

## Example

```js
window.addEventListener('DOMContentLoaded', function() {
  var el = document.querySelector('#elem');

  var draggable = new Draggable(el);

  draggable
    .on('dragstart', function() { console.log('dragstart', this); })
    .on('dragend', function() { console.log('dragend', this); })
    .on('move', function() { console.log('move', this.diffX, this.diffY); });
});
```

## Credits

Based on [TZDragg by thezillion](http://fiddle.jshell.net/thezillion/Qx44z)
