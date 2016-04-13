import { test } from "tape";

import stringToColor from "../stringToColor";
import { DEFAULT_COLOR } from "../../config/Settings";

test("Testing stringToColor", (assert) => {
    assert.test("the return value should be a valid color code", (assert) => {
        const string = "Another test string";

        const expected = true;
        const actual = /^#[0-9A-F]{6}$/i.test(stringToColor(string));

        assert.equal(expected, actual);
        assert.end();
    });

    assert.test("empty parameter value should return the default color", (assert) => {
        const expected = DEFAULT_COLOR;
        const actual = stringToColor();

        assert.equal(expected, actual);
        assert.end();
    });

    assert.test("invalid parameter value should return the default color", (assert) => {
        const expected = DEFAULT_COLOR;
        const actual1 = stringToColor(true);
        const actual2 = stringToColor(null);
        const actual3 = stringToColor(123);

        assert.equal(expected, actual1);
        assert.equal(expected, actual2);
        assert.equal(expected, actual3);
        assert.end();
    });

    assert.test("passing the same parameter value twice should return the same value", (assert) => {
        const string = "A test string";

        const expected = stringToColor(string);
        const actual = stringToColor(string);

        assert.equal(expected, actual);
        assert.end();
    });

    assert.test("passing different parameter values should return the different values", (assert) => {
        const string = "A test string";
        const string1 = "A test string1";

        const expected = true;
        const actual = stringToColor(string) !== stringToColor(string1);

        assert.equal(expected, actual);
        assert.end();
    });

    assert.test("leading or trailing whitespaces should have no effects", (assert) => {
        const string = "A test string";
        const string1 = "A test string ";
        const string2 = " A test string";

        const expected = true;
        const actual1 = stringToColor(string) === stringToColor(string1);
        const actual2 = stringToColor(string) === stringToColor(string2);

        assert.equal(expected, actual1);
        assert.equal(expected, actual2);
        assert.end();
    });
});