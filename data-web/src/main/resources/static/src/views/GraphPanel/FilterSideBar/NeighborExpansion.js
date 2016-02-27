import React from "react";

import Slider from "../../widgets/Slider";

export default class extends React.Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <label  className="control-sidebar-subheading">
                        Show as single nodes
                        <input type="radio" name="optionsRadios" className="pull-right" id="optionsRadios2" value="option2" checked="checked" onChange={
                            function(){}
                        } />
                    </label>

                    <div style={{marginTop: "10px"}}>
                        <Slider min={1} max={20} defaultValue={10} onChange={function() {
                                        console.log("slider on change")
                                    }} />

                    </div>

                    <label className="control-sidebar-subheading">
                        Show as clusters
                        <input type="radio" name="optionsRadios" className="pull-right" id="optionsRadios1" value="option1" onChange={
                            function(){}
                        } />
                    </label>
                </div>
            </form>
        );
    };
}