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
    isPojo
} from '@squirrel-forge/ui-util';

// Import for local dev
// } from '../../../../ui-util';
import { UiAccordionPanelComponent } from './UiAccordionPanelComponent';

/**
 * Ui accordion component exception
 * @class
 * @extends Exception
 */
class UiAccordionComponentException extends Exception {}

/**
 * Ui accordion component
 * @class
 * @extends UiComponent
 */
export class UiAccordionComponent extends UiComponent {

    /**
     * Element selector getter
     * @public
     * @return {string} - Element selector
     */
    static get selector() {
        return '[is="ui-accordion"]:not([data-state])';
    }

    /**
     * Constructor
     * @constructor
     * @param {HTMLElement|HTMLOListElement} element - List element
     * @param {null|Object} settings - Config object
     * @param {Object} defaults - Default config
     * @param {Array<Object>} extend - Extend default config
     * @param {Object} states - States definition
     * @param {Array<Function|Array<Function,*>>} plugins - Plugins to load
     * @param {null|UiComponent} parent - Parent object
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
        if ( !( element instanceof HTMLElement ) ) throw new UiAccordionComponentException( 'Argument element must be a HTMLElement' );

        /**
         * Default config
         * @type {Object}
         */
        defaults = defaults || {

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

        /**
         * Default states
         * @type {Object}
         */
        states = states || {
            initialized : { classOn : 'ui-accordion--initialized' },
            disabled : { global : false, classOn : 'ui-accordion--disabled' },
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

        // Component events
        this.addEventList( [
            [ 'initialized', ( event ) => { this.#event_initialized( event ); } ],
            [ 'keydown', ( event ) => { this.#event_keydown( event ); } ],
        ] );
    }

    /**
     * Event initialized
     * @private
     * @param {Event} event - Initialized event
     * @return {void}
     */
    #event_initialized( event ) {
        if ( event.detail.target !== this ) return;

        // Initialize panels
        this._initChildren();
    }

    /**
     * Event keydown
     * @private
     * @param {Event} event - Keyboard event
     * @return {void}
     */
    #event_keydown( event ) {
        const keys = [ 'ArrowUp', 'ArrowDown', 'Home', 'End' ];
        if ( !keys.includes( event.key ) ) return;

        // Get contained index
        let index = null;
        this.eachChild( ( child, i ) => {

            // Focus target is the panel or part of it and not part of the content
            if ( child.dom === event.target || child.dom.contains( event.target ) && !child.content.contains( event.target ) ) {
                index = i;
                return true;
            }
        } );

        // If we were able to select a panel index
        if ( index !== null ) {
            let move_focus_to = this.#event_keydown_plugins( event, index );

            // Default focus selection logic
            if ( move_focus_to === null ) {
                if ( event.key === 'ArrowUp' ) {
                    move_focus_to = this.#select_first_active_from( index - 1, -1 );
                    if ( move_focus_to === null ) {
                        move_focus_to = this.#select_first_active_from( this.children.length - 1, -1 );
                    }
                } else if ( event.key === 'ArrowDown' ) {
                    move_focus_to = this.#select_first_active_from( index + 1, 1 );
                    if ( move_focus_to === null ) {
                        move_focus_to = this.#select_first_active_from( 0, 1 );
                    }
                } else if ( event.key === 'Home' ) {
                    move_focus_to = this.#select_first_active_from( 0, 1 );
                } else if ( event.key === 'End' ) {
                    move_focus_to = this.#select_first_active_from( this.children.length - 1, -1 );
                }
            }

            // Move the focus
            if ( move_focus_to !== null ) {
                if ( !this.children[ move_focus_to ] ) {
                    throw new UiAccordionComponentException( 'Invalid child index: ' + move_focus_to );
                }
                this.children[ move_focus_to ].focus();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }

    /**
     * Run keyboard selection plugins
     * @param {Event} event - KeyDown event
     * @param {number} index - Current child index
     * @return {null|number} - New index
     */
    #event_keydown_plugins( event, index ) {
        const results = this.plugins?.run( 'keyDownSelectFrom', [ event, index ] );
        if ( isPojo( results ) ) {
            const values = Object.values( results );
            for ( let i = 0; i < values.length; i++ ) {
                if ( typeof values[ i ] === 'number' ) {
                    return values[ i ];
                }
            }
        }
        return null;
    }

    /**
     * Select first not disabled index including given index
     * @param {number} where - Index
     * @param {number} direction - Iteration direction
     * @return {null|number} - Next index in order
     */
    #select_first_active_from( where = 0, direction = 1 ) {
        do {
            if ( this.children[ where ] && this.children[ where ].disabled !== true ) {
                return where;
            }
            where += direction;
        } while ( direction > 0 ? where < this.children.length : where > -1 );
        return null;
    }

    /**
     * Mode getter
     * @public
     * @return {string} - Mode name
     */
    get mode() {
        return this.config.get( 'mode' );
    }

    /**
     * Mode setter
     * @public
     * @param {string} mode - Mode name
     * @return {void}
     */
    set mode( mode ) {
        if ( !this.config.get( 'availableModes' ).includes( mode ) ) {
            throw new UiAccordionComponentException( 'Unknown mode: ' + mode );
        }
        this.config.set( 'mode', mode );
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
            throw new UiAccordionComponentException( this.constructor.name + '.disabled must be of type boolean' );
        }
        this.eachChild( ( panel ) => {
            panel.disabled = state;
        } );
        this.states[ state ? 'set' : 'unset' ]( 'disabled' );
    }

    /**
     * Check if panel can perform action
     * @private
     * @param {string} action - Action name
     * @param {UiAccordionPanelComponent} panel - Panel instance
     * @return {boolean} - True if action is performable
     */
    #canPerform( action, panel ) {
        const results = this.plugins?.run( action + 'Panel', [ panel ] );
        if ( isPojo( results ) ) {
            const values = Object.entries( results );
            for ( let i = 0; i < values.length; i++ ) {
                const [ name, value ] = values[ i ];
                if ( value === false ) {
                    if ( this.debug ) this.debug.warn( this.constructor.name + '::' + action + ' Was prevent by: ' + name );
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Check if panel can show
     * @public
     * @param {UiAccordionPanelComponent} panel - Panel instance
     * @return {boolean} - True if showable
     */
    canShow( panel ) {
        return this.#canPerform( 'canShow', panel );
    }

    /**
     * Check if panel can hide
     * @public
     * @param {UiAccordionPanelComponent} panel - Panel instance
     * @return {boolean} - True if hideable
     */
    canHide( panel ) {
        return this.#canPerform( 'canHide', panel );
    }

    /**
     * Show panel/s
     * @public
     * @param {null|number|'all'} index - Index to show
     * @param {boolean} events - Dispatch events
     * @param {boolean} force - Force action
     * @param {boolean} instant - No transition
     * @return {void}
     */
    show( index = null, events = true, force = false, instant = false ) {
        this.eachChild( ( child, i ) => {
            if ( index instanceof Array && index.includes( index ) || [ null, 'all', i ].includes( index ) ) {
                child.show( events, force, instant );
            }
        } );
    }

    /**
     * Hide panel/s
     * @public
     * @param {null|number|'all'} index - Index to show
     * @param {boolean} events - Dispatch events
     * @param {boolean} force - Force action
     * @param {boolean} instant - No transition
     * @return {void}
     */
    hide( index = null, events = true, force = false, instant = false ) {
        this.eachChild( ( child, i ) => {
            if ( index instanceof Array && index.includes( index ) || [ null, 'all', i ].includes( index ) ) {
                child.hide( events, force, instant );
            }
        } );
    }
}
