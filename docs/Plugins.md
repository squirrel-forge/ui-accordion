### @squirrel-forge/ui-accordion
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Plugins
> [Accordion](Accordion.md) <[ Plugins ]> [Table of contents](../README.md#table-of-contents)

## Table of contents
 - [UiAccordionPluginSafemode](#UiAccordionPluginSafemode)
 - [UiAccordionPluginScroller](#UiAccordionPluginScroller)
 - [UiAccordionPluginToggle](#UiAccordionPluginToggle)

---

### UiAccordionPluginSafemode
UiAccordionPluginSafemode class - UiAccordion plugin for ensuring panel stays within viewport while opening.
The component extends [UiPlugin](https://github.com/squirrel-forge/ui-core/blob/main/docs/Abstracts.md#UiPlugin) from [@squirrel-forge/ui-core](https://github.com/squirrel-forge/ui-core) module.

#### Component settings
Component settings are changed/extended as following.
```javascript
const extendConfig = {

    // Safe animation position for panel.show event
    // @type {boolean}
    safemode : true,
};
```

#### Class overview
```javascript
class UiAccordionPluginSafemode extends UiPlugin {
  static pluginName : String
  constructor( options, context, debug ) {}
}
```
For more details check the [UiAccordionPluginSafemode source file](../src/es6/Plugins/UiAccordionPluginSafemode.js).

---

### UiAccordionPluginScroller
UiAccordionPluginScroller class - UiAccordion plugin for scroll related options.
The component extends [UiPlugin](https://github.com/squirrel-forge/ui-core/blob/main/docs/Abstracts.md#UiPlugin) from [@squirrel-forge/ui-core](https://github.com/squirrel-forge/ui-core) module.

#### Component settings
Component settings are changed/extended as following.
```javascript
const extendConfig = {

    // Open panel on scroll to panel or content, Scroll to callback
    // @type {null|boolean|Function}
    scrollTo : null,

    // Open panel on scroll to panel, not content
    // @type {boolean}
    openOnScrollTo : true,

    // Capture scroll into closed panel
    // @type {boolean}
    captureScrollInto: true,
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
The component extends [UiPlugin](https://github.com/squirrel-forge/ui-core/blob/main/docs/Abstracts.md#UiPlugin) from [@squirrel-forge/ui-core](https://github.com/squirrel-forge/ui-core) module.

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
