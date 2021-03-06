import React from 'react';

import { OrgUnitTree } from '@dhis2/d2-ui-org-unit-tree';
import { TreeView } from '@dhis2/d2-ui-core';

class MultipleSelectionExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChangeRoot = this.handleChangeRoot.bind(this);
    }

    handleClick(event, orgUnit) {
        if (this.state.selected.includes(orgUnit.path)) {
            this.setState(state => {
                state.selected.splice(state.selected.indexOf(orgUnit.path), 1);
                return { selected: state.selected };
            });
        } else {
            this.setState(state => {
                state.selected.push(orgUnit.path);
                return { selected: state.selected };
            });
        }
    }

    handleChangeRoot(ou) {
        this.setState({ currentRoot: ou });
    }

    render() {
        const selStyle = {
            borderTop: '1px solid #eeeeee',
            margin: '16px -16px 0',
            padding: '16px 16px 0',
        };
        return (
            <div>
                <OrgUnitTree
                    root={this.props.root}
                    onSelectClick={this.handleClick}
                    selected={this.state.selected}
                    currentRoot={this.state.currentRoot}
                    onChangeCurrentRoot={this.handleChangeRoot}
                />
                <div style={selStyle}>
                    <div>Current root: {this.state.currentRoot ? this.state.currentRoot.displayName : 'N/A'}</div>
                    <TreeView label={`Selected: ${this.state.selected.length}`}>
                        <ul>{
                            this.state.selected
                                .sort()
                                .map(i => <li key={i}>{i}</li>)
                        }</ul>
                    </TreeView>
                </div>
            </div>
        );
    }
}

export default MultipleSelectionExample;
