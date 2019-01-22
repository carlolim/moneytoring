import React, { Component } from 'react';

class ModalDanger extends Component {
    render() {
      return (
          <div className="modal" id="modalDanger" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.props.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>{this.props.body}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button onClick={this.props.callback} type="button" className="btn btn-primary">Ok</button>
                </div>
              </div>
            </div>
          </div>
      );
    }
}
  

export default ModalDanger;

