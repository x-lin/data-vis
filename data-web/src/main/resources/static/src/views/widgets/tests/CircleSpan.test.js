import React from "react";
import { test } from "tape";
import { shallow } from "enzyme";

import CircleSpan from "../CircleSpan";

test("Testing CircleSpan", (assert) => {
    assert.test("should render a circle with the right props", (assert) => {
        const wrapper = shallow(<CircleSpan radius="8px" color="#FFFFFF" />);
        const actual = wrapper.find("span").length;
        const expected = 1;

        assert.equal(actual, expected);
        assert.end();
    });

    assert.test("should render a circle with no background color specified", (assert) => {
        const wrapper = shallow(<CircleSpan radius="8px" />);
        const actual = wrapper.find("span").length;
        const expected = 1;

        assert.equal(actual, expected);
        assert.end();
    });
});
