### @squirrel-forge/ui-accordion
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Plugins
> [Accordion](Accordion.md) <[ Plugins ]> [Table of contents](../README.md#table-of-contents)

## Table of contents
 - [UiAccordionPluginScroller](#UiAccordionPluginScroller)
 - [UiAccordionPluginToggle](#UiAccordionPluginToggle)

---

### UiAccordionPluginScroller
UiAccordionPluginScroller class - UiAccordion plugin for related options.

#### Component settings
Component settings are changed/extended as following.
```javascript
const extendConfig = {

    // Scroll to panel on events
    // @type {Array}
    scrollToOn : [ 'panel.shown' ],

    // Scroll to callback
    // @type {true|Function}
    scrollTo : false,

    // Open panel on scroll to panel or content
    // @type {Array}
    openOn : [ 'scroll.after' ],
};
```

#### Class overview
```javascript
class UiAccordionPluginScroller extends UiPlugin {
  static pluginName : String
  constructor( options, context, debug ) {}
}
```
For more details check the [UiAccordionPluginScroller source file](../src/es6/Plugins/UiAccordionPluginScroller.js).

---

### UiAccordionPluginToggle
UiAccordionPluginToggle class - UiAccordion plugin adds a toggle mode.

#### Component settings
Component settings are changed/extended as following.
```javascript
const extendConfig = {

    // Mode
    // @type {'free'|'toggle'}
    mode : 'toggle',

    // Available modes
    // @type {Array}
    availableModes : [ 'free', 'toggle' ],

    // Close all panels except the first open one on init
    // @type {boolean}
    closeAllButFirstOnInit : true,
};
```

#### Class overview
```javascript
class UiAccordionPluginToggle extends UiPlugin {
  static pluginName : String
  constructor( options, context, debug ) {}
}
```
For more details check the [UiAccordionPluginToggle source file](../src/es6/Plugins/UiAccordionPluginToggle.js).

---

> [Accordion](Accordion.md) <[ Plugins ]> [Table of contents](../README.md#table-of-contents)
