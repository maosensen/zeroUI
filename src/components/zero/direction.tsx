"use client";

/*
 * Tells Base UI's components which way text runs, for right-to-left pages: arrow keys in menus,
 * tabs and sliders follow it, and popups line up from the right. Set `dir` on <html> as well.
 * The slant itself does not mirror: every cut leans the same way (/) in any language, since the
 * lean belongs to the look, like the italic.
 */
export {
  DirectionProvider,
  type DirectionProviderProps,
  type TextDirection,
  useDirection,
} from "@base-ui/react/direction-provider";
