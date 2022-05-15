/**
 * Requires
 */
import {
    UiComponent
} from '@squirrel-forge/ui-core';

// Import for local dev
// } from '../../../../ui-core';
import {
    Exception,
    bindNodeList,
    requireUniqid,
    slideShow,
    slideHide
} from '@squirrel-forge/ui-util';

// Import for local dev
// } from '../../../../ui-util';

/**
 * Ui accordion panel component exception
 * @class
 */
class UiAccordionPanelComponentException extends Exception {}

/**
 * Ui accordion panel component
 * @class
 */
export class UiAccordionPanelComponent extends UiComponent {

    /**
     * Element selector getter
     * @public
     * @return {string} - Element selector
     */
    static get selector() {
        return '[is="ui-accordion-panel"]:not([data-state])';
    }

    /**
     * Constructor
     * @constructor
     * @param {HTMLElement|HTMLDetailsElement} element - List element
     * @param {null|Object} settings - Config object
     * @param {Object} defaults - Default config
     * @param {Array<Object>} extend - Extend default config
     * @param {Object} states - States definition
     * @param {Array<Function|Array<Function,*>>} plugins - Plugins to load
     * @param {null|UiAccordionComponent} parent - Accordion parent component
     * @param {null|console|Object} debug - Debug object
     * @param {boolean} init - Run init method
     */
    constructor(
        element,
        settings = null,
        defaults = null,
        extend = null,
        states = null,
        plugins = null,
        parent = null,
        debug = null,
        init = true
    ) {

        // Check element type
        if ( !( element instanceof HTMLElement ) ) throw new UiAccordionPanelComponentException( 'Argument element must be a HTMLElement' );

        /**
         * Default config
         * @type {Object}
         */
        defaults = defaults || {

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

        /**
         * Default states
         * @type {Object}
         */
        states = states || {
            initialized : { classOn : 'ui-accordion__panel--initialized' },
            closed : { classOn : 'ui-accordion__panel--closed' },
            open : { classOn : 'ui-accordion__panel--open' },
            focus : { global : false, classOn : 'ui-accordion__panel--focus', unsets : [ 'blur' ] },
            blur : { global : false, classOn : 'ui-accordion__panel--blur', unsets : [ 'focus' ] },
            disabled : { global : false, classOn : 'ui-accordion__panel--disabled' },
        };

        // Initialize parent
        super( element, settings, defaults, extend, states, plugins, parent, debug, init );
    }

    /**
     * Initialize component
     * @public
     * @return {void}
     */
    init() {

        // Bind events
        this.bind();

        // Complete init
        super.init();
    }

    /**
     * Bind component related events
     * @public
     * @return {void}
     */
    bind() {

        // Summary
        const summaries = this.getDomRefs( 'summary' );
        if ( summaries.length !== 1 ) {
            throw new UiAccordionPanelComponentException( 'Panel must contain exactly one summary element' );
        }
        bindNodeList( summaries, [
            [ 'click', ( event ) => { this.#event_summaryClick( event ); } ],
            [ 'focus', ( event ) => { this.event_state( event ); } ],
            [ 'blur', ( event ) => { this.event_state( event ); } ],
        ] );

        // Content
        const content = this.getDomRefs( 'content' );
        if ( content.length !== 1 ) {
            throw new UiAccordionPanelComponentException( 'Panel must contain exactly one content element' );
        }

        // Component events
        this.addEventList( [
            [ 'initialized', () => { this.#event_initialized(); } ],
        ] );
    }

    /**
     * Event initialized
     * @private
     * @return {void}
     */
    #event_initialized() {

        // Get elements
        const summary = this.getDomRefs( 'summary', false );
        const content = this.getDomRefs( 'content', false );

        // Set role and id relations
        content.setAttribute( 'role', 'region' );
        content.setAttribute( 'aria-labelledby', requireUniqid( summary, this.constructor.name.toLowerCase() + '-', true ) );
        summary.setAttribute( 'aria-controls', requireUniqid( content, this.constructor.name.toLowerCase() + '-', true ) );

        // Set open or closed state
        if ( this.dom.hasAttribute( 'open' ) ) {
            summary.setAttribute( 'aria-expanded', 'true' );
            this.show( false, true, true );
        } else {
            summary.setAttribute( 'aria-expanded', 'false' );
            this.hide( false, true, true );
        }

        // Set disabled state
        this.disabled = summary.getAttribute( 'aria-disabled' ) === 'true';
    }

    /**
     * Event summary click
     * @private
     * @param {Event} event - Click event
     * @return {void}
     */
    #event_summaryClick( event ) {
        event.preventDefault();
        if ( !this.states.is( 'disabled' ) ) {
            this[ this.open ? 'hide' : 'show' ]();
        }
    }

    /**
     * Focus summary
     * @public
     * @return {void}
     */
    focus() {
        this.getDomRefs( 'summary', false ).focus();
    }

    /**
     * Blur summary
     * @public
     * @return {void}
     */
    blur() {
        this.getDomRefs( 'summary', false ).blur();
    }

    /**
     * Content element getter
     * @public
     * @return {HTMLElement} - Content element
     */
    get content() {
        return this.getDomRefs( 'content', false );
    }

    /**
     * Disabled state getter
     * @public
     * @return {boolean} - True if disabled
     */
    get disabled() {
        return this.states.is( 'disabled' );
    }

    /**
     * Disable state setter
     * @public
     * @param {boolean} state - State
     * @return {void}
     */
    set disabled( state ) {
        if ( typeof state !== 'boolean' ) {
            throw new UiAccordionPanelComponentException( this.constructor.name + '.disabled must be of type boolean' );
        }
        const summary = this.getDomRefs( 'summary', false );
        if ( state ) {
            summary.setAttribute( 'aria-disabled', 'true' );
            this.states.set( 'disabled' );
            if ( this.config.get( 'closeOnDisable' ) ) {
                this.open = false;
            }
        } else {
            summary.removeAttribute( 'aria-disabled' );
            this.states.unset( 'disabled' );
        }
    }

    /**
     * Open state getter
     * @public
     * @return {boolean} - True if open
     */
    get open() {
        return this.states.global === 'open';
    }

    /**
     * Open state setter
     * @public
     * @param {boolean} state - State
     * @return {void}
     */
    set open( state ) {
        if ( typeof state !== 'boolean' ) {
            throw new UiAccordionPanelComponentException( this.constructor.name + '.open must be of type boolean' );
        }
        if ( this.open !== state ) {
            if ( this.open ) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    /**
     * Show panel
     * @param {boolean} events - Fire events
     * @param {boolean} force - Force open
     * @param {boolean} instant - No transition
     * @return {void}
     */
    show( events = true, force = false, instant = false ) {
        if ( !this.open ) {

            // Check if we can show
            // With force enabled plugins will still run, but cannot prevent the action
            if ( !force && this.parent.canShow( this ) === false ) return;

            // Get references
            const options = this.config.get( 'slideOptions' );
            const summary = this.getDomRefs( 'summary', false );
            const content = this.getDomRefs( 'content', false );

            // Show panel content and ensure slide animation is visible
            summary.setAttribute( 'aria-expanded', 'true' );
            this.states.set( 'open' );
            this.dom.setAttribute( 'open', '' );
            if ( events ) this.dispatchEvent( 'panel.show' );
            slideShow( content, instant ? 0 : options.speed, options.easing, () => {
                if ( events ) this.dispatchEvent( 'panel.shown' );
            } );
        }
    }

    /**
     * Hide panel
     * @param {boolean} events - Fire events
     * @param {boolean} force - Force open
     * @param {boolean} instant - No transition
     * @return {void}
     */
    hide( events = true, force = false, instant = false ) {
        if ( this.open ) {

            // Check if we can hide
            // With force enabled plugins will still run, but cannot prevent the action
            if ( !force && this.parent.canHide( this ) === false ) return;

            // Get references
            const options = this.config.get( 'slideOptions' );
            const summary = this.getDomRefs( 'summary', false );
            const content = this.getDomRefs( 'content', false );

            // Hide panel content
            if ( events ) this.dispatchEvent( 'panel.hide' );
            slideHide( content, instant ? 0 : options.speed, options.easing, () => {

                // Set states after transition to prevent interruption
                summary.setAttribute( 'aria-expanded', 'false' );
                this.states.set( 'closed' );
                this.dom.removeAttribute( 'open' );
                if ( events ) this.dispatchEvent( 'panel.hidden' );
            } );
        }
    }
}
