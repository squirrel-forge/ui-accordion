/**
 * Requires
 */
import { UiPlugin } from '@squirrel-forge/ui-core';
import { holdElementViewportPosition } from '@squirrel-forge/ui-util';

/**
 * Ui accordion plugin safe mode
 * @class
 * @extends UiPlugin
 */
export class UiAccordionPluginSafemode extends UiPlugin {

    /**
     * Plugin name getter
     * @public
     * @static
     * @return {string} - Plugin name
     */
    static get pluginName() {
        return 'safemode';
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

            // Safe animation position for panel.show event
            // @type {boolean}
            safemode : true,
        };

        // Register events
        this.registerEvents = [
            [ 'panel.show', ( event ) => { this.#run_safemode( event.detail.target ); } ],
        ];
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
}
