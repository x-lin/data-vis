import { test } from "tape";

import { executeTests } from "./ActionsTestTemplate";

import {
    ADD_TO_GRAPH, REMOVE_FROM_GRAPH, UPDATE_GRAPH, CLEAR_GRAPH, EXPAND_NODE, UNDO_GRAPH_ACTION, REDO_GRAPH_ACTION,
    addToGraph, removeFromGraph, updateGraph, clearGraph, expandNode, undoGraphAction, redoGraphAction
} from "../GraphActions";

test("Testing GraphActiosn", (assert) => {
    executeTests(assert, addToGraph, ADD_TO_GRAPH, ["data"]);
    executeTests(assert, removeFromGraph, REMOVE_FROM_GRAPH, ["key"]);
    executeTests(assert, updateGraph, UPDATE_GRAPH, ["data"]);
    executeTests(assert, clearGraph, CLEAR_GRAPH);
    executeTests(assert, expandNode, EXPAND_NODE, ["key", "toNode"]);
    executeTests(assert, undoGraphAction, UNDO_GRAPH_ACTION);
    executeTests(assert, redoGraphAction, REDO_GRAPH_ACTION);
});
