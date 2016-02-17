import { expect } from "chai";

import { getItem } from "../GETItem";
import { itemReducer } from "../../../reducers/ItemReducer";
import { createStore } from "../../../stores/ReduxStore";

describe("GETItem", () => {
    const store = createStore();

    describe("getItem", () => {
        it("should update the store with data", () => {

            const logme = (func) => {
                console.log(func());
            }

            const dispatch = (action) => {
                console.log(action);
            };
            //
            console.log(dispatch(getItem("project", "UNO")));






            //console.log(itemReducer({}, getItem("project", "UNOMI")));

            //expect(GETItem).to.not.be.undefined;
        });
    });
});
