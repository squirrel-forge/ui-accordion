/**
 * Requires
 */
import {
    UiPlugin
} from '@squirrel-forge/ui-core';

// Import for local dev
// } from '../../../../ui-core';
import {
    holdElementViewportPosition,
    scrollComplete
} from '@squirrel-forge/ui-util';

// Import for local dev
// } from '../../../../ui-util';

/**
 * Ui accordion plugin scroll focus
 * @class
 * @extends UiPlugin
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

            // Open panel on scroll to panel or content, Scroll to callback
            // @type {null|boolean|Function}
            scrollTo : null,

            // Open panel on scroll to panel, not content
            // @type {boolean}
            openOnScrollTo : true,

            // Capture scroll into closed panel
            // @type {boolean}
            captureScrollInto: true,

            // Safe animation position for panel.show event
            // @type {boolean}
            safemode : true,
        };

        // Register events
        this.registerEvents = [
            [ 'panel.show', ( event ) => { this.#run_safemode( event.detail.target ); } ],
        ];

        // Register global events
        window.addEventListener( 'scroll.before', ( event ) => { this.#event_scrollBefore( event ); } );
        window.addEventListener( 'scroll.after', ( event ) => { this.#event_scrollAfter( event ); } );
    }

    /**
     * Run safe mode hold panel position
     * @private
     * @param {UiAccordionPanelComponent} panel - Panel
     * @return {void}
     */
    #run_safemode( panel ) {
        if ( this.context.config.get( 'safemode' ) ) {
            const len = panel.config.get('slideOptions.speed') || 310;
            holdElementViewportPosition( panel.dom, len );
        }
    }

    /**
     * Event: scroll.after
     * @private
     * @param {Event} event - Scroll event
     * @return {void}
     */
    #event_scrollAfter( event ) {
        const scrollTo = this.context.config.get( 'scrollTo' );
        if ( !scrollTo ) return;

        // Find target panel
        if ( this.context.config.get( 'openOnScrollTo' ) ) {
            this.context.eachChild( ( panel ) => {

                // Scroll target is the panel or is contained in the panel and target is not part of content or scroll into is disabled
                if ( !panel.open
                    && ( panel.dom === event.detail.scrollTarget || panel.dom.contains( event.detail.scrollTarget ) )
                    && ( !panel.getDomRefs( 'content', false ).contains( event.detail.scrollTarget ) || !this.context.config.get( 'captureScrollInto' ) )
                ) {
                    panel.open = true;
                    return true;
                }
            } );
        }
    }

    /**
     * Event: scroll.before
     * @private
     * @param {Event} event - Scroll event
     * @return {void}
     */
    #event_scrollBefore( event ) {
        const scrollTo = this.context.config.get( 'scrollTo' );
        if ( !scrollTo ) return;

        // Find target panel
        if ( this.context.config.get( 'captureScrollInto' ) ) {
            this.context.eachChild( ( panel ) => {

                // Scroll target is the panel or is contained in the panel
                if ( !panel.open && panel.dom.contains( event.detail.scrollTarget )
                    && panel.getDomRefs( 'content', false ).contains( event.detail.scrollTarget ) ) {

                    // Prevent scroll action
                    event.preventDefault();

                    // Get original params
                    const params = event.detail.params || [ event.detail.scrollTarget ];

                    // Scroll to panel
                    if ( typeof scrollTo === 'function' ) {
                        this.#scroll_into_panel( panel, params, scrollTo );
                    } else {
                        this.#scroll_into_native( panel, params );
                    }

                    return true;
                }
            } );
        }
    }

    /**
     * Scroll into panel with function
     * @param {UiAccordionPanelComponent} panel - Panel instance
     * @param {Array} params - Scroll to arguments
     * @param {Function} scrollTo - Scroll to function
     * @return {void}
     */
    #scroll_into_panel( panel, params, scrollTo ) {

        // After scrolling to the panel
        scrollComplete( () => {

            // Scroll to content once the panel is open
            panel.addEventListener( 'panel.shown', () => {
                scrollTo( ...params );
            }, { once : true } );
            panel.open = true;
        } );
        const cloned = [ ...params ];
        cloned[ 0 ] = panel.dom;
        scrollTo( ...cloned );
    }

    /**
     * Scroll into panel with native scroll
     * @param {UiAccordionPanelComponent} panel - Panel instance
     * @param {Array} params - Scroll to arguments
     * @return {void}
     */
    #scroll_into_native( panel, params ) {

        // After scrolling to the panel
        scrollComplete( () => {

            // Scroll to content once the panel is open
            panel.addEventListener( 'panel.shown', () => {
                params[ 0 ].scrollIntoView( { behavior : 'smooth' } );
            }, { once : true } );
            panel.open = true;
        } );
        panel.dom.scrollIntoView( { behavior : 'smooth' } );
    }
}
