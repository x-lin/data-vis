import { test } from "tape";

import { buildHttpParams, buildHttpParam } from "../buildHttpParams";

test("Testing buildHttpParam", (assert) => {
    assert.test("should build a single param", (assert) => {
        const expected = "limit=100";
        const actual = buildHttpParam("limit", 100);

        assert.equal(actual, expected);
        assert.end();
    });

    assert.test("should return an empty string when the value is null or undefined", (assert) => {
        const expected = "";
        const actual1 = buildHttpParam("limit", null);
        const actual2 = buildHttpParam("limit");

        assert.equal(actual1, expected);
        assert.equal(actual2, expected);
        assert.end();
    });

    assert.test("should return a parameter string on special values, such as 0 or false", (assert) => {
        const expected1 = "limit=0";
        const actual1 = buildHttpParam("limit", 0);

        const expected2 = "limit=false";
        const actual2 = buildHttpParam("limit", false);

        const expected3 = "limit=";
        const actual3 = buildHttpParam("limit", "");

        assert.equal(actual1, expected1);
        assert.equal(actual2, expected2);
        assert.equal(actual3, expected3);
        assert.end();
    });
});

test("Testing buildHttpParams", (assert) => {
    assert.test("should work with primitive types", (assert) => {
        const params = {
            limit: 100,
            type: "abc",
            upstream: true,
            downstream: false
        };

        const expected = "limit=100&type=abc&upstream=true&downstream=false";
        const actual = buildHttpParams(params);

        assert.equal(actual, expected);
        assert.end();
    });

    assert.test("should omit null values", (assert) => {
        const params = {
            limit: 0,
            type: null,
            upstream: null,
            downstream: false
        };

        const expected = "limit=0&downstream=false";
        const actual = buildHttpParams(params);

        assert.equal(actual, expected);
        assert.end();
    });

    assert.test("should work with nested types", (assert) => {
        const params = {
            limit: 100,
            upstream: null,
            downstream: false,
            type: ["A", "b", "c"]
        };

        const expected = "limit=100&downstream=false&type=A&type=b&type=c";
        const actual = buildHttpParams(params);

        assert.equal(actual, expected);
        assert.end();
    });

    assert.test("should build an empty string for an empty params object", (assert) => {
        const expected = "";
        const actual = buildHttpParam({});

        assert.equal(actual, expected);
        assert.end();
    });
});
