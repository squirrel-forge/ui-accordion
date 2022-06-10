### @squirrel-forge/ui-accordion
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Accordion
> [Table of contents](../README.md#table-of-contents) <[ Accordion ]> [Plugins](Plugins.md)

## Table of contents
 - [UiAccordionComponent](#UiAccordionComponent)
 - [UiAccordionPanelComponent](#UiAccordionPanelComponent)

---

### UiAccordionComponent
UiAccordionComponent class - Accordion component with events and plugins support.
The component extends [UiComponent](https://github.com/squirrel-forge/ui-core/blob/main/docs/Abstracts.md#UiComponent) from [@squirrel-forge/ui-core](https://github.com/squirrel-forge/ui-core) module.

#### Component settings
Component settings might be changed or extended through plugins.
```javascript
const defaults = {

    // Mode
    // @type {'free'}
    mode : 'free',

    // Available modes
    // @type {Array}
    availableModes : [ 'free' ],

    // Children
    // @type {Object}
    children : {

        // Panels
        // @type {string}
        panels : UiAccordionPanelComponent,
    }
};
```

#### Class overview
```javascript
class UiAccordionComponent extends UiComponent {
  static selector : String
  constructor( element, settings = null, defaults = null, extend = null, states = null, plugins = null, parent = null, debug = null, init = true ) {}
  mode : String
  disabled : Boolean
  canShow( panel ) {} // boolean
  canHide( panel ) {} // boolean
  show( index = null, events = true, force = false ) {} // void
  hide( index = null, events = true, force = false ) {} // void
}
```
For more details check the [UiAccordionComponent source file](../src/es6/Accordion/UiAccordionComponent.js).

#### Events
The accordion wrapper has no own custom events, check the [UiAccordionPanelComponent](#uiaccordionpanelcomponent) for related events.

#### Using the component
For details refer to the settings, class overview and code file mentioned above.
```javascript
import { UiAccordionComponent } from '@squirrel-forge/ui-form';

// Will initialize a specific form
UiAccordionComponent.make( document.querySelector( '.ui-accordion' ) );

// Will initialize all forms in the current document
UiAccordionComponent.makeAll();
```

#### Component markup
Following markup is required for an accordion.
```html
<ol is="ui-accordion" class="ui-accordion"></ol>
```
Set a JSON config the following way:
```html
<ol data-config='{"option":{"name":true},"optionName":true}'></ol>
```
Set individual config options via following attribute syntax:
```html
<!-- Will resolve to: option.name & optionName = true -->
<ol data-option-name="true"></ol>
```
---

### UiAccordionPanelComponent
UiAccordionPanelComponent class - AccordionPanel component.
The component extends [UiComponent](https://github.com/squirrel-forge/ui-core/blob/main/docs/Abstracts.md#UiComponent) from [@squirrel-forge/ui-core](https://github.com/squirrel-forge/ui-core) module.

#### Component settings
Component settings might be changed or extended through plugins.
```javascript
const defaults = {

    // Close the panel when disabled
    // @type {boolean}
    closeOnDisable : true,

    // Slide function options
    slideOptions : {

        // Slide speed, default: 300ms
        // @type {number}
        speed : null,

        // Animation easing, default: ease
        // @type {string}
        easing : null,
    },

    // Dom references
    // @type {Object}
    dom : {

        // Summary
        // @type {string}
        summary : '.ui-accordion__summary',

        // Content
        // @type {string}
        content : '.ui-accordion__content',
    }
};
```

#### Class overview
```javascript
class UiAccordionPanelComponent extends UiComponent {
  static selector : String
  constructor( element, settings = null, defaults = null, extend = null, states = null, plugins = null, parent = null, debug = null, init = true ) {}
  content : HTMLElement
  disabled : Boolean
  open : Boolean
  animating : Boolean
  focus() {} // void
  blur() {} // void
  show( events = true, force = false, instant = false ) {} // void
  hide( events = true, force = false, instant = false ) {} // void
}
```
For more details check the [UiAccordionPanelComponent source file](../src/es6/Accordion/UiAccordionPanelComponent.js).

#### Events
 - **panel.show** - Fired before the panel opens, can be prevented with event.preventDefault().
 - **panel.shown** - Fired after the panel has opened.
 - **panel.hide** - Fired before the panel closes, can be prevented with event.preventDefault().
 - **panel.hidden** - Fired after the panel has closed.

#### Using the component
For details refer to the settings, class overview and code file mentioned above.

#### Component markup
Following markup should be used for an accordion panel, required are only the panel, summary and content elements.
```html
<li class="ui-accordion__item">
    <details is="ui-accordion-panel" class="ui-accordion__panel" open>
        <summary class="ui-accordion__summary">
            <button class="ui-accordion__button" type="button" tabindex="-1" style="pointer-events:none">
                <span class="ui-accordion__icon"></span>
                <span class="ui-accordion__label">Summary</span>
            </button>
        </summary>
        <div class="ui-accordion__content">
            <div class="ui-accordion__wrap">Content</div>
        </div>
    </details>
</li>
```

---

> [Table of contents](../README.md#table-of-contents) <[ Accordion ]> [Plugins](Plugins.md)
