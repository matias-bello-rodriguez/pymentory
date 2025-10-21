// Behavioral Directives
export * from './click-outside.directive';
export * from './auto-focus.directive';
export * from './long-press.directive';

// Visual Enhancement Directives  
export * from './ripple.directive';
export * from './highlight.directive';

// Utility Directives
export * from './copy-to-clipboard.directive';

// Array of all directives for easy importing
import { ClickOutsideDirective } from './click-outside.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { LongPressDirective } from './long-press.directive';
import { RippleDirective } from './ripple.directive';
import { HighlightDirective } from './highlight.directive';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

export const PYM_DIRECTIVES = [
  ClickOutsideDirective,
  AutoFocusDirective,
  LongPressDirective,
  RippleDirective,
  HighlightDirective,
  CopyToClipboardDirective
] as const;