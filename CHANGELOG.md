# Changelog

## 0.8.1
 - Remove internal *event_keydown_plugins* call and add *kbA11y* boolean option for keyboard control.

## 0.8.0
 - Separated *safemode* options to own plugin class and make it available independently to the scrolling plugin.

## 0.7.5
 - Added missing *instant* argument to *UiAccordionComponent* methods *show* and *hide*.
 - Improved documentation, code and readme.

## 0.7.4
 - Ensure *panel.show* and *panel.hide* event are cancellable.

## 0.7.3
 - Fixed toggle plugin *animating* state collision.
 - Restrict toggle plugin *children.initialized* event to own parent only.

## 0.7.2
 - Fixed broken event listener.

## 0.7.1
 - Fixed *UiAccordionPanelComponent* *initialized* event to listen only for self.

## 0.7.0
 - Cleaned up Scroller plugin, refactored "open on" logic with new options.
 - Scroller plugin updated scrolling options and added *safemode* option.
 - Added *UiAccordionPanelComponent* state *animating*.
 - Updated dependencies.

## 0.6.2
 - Fixed *openOn* target checks.

## 0.6.1
 - Fixed *open* and *closed* state not unsetting eachother.
 - Fixed keyboard actions current panel selection.

## 0.6.0
 - Fixed all issues.
 - Updated documentation.

## 0.5.0
 - Initial prototype.
