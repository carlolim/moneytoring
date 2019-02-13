import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Fab, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, TextField,
    ListItemSecondaryAction,
    IconButton,
    DialogContentText
} from "@material-ui/core";
import MyToolbar from "../common/my-toolbar";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/Delete"
import { selectAll, insertAsync, updateAsync, remove } from "../../helpers";

const styles = {
    link: {
        textDecoration: 'none'
    },
    addButton: {
        position: 'fixed',
        bottom: 15,
        right: 15
    },
}


class Category extends Component {
    state = {
        categories: [],
        new: {
            showModal: false,
            name: '',
            error: false
        },
        edit: {
            categoryId: 0,
            showModal: false,
            name: '',
            error: false
        },
        delete: {
            categoryId: 0,
            showModal: false
        }
    }

    async componentDidMount() {
        var categories = await selectAll("category");
        this.setState({ ...this.state, categories });
    }

    showEditModal(categoryId) {
        var category = this.state.categories.find(m => m.categoryId === categoryId);
        if (category !== null && category !== undefined && [1,2,3].indexOf(category.categoryId) === -1) {
            this.setState({ ...this.state, edit: { categoryId: category.categoryId, name: category.name, error: false, showModal: true } })
        }
    }

    async saveAdd() {
        var name = this.state.new.name;
        this.setState({ ...this.state, new: { ...this.state.new, error: false } });
        if (name === null || name === undefined || name === '') {
            this.setState({ ...this.state, new: { ...this.state.new, error: true } });
        }
        else {
            var result = await insertAsync("category", { name });
            if (result) {
                var categories = await selectAll("category");
                this.setState({ ...this.state, categories, new: { ...this.state.new, showModal: false } });
            }
        }
    }

    async saveEdit() {
        var name = this.state.edit.name;
        this.setState({ ...this.state, edit: { ...this.state.edit, error: false } });
        if (name === null || name === undefined || name === '') {
            this.setState({ ...this.state, edit: { ...this.state.edit, error: true } });
        }
        else {
            var result = await updateAsync("category", { categoryId: this.state.edit.categoryId, name });
            if (result) {
                var categories = await selectAll("category");
                this.setState({ ...this.state, categories, edit: { ...this.state.edit, showModal: false } });
            }
        }
    }

    async delete() {
        var result = await remove("category", this.state.delete.categoryId);
        if (result) {
            var categories = await selectAll("category");
            this.setState({ ...this.state, categories, delete: { categoryId: 0, showModal: false } });
        }
    }

    render() {
        return (
            <>
                <MyToolbar onBack={() => { this.props.history.goBack() }} showBackButton={true} title="Categories" buttons={[]} />
                <List>
                    {this.state.categories.map((category, index) =>
                        <div key={index}>
                            <ListItem button onClick={this.showEditModal.bind(this, category.categoryId)}>
                                <ListItemText primary={category.name} secondary={[1,2,3].indexOf(category.categoryId) !== -1 ? "This is the default category, you can't do anything about it." : ""} />
                                {[1,2,3].indexOf(category.categoryId) === -1 ?
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => this.setState({ ...this.state, delete: { categoryId: category.categoryId, showModal: true } })}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction> : null}
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>
                <Fab color="primary"
                    onClick={() => this.setState({ ...this.state, new: { ...this.state.new, showModal: true } })}
                    className={this.props.classes.addButton}>
                    <AddIcon />
                </Fab>
                <NewModal
                    isOpen={this.state.new.showModal}
                    value={this.state.new.name}
                    error={this.state.new.error}
                    changeValue={(e) => { this.setState({ ...this.state, new: { ...this.state.new, name: e.target.value } }) }}
                    close={() => this.setState({ ...this.state, new: { ...this.state.new, showModal: false, name: '' } })}
                    save={this.saveAdd.bind(this)}
                />
                <EditModal
                    isOpen={this.state.edit.showModal}
                    value={this.state.edit.name}
                    error={this.state.edit.error}
                    changeValue={(e) => { this.setState({ ...this.state, edit: { ...this.state.edit, name: e.target.value } }) }}
                    close={() => this.setState({ ...this.state, edit: { ...this.state.edit, showModal: false } })}
                    save={this.saveEdit.bind(this)}
                />
                <DeleteModal
                    isOpen={this.state.delete.showModal}
                    close={() => this.setState({ ...this.state, delete: { ...this.state.delete, showModal: false } })}
                    delete={this.delete.bind(this)}
                />
            </>
        )
    }
}

const NewModal = (props) => (
    <Dialog
        open={props.isOpen}>
        <DialogTitle>Add new category</DialogTitle>
        <Divider />
        <DialogContent>
            <TextField
                error={props.error}
                className="form-control"
                label="Category name"
                onChange={props.changeValue.bind(this)}
                margin="normal"
            />
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button onClick={props.close} color="default">Cancel</Button>
            <Button onClick={props.save} color="primary" autoFocus>Save</Button>
        </DialogActions>
    </Dialog>
)

const EditModal = (props) => (
    <Dialog
        open={props.isOpen}>
        <DialogTitle>Edit category</DialogTitle>
        <Divider />
        <DialogContent>
            <TextField
                error={props.error}
                className="form-control"
                label="Category name"
                value={props.value}
                onChange={props.changeValue.bind(this)}
                margin="normal"
            />
        </DialogContent>
        <Divider />
        <DialogActions>
            <Button onClick={props.close} color="default">Cancel</Button>
            <Button onClick={props.save} color="primary" autoFocus>Save</Button>
        </DialogActions>
    </Dialog>
)

const DeleteModal = (props) => (
    <Dialog
        open={props.isOpen}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to delete this category?</DialogContentText>
            <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.close} color="primary" autoFocus>Cancel</Button>
            <Button onClick={props.delete} color="secondary">Delete</Button>
        </DialogActions>
    </Dialog>
)

Category.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Category);