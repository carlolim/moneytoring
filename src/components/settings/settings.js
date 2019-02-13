import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import { List, ListItem, ListItemText } from "@material-ui/core";

const styles = {
    link: {
        textDecoration: 'none'
    }
}


class Settings extends Component {
    render() {
        return (
            <>
                <MyToolbarWithNavigation title="Settings" buttons={[]} />
                <List>
                    <Link className={this.props.classes.link} to="/accounts">
                        <ListItem>
                            <ListItemText primary="Accounts" secondary="Create new accounts, edit existing ones, or delete an account." />
                        </ListItem>
                    </Link>
                    <Link className={this.props.classes.link} to="/categories">
                        <ListItem>
                            <ListItemText primary="Categories" secondary="Manage your categories." />
                        </ListItem>
                    </Link>
                </List>
            </>
        )
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Settings);