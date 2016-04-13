//import { expect } from "chai";
//
//import { indexOfObjectInArrayByProperty, indexOfObjectInArrayByProperties } from "../SearchHelpers";
//
//describe("SearchHelpers", () => {
//
//
//    describe("indexOfObjectInArrayByProperty", () => {
//        const array = [
//            {key: "key1", someprop: "property1", anotherprop: []},
//            {key: "key2", anotherprop: []},
//            {key: "key3", someprop: "property3", object: {}},
//            {key: "key4", someprop1: "adf", anotherprop2: []},
//            {key: "key5", someprop2: "adf", anotherprop1: []},
//        ];
//
//        it("should return -1, if property object is not found", () => {
//            expect(indexOfObjectInArrayByProperty(array, "key112354", "key")).to.be.equal(-1);
//            expect(indexOfObjectInArrayByProperty(array, "key112354", "notExistingProp")).to.be.equal(-1);
//        });
//
//        it("should return the right index, if string is found", () => {
//            expect(indexOfObjectInArrayByProperty(array, "key1", "key")).to.be.equal(0);
//            expect(indexOfObjectInArrayByProperty(array, "key2", "key")).to.be.equal(1);
//            expect(indexOfObjectInArrayByProperty(array, "key5", "key")).to.be.equal(4);
//
//            expect(indexOfObjectInArrayByProperty(array, "property3", "someprop")).to.be.equal(2);
//        });
//
//        //TODO equality comparisons don't work with arrays and objects for now
//        //it("should return the right index, if array is found", () => {
//        //    expect(indexOfObjectInArrayByProperty(array, "anotherprop2", [])).to.be.equal(3);
//        //});
//        //
//        //it("should return the right index, if object is found", () => {
//        //    expect(indexOfObjectInArrayByProperty(array, "object", {})).to.be.equal(2);
//        //});
//    });
//
//    describe("indexOfObjectInArrayByProperties", () => {
//        const array = [
//            {key: "key1", someprop: "property1", anotherprop: []},
//            {key: "key2", anotherprop: []},
//            {key: "key3", someprop: "property3", object: {}},
//            {key: "key4", someprop1: "adf", anotherprop2: []},
//            {key: "key5", someprop2: "adf", anotherprop1: []},
//        ];
//
//        it("should return -1, if properties don't match", () => {
//            expect(indexOfObjectInArrayByProperties(array, {key: "key1", someprop: "property2"})).to.be.equal(-1);
//            expect(indexOfObjectInArrayByProperties(array, {key1: "key1", someprop: "property2"})).to.be.equal(-1);
//            expect(indexOfObjectInArrayByProperties(array, {key1: "key1dsff", someprop1: "property2ads"})).to.be.equal(-1);
//            expect(indexOfObjectInArrayByProperties(array, {key: "key2sdfg"})).to.be.equal(-1);
//        });
//
//        it("should return 0, if no properties specified", () => {
//            expect(indexOfObjectInArrayByProperties(array, {})).to.be.equal(0);
//        });
//
//        it("should return the right index, if properties are found", () => {
//            expect(indexOfObjectInArrayByProperties(array, {key: "key1"})).to.be.equal(0);
//            expect(indexOfObjectInArrayByProperties(array, {key: "key3", someprop: "property3"})).to.be.equal(2);
//            expect(indexOfObjectInArrayByProperties(array, {key: "key5", someprop2: "adf"})).to.be.equal(4);
//        });
//
//        //TODO equality comparisons don't work with arrays and objects for now
//        //it("should return the right index, if array is found", () => {
//        //    expect(indexOfObjectInArrayByProperty(array, "anotherprop2", [])).to.be.equal(3);
//        //});
//        //
//        //it("should return the right index, if object is found", () => {
//        //    expect(indexOfObjectInArrayByProperty(array, "object", {})).to.be.equal(2);
//        //});
//    });
//});
