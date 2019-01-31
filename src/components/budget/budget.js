import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import { Typography, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { selectAll } from "../../helpers";


const styles = {
    myClass: {
        font: 20,
        textAlign: 'center',
        width: '100%'
    },
    fab: {
        position: 'fixed',
        bottom: 15,
        right: 15
    }
}

class Budget extends Component {
    constructor (props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount = () => {
        selectAll("budget", this.renderItems);
    }

    renderItems = (items) => {
        this.setState({...this.state, items});
    }

    render () {
        return (
            <> 
                <MyToolbarWithNavigation title="Budget" buttons={[]} />
                

                <Fab onClick={() => {}} color="primary" className={this.props.classes.fab}>
                    <AddIcon />
                </Fab>
            </>
        )
    }
}

Budget.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Budget);