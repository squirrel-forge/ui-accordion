/**
 * Requires
 */
import {
    UiPlugin
} from '@squirrel-forge/ui-core';

// Import for local dev
// } from '../../../../ui-core';

/**
 * Ui accordion plugin toggle mode
 * @class
 */
export class UiAccordionPluginToggle extends UiPlugin {

    /**
     * Plugin name getter
     * @public
     * @static
     * @return {string} - Plugin name
     */
    static get pluginName() {
        return 'togglemode';
    }

    /**
     * Constructor
     * @constructor
     * @param {null|Object} options - Options object
     * @param {Object|UiAccordionComponent} context - Plugin context
     * @param {null|console|Object} debug - Debug object
     */
    constructor( options, context, debug ) {
        super( options, context, debug );

        // Extend default config
        this.extendConfig = {

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

        // Register events
        this.registerEvents = [
            [ 'children.initialized', ( event ) => { this.#event_childrenInitialized( event ); } ],
            [ 'panel.show', ( event ) => { this.#event_panelShow( event ); } ],
        ];
    }

    /**
     * Event children.initialized
     * @private
     * @return {void}
     */
    #event_childrenInitialized() {
        if ( !this.context.config.get( 'closeAllButFirstOnInit' ) ) return;
        let has_open = false;
        this.context.eachChild( ( child ) => {

            // Close every child after we found an open one
            if ( has_open ) child.open = false;

            // Except the first open one
            if ( child.open ) has_open = true;
        } );
    }

    /**
     * Event panel.show
     * @private
     * @param {Event} event - Panel show event
     * @return {void}
     */
    #event_panelShow( event ) {
        if ( this.context.mode === 'toggle' && event.detail.target ) {
            this.context.eachChild( ( child ) => {

                // Close every child that is not the one we are showing
                if ( child !== event.detail.target ) child.open = false;
            } );
        }
    }
}