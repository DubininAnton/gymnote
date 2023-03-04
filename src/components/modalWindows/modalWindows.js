import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { showModalWindow, textModalWindow } from '../modalWindows/modalWindowsSlice'


const ModalWindows = () => {
    const dispatch = useDispatch()
    const text = useSelector(state=>state.modal.textModalWindow)
    const show = useSelector(state => state.modal.showModalWindow)

    const handleClose = () => {
        dispatch(showModalWindow(false))
        dispatch(textModalWindow(""))
    }

    return (
      <>
        {text ? 
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        : null}
      </>
    )
}

export default ModalWindows;