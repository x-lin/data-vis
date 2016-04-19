import React from "react";
import { Nav, NavItem } from "react-bootstrap";

import ExpandSearchMenu from "./ExpandSearchMenu";
import ExpandStatsBasedMenu from "./ExpandStatsBasedMenu";
import ExpandConfiguredMenu from "./ExpandConfiguredMenu";

const PREDEFINED = "PREDEFINED";
const STATSBASED = "STATSBASED";
const SEARCH = "SEARCH";

class ExpandMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: PREDEFINED,
            activeKey: 1
        };
    }

    setMenuType(number) {
        switch (number) {
            case 1:
                this.setState({ menu: PREDEFINED, activeKey: number });
                break;
            case 2:
                this.setState({ menu: STATSBASED, activeKey: number });
                break;
            case 3:
                this.setState({ menu: SEARCH, activeKey: number });
                break;
            default:
                break;
        }
    }

    renderMenu() {
        switch (this.state.menu) {
            case PREDEFINED:
                return <ExpandConfiguredMenu d={this.props.d} />;
            case STATSBASED:
                return <ExpandStatsBasedMenu d={this.props.d} />;
            case SEARCH:
                return <ExpandSearchMenu d={this.props.d} />;
            default:
                return <ExpandConfiguredMenu d={this.props.d} />;
        }
    }

    render() {
        return (
            <div>
                <Nav
                  bsStyle="pills"
                  justified
                  activeKey={this.state.activeKey}
                  onSelect={(number) => this.setMenuType(number)}
                >
                    <NavItem eventKey={1} title="Pre-configured expansion options">
                        <span style={{ whiteSpace: "nowrap" }}>Pre-defined</span>
                    </NavItem>
                    <NavItem eventKey={2} title="Stats based expansions">
                        <span style={{ whiteSpace: "nowrap" }}>Stats-based</span>
                    </NavItem>
                    <NavItem eventKey={3} title="Search for single nodes">
                        Search
                    </NavItem>
                </Nav>
                <div className="dropdown">
                    {this.renderMenu()}
                </div>
            </div>
        );
    }
}

ExpandMenu.propTypes = {
    d: React.PropTypes.object.isRequired
};

export default ExpandMenu;
