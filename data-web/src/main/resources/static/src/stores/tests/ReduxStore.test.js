//import { expect } from "chai";
//
//import { createStore } from "../ReduxStore";
//
//describe("ReduxStore", () => {
//    const store = createStore();
//
//    describe("export", () => {
//        it("should be valid", () => {
//            expect(store).to.not.be.undefined;
//
//        });
//    });
//
//    describe("getState", () => {
//        it("should initialize properly", () => {
//            expect(store.getState()).to.not.be.undefined;
//        });
//
//        it("should not change with a invalid dispatch", () => {
//            const stateBefore = store.getState();
//            store.dispatch({id:1, type: "UNDEFINED"});
//
//            expect(store.getState()).to.be.equal(stateBefore);
//        });
//
//        it("should change with a valid dispatch", () => {
//            const stateBefore = store.getState();
//            store.dispatch({
//                type: "ITEM_FETCH_SUCCESS",
//                category: "projects",
//                key: "TEST-ME",
//                data: [{some: "data"}]});
//
//            expect(store.getState()).to.not.be.equal(stateBefore);
//        });
//    })
//});
