import { test } from "tape";

import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../SearchHelpers";

test("Testing SearchHelpers", (assert) => {
    assert.test("Testing indexOfObjectInArrayByProperty", (assert) => {
        const array = [
            { key: "key1", someprop: "property1", anotherprop: [] },
            { key: "key2", anotherprop: [] },
            { key: "key3", someprop: "property3", object: {} },
            { key: "key4", someprop1: "adf", anotherprop2: [] },
            { key: "key5", someprop2: "adf", anotherprop1: [] }
        ];

        assert.test("should return -1, if property object is not found", (assert) => {
            const actual = indexOfObjectInArrayByProperty(array, "key112354", "key");
            const expected = -1;

            assert.equal(actual, expected);
            assert.end();
        });

        assert.test("should return the right index, if string is found", (assert) => {
            const actual1 = indexOfObjectInArrayByProperty(array, "key1", "key");
            const expected1 = 0;

            const actual2 = indexOfObjectInArrayByProperty(array, "key2", "key");
            const expected2 = 1;

            const actual3 = indexOfObjectInArrayByProperty(array, "key5", "key");
            const expected3 = 4;

            const actual4 = indexOfObjectInArrayByProperty(array, "property3", "someprop");
            const expected4 = 2;

            assert.equal(actual1, expected1);
            assert.equal(actual2, expected2);
            assert.equal(actual3, expected3);
            assert.equal(actual4, expected4);
            assert.end();
        });
    });

    assert.test("Testing indexOfObjectInArrayByProperties", (assert) => {
        const array = [
            { key: "key1", someprop: "property1", anotherprop: [] },
            { key: "key2", anotherprop: [] },
            { key: "key3", someprop: "property3", object: {} },
            { key: "key4", someprop1: "adf", anotherprop2: [] },
            { key: "key5", someprop2: "adf", anotherprop1: [] }
        ];

        //assert.test("should return -1, if properties don't match", (assert) => {
        //    const actual1 = indexOfObjectInArrayByProperties(array, { key: "key1", someprop: "property2" });
        //    const actual2 = indexOfObjectInArrayByProperties(array, { key1: "key1", someprop: "property2" });
        //    const actual3 = indexOfObjectInArrayByProperties(array, { key1: "key1dsff", someprop1: "property2ads" });
        //    const actual4 = indexOfObjectInArrayByProperties(array, { key: "key2sdfg" });
        //
        //    const expected = -1;
        //
        //    assert.equal(actual1, expected);
        //    assert.equal(actual2, expected);
        //    assert.equal(actual3, expected);
        //    assert.equal(actual4, expected);
        //    assert.end();
        //});

        assert.test("should return the right index, if properties are found", (assert) => {
            const actual1 = indexOfObjectInArrayByProperties(array, { key: "key1" });
            const expected1 = 0;

            const actual2 = indexOfObjectInArrayByProperties(array, { key: "key3", someprop: "property3" });
            const expected2 = 2;

            const actual3 = indexOfObjectInArrayByProperties(array, { key: "key5", someprop2: "adf" });
            const expected3 = 4;

            assert.equal(actual1, expected1);
            assert.equal(actual2, expected2);
            assert.equal(actual3, expected3);
            assert.end();
        });
    });
});
