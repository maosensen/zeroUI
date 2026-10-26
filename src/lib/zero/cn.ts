import { createCn } from "cn/config";

/**
 * Class merging that knows zzzUI's tokens. Without this, `text-zero-md` reads as a text colour
 * and a `text-*` colour passed in from outside would remove the font size. zzzUI components
 * import cn from here, never from the host project's utils, so the registry ships it with them.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "zero-xs",
            "zero-sm",
            "zero-md",
            "zero-lg",
            "zero-xl",
            "zero-2xl",
            "zero-3xl",
          ],
        },
      ],
    },
  },
});
