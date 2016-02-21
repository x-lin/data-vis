import { expect } from "chai";

import FilterHelpers from "../FilterHelpers";

describe("FilterHelpers", () => {
    const data = {
        "nodes":[
            {"key":"APEXCORE-280","category":"Issue"},
            {"key":"APEXCORE","category":"Project"},
            {"key":"ZERT-628","category":"Requirement"},
            {"key":"REQ-552","category":"Requirement"},
            {"key":"PramodSSImmaneni","category":"User"}
        ],
        "edges":[
            {"source":0,"target":1},
            {"source":0,"target":2},
            {"source":0,"target":3},
            {"source":0,"target":4}
        ]
    };

    const filterCategories = {
        Project : "true",
        Issue : "true",
        User : "false",
        Requirement : "true"
    };

    describe("getKeysMatching", () => {
        const filterCategoriesAllTrue = {
            Project : "true",
            Issue : "true",
            User : "true",
            Requirement : "true"
        };

        const filterCategoriesAllFalse = {
            Project : "false",
            Issue : "false",
            User : "false",
            Requirement : "false"
        };

        const filterCategoriesAlt = {
            prop1 : "valid",
            prop2 : "valid",
            prop3 : "valid",
            prop4 : "invalid"
        };

        const { getKeysMatching } = FilterHelpers;

        it("should return an empty array, when no values are matched", () => {
            expect(getKeysMatching(filterCategoriesAllFalse, "true"))
                .to.have.lengthOf(0);

            expect(getKeysMatching(filterCategoriesAllTrue, "false"))
                .to.have.lengthOf(0);
        });

        it("should return an array with the same keys as the original, when all values are matched", () => {
            expect(getKeysMatching(filterCategoriesAllFalse, "false"))
                .to.have.lengthOf(Object.keys(filterCategoriesAllFalse).length);

            expect(getKeysMatching(filterCategoriesAllTrue, "true"))
                .to.have.lengthOf(Object.keys(filterCategoriesAllTrue).length);

            expect(getKeysMatching(filterCategoriesAllTrue, "true"))
                .to.include.members(Object.keys(filterCategoriesAllTrue));
        });

        it("should return an array with all matching values", () => {
            expect(getKeysMatching(filterCategories, "true"))
                .to.have.lengthOf(3);

            expect(getKeysMatching(filterCategories, "false"))
                .to.contain("User");

            expect(getKeysMatching(filterCategoriesAlt, "valid"))
                .to.have.lengthOf(3);
        });

        it("should work with non-string boolean values", () => {
            const filterCategoriesBoolean = {
                Project : true,
                Issue : false,
                User : false,
                Requirement : true
            };

            const filterCategoriesBooleanAllTrue = {
                Project : true,
                Issue : true,
                User : true,
                Requirement : true
            };

            expect(getKeysMatching(filterCategoriesBoolean, false))
                .to.not.contain("Project");

            expect(getKeysMatching(filterCategoriesBoolean, false))
                .to.have.lengthOf(2);

            expect(getKeysMatching(filterCategoriesBooleanAllTrue, true))
                .to.have.lengthOf(4);

            expect(getKeysMatching(filterCategoriesBooleanAllTrue, false))
                .to.have.lengthOf(0);

            expect(getKeysMatching(filterCategoriesBooleanAllTrue, true))
                .to.include.members(Object.keys(filterCategoriesBooleanAllTrue));
        });
    });

    describe("getIndicesByProperty", () => {
        const { getIndicesByProperty } = FilterHelpers;

        it("should return the indices of matched property values", () => {
            const filters = ["Project", "Requirement"];
            const indices = [1, 2, 3];

            expect(getIndicesByProperty(data.nodes, "category", filters))
                .to.include.members(indices);

            expect(getIndicesByProperty(data.nodes, "category", filters))
                .to.have.lengthOf(indices.length);
        });

        it("should return an empty array for empty input", () => {
            expect(getIndicesByProperty(data, "category", []))
                .to.have.lengthOf(0);
        });

        it("should return an empty array for no matching property values", () => {
            const filters = ["abc"];

            expect(getIndicesByProperty(data, "category", filters))
                .to.have.lengthOf(0);
        });

        it("should return an empty array for existing values matching the wrong property key", () => {
            const filters = ["Project", "Requirement"];

            expect(getIndicesByProperty(data.nodes, "key", filters))
                .to.have.lengthOf(0);
        });
    });

    describe("filterOutIndexValues", () => {
        const indices = [1, 2, 3];

        const { filterOutIndexValues } = FilterHelpers;

        it("should filter data at indices", () => {
            expect(filterOutIndexValues(data.nodes, indices)[2])
                .to.equal(data.nodes[5]);

            expect(filterOutIndexValues(data.nodes, indices))
                .to.have.lengthOf(data.nodes.length - indices.length);
        });

        it("should return the original array when no indices to filter", () => {
            expect(filterOutIndexValues(data.nodes, []))
                .to.equal(data.nodes);
        });
    });
});
