import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    TOGGLE_SETTING, SET_SETTING_VALUE,
    toggleSetting, setSettingValue
} from "../SettingsActions";

test("Testing SettingsActions", (assert) => {
    executeTests(assert, toggleSetting, TOGGLE_SETTING, ["name"]);
    executeTests(assert, setSettingValue, SET_SETTING_VALUE, ["name", "value"]);
});
