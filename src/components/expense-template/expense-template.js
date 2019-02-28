import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import MyToolbarWithNavigation from "../common/my-toolbar-with-navigation";
import {
    List, ListItem, ListItemText,
    ListItemSecondaryAction, IconButton,
    Divider, Fab, Dialog, DialogTitle,
    DialogContent, DialogContentText, DialogActions,
    Button
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete"
import { selectAll, remove } from "../../helpers";
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
    thinkingMeme: {
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
        templates: [],
        showDelete: false,
        idForDelete: 0
    }

    async componentDidMount() {
        var templates = await selectAll("expenseTemplate");
        this.setState({ ...this.state, templates });
    }

    toggleDelete = (id) => {
        this.setState({...this.state, idForDelete: id, showDelete: !this.state.showDelete});
    }

    async delete() {
        var result = await remove("expenseTemplate", this.state.idForDelete);
        if (result) {
            var templates = await selectAll("expenseTemplate");
            this.setState({ ...this.state, templates, showDelete: false });
        }
    }

    render() {
        return (
            <>
                <MyToolbarWithNavigation title="Expense templates" buttons={[]} />
                <List>
                    {this.state.templates.map((template, index) =>
                        <div key={index}>
                            <ListItem button onClick={() => { this.props.history.push(`/expensetemplates/edit/${template.expenseTemplateId}`) }}>
                                <ListItemText primary={template.templateName} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={this.toggleDelete.bind(this, template.expenseTemplateId)}>
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
                        <img src={ThinkingMeme} className={this.props.classes.thinkingMeme} />
                    </>
                    : null}
                <Fab color="primary"
                    onClick={() => { this.props.history.push("/expensetemplates/new") }}
                    className={this.props.classes.addButton}>
                    <AddIcon />
                </Fab>

                <Dialog
                    open={this.state.showDelete}>
                    <DialogTitle>Confirm</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to delete this template?</DialogContentText>
                        <DialogContentText>This action cannot be undone.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleDelete.bind(this, 0)} color="primary" autoFocus>Cancel</Button>
                        <Button onClick={this.delete.bind(this)} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

ExpenseTemplate.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExpenseTemplate);