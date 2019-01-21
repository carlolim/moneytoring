import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const BackButton = withRouter(({ history }) => (
    <button onClick={() => { history.goBack() }}><i className="fas fa-arrow-left"></i></button>
))

class Toolbar extends Component {
    handleNavToggle = () => {
        window.toggleNavigation();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                {this.props.showBackButton ? 
                    <BackButton /> :
                    <button type="button" id="sidebarCollapse" className="btn" onClick={this.handleNavToggle.bind(this)}>
                        <i className="fas fa-bars"></i>
                    </button>
                }
                <div className="mr-auto">
                    {this.props.title}
                </div>
                {this.props.buttons ? this.props.buttons.map((btn, i) => <span key={i}>{btn}</span>) : null}
            </nav>
        );
    }
}

export default Toolbar;
