/**
 * Requires
 */
import {
    UiPlugin
} from '@squirrel-forge/ui-core';

// Import for local dev
// } from '../../../../ui-core';

/**
 * Ui accordion plugin scroll focus
 * @class
 */
export class UiAccordionPluginScroller extends UiPlugin {

    /**
     * Plugin name getter
     * @public
     * @static
     * @return {string} - Plugin name
     */
    static get pluginName() {
        return 'scrollfocus';
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

            // Scroll to panel on events
            // @type {Array}
            scrollToOn : [ 'panel.shown' ],

            // Scroll to callback
            // @type {boolean|Function}
            scrollTo : false,

            // Open panel on scroll to panel or content
            // @type {Array}
            openOn : [ 'scroll.after' ],
        };

        // Register events
        this.registerEvents = [
            [ 'panel.show', ( event ) => { this.#event_scrollToOn( event ); } ],
            [ 'panel.shown', ( event ) => { this.#event_scrollToOn( event ); } ],
            [ 'panel.hide', ( event ) => { this.#event_scrollToOn( event ); } ],
            [ 'panel.hidden', ( event ) => { this.#event_scrollToOn( event ); } ],
        ];

        // Register global events
        window.addEventListener( 'scroll.before', ( event ) => { this.#event_openOn( event ); } );
        window.addEventListener( 'scroll.after', ( event ) => { this.#event_openOn( event ); } );
    }

    /**
     * Event open on
     * @private
     * @param {Event} event - Scroll event
     * @return {void}
     */
    #event_openOn( event ) {
        const events = this.context.config.get( 'openOn' );
        if ( events.includes( event.type ) ) {
            this.context.eachChild( ( panel ) => {
                if ( panel.dom === event.detail.scrollTarget || panel.dom.contains( event.detail.scrollTarget ) ) {
                    panel.open = true;
                    return true;
                }
            } );
        }
    }

    /**
     * Event scroll to on
     * @private
     * @param {Event} event - Accordion event
     * @return {void}
     */
    #event_scrollToOn( event ) {
        const scrollTo = this.context.config.get( 'scrollTo' );
        if ( !scrollTo ) return;
        const events = this.context.config.get( 'scrollToOn' );
        if ( events.includes( event.type ) ) {
            if ( typeof scrollTo === 'function' ) {
                scrollTo( event.detail.target.dom );
            } else {
                event.detail.target.dom.scrollIntoView();
            }
        }
    }
}
