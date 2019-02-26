import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import {
    List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton,
    Divider, Fab, Typography
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete"
import { selectAll } from "../../helpers";
import ThinkingMeme from "../../images/thinking-meme.png";


const styles = {
    link: {
        textDecoration: 'none'
    },
    addButton: {
        position: 'fixed',
        bottom: 15,
        right: 15
    },
    thinkingMeme:{
        width: 100,
        position: 'absolute',
        bottom: 0,
        right: 100
    },
    noContent: {
        color: 'primary',
        fontSize: 20,
        textAlign: 'center',
        position: 'absolute',
        bottom: 250,
        width: '100%'
    }
}

class ExpenseTemplate extends Component {
    state = {
        templates: []
    }

    async componentDidMount() {
        var templates = await selectAll("expenseTemplate");
        this.setState({ ...this.state, templates });
    }

    render() {
        return (
            <>
                <MyToolbarWithNavigation title="Expense templates" buttons={[]} />
                <List>
                    {this.state.templates.map((template, index) =>
                        <div key={index}>
                            <ListItem button onClick={() => { }}>
                                <ListItemText primary={template.name} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => { }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>
                {this.state.templates.length === 0 ?
                    <>
                        <Typography className={this.props.classes.noContent}>I wonder what this button do.</Typography>
                        <img src={ThinkingMeme} className={this.props.classes.thinkingMeme} />
                    </>
                    : null}
                <Fab color="primary"
                    onClick={() => { this.props.history.push("/expensetemplates/new") }}
                    className={this.props.classes.addButton}>
                    <AddIcon />
                </Fab>
            </>
        )
    }
}

ExpenseTemplate.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExpenseTemplate);