import { test } from "tape";

import getContrastColor from "../getContrastColor";
import { DEFAULT_BRIGHT_COLOR, DEFAULT_DARK_COLOR } from "../../config/Settings";

test("Testing getContrastColor", (assert) => {
    assert.test("a dark input color should return a bright contrast color", (assert) => {
        const color1 = "#000000";
        const color2 = "#111111";

        const expected = DEFAULT_BRIGHT_COLOR;
        const actual1 = getContrastColor(color1);
        const actual2 = getContrastColor(color2);

        assert.equal(expected, actual1);
        assert.equal(expected, actual2);
        assert.end();
    });

    assert.test("a bright input color should return a dark contrast color", (assert) => {
        const color1 = "#FFFFFF";
        const color2 = "#EEEEEE";

        const expected = DEFAULT_DARK_COLOR;
        const actual1 = getContrastColor(color1);
        const actual2 = getContrastColor(color2);

        assert.equal(expected, actual1);
        assert.equal(expected, actual2);
        assert.end();
    });
});