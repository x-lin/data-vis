import { expect } from "chai";

import { settingsReducer } from "../SettingsReducer";
import Settings from "../../config/Settings";
import { toggleSetting } from "../../actions/action-creators/SettingsActions";

import { createStore } from "../../stores/ReduxStore";

describe("SearchHelpers", () => {
    describe("settingsReducer", () => {
        it("should toggle value, if a toggle action is sent", () => {
            const store = createStore();

            const name = Settings[0]["name"];
            const oldValue = Settings[0]["value"]
            store.dispatch(toggleSetting(name));
            const newValue = store.getState().settings[0].value;

            expect(newValue).to.be.equal(!oldValue);
        });
    });
});
