import React from "react";

import Slider from "../../widgets/Slider";

export default class extends React.Component {
    setFilterValue(value) {
        this.props.setFilterValue("limit", value);
    }

    render() {
        return (
            <form>
                <div className="form-group sidebar-padding">
                    <label  className="control-sidebar-subheading">
                        Limit for Graph Rendering
                    </label>

                    <div style={{marginTop: "10px"}}>
                        <Slider min={0} max={100} defaultValue={this.props.limit} onChange={(val) => this.setFilterValue(val)} />
                        {/*<br/><br/>
                        <label className="control-sidebar-subheading cursor">
                            Limit Node Returns
                            <input type="checkbox" className="pull-right cursor"
                                   checked={false }
                                   onChange={(e) => {}}
                            />
                        </label>*/}
                    </div>
                </div>
            </form>
        );
    };
}