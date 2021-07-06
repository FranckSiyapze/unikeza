import './Modal.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

/*   return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  ); */

  return(
    <div className={showHideClassName} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" onClick={handleClose} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {children}
            </div>
            </div>
        </div>
    </div>
  );
};

export default Modal;