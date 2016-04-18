import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";

import { middlewares } from "../../../stores/ReduxStore";

export const mockAxios = new MockAdapter(axios);
export const mockStore = configureMockStore(middlewares);
