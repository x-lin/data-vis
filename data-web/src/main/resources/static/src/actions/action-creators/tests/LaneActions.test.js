import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    ATTACH_TO_LANE, MOVE, INIT_LANE, SET_FILTER_VALUE,
    attachToLane, move, initLane, setFilterValue
} from "../LaneActions";

test("Testing LaneActiosn", (assert) => {
    executeTests(assert, attachToLane, ATTACH_TO_LANE, ["laneId", "note"]);
    executeTests(assert, move, MOVE, ["sourceNote", "targetNote"]);
    executeTests(assert, initLane, INIT_LANE, ["data"]);
    executeTests(assert, setFilterValue, SET_FILTER_VALUE, ["name", "value"]);
});
