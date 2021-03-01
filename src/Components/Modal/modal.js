import { Modal as BsModal, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import { InputPopUp, CommentPopUp, CommentText } from './../InputPopUp'
import {
    faArchive,
    faCheckSquare,
    faClock,
    faCreditCard,
    faGripLines,
    faTag,
    faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './modal.css'

const Modal = function (props) {
    const {
        modal,
        setModal,
        handleOpenInputPopUp,
        handleSaveKeyUp,
        handleSaveBlur,
        lists,
        setLists,
        size,
    } = props

    const { listId, cardId, title } = modal.data

    const [focusDesc, setFocusDesc] = useState(false)
    const [focusTitle, setFocusTitle] = useState(false)

    const focusDescRef = useRef(null)
    const focusTitleRef = useRef(null)

    useEffect(() => {
        if (focusDesc) {
            focusDescRef.current.focus()
            setFocusDesc(!focusDesc)
        }
        if (focusTitle) {
            focusTitleRef.current.focus()
            setFocusTitle(!focusTitle)
        }
    }, [focusDesc, focusTitle])

    function handleArchiveClick() {
        modal.data.el.remove()
        setModal({ ...modal, isShown: false })
    }

    return (
        <BsModal
            size={size}
            show={modal.isShown}
            onHide={() => {
                setModal({ ...modal, isShown: false })
            }}
        >
            {/* Header Section */}
            <BsModal.Header closeButton>
                <InputPopUp
                    myFocus={focusTitleRef}
                    listId={listId}
                    updateBlurType="card"
                    handleSaveKeyUp={handleSaveKeyUp}
                    handleSaveBlur={handleSaveBlur}
                    cardId={cardId}
                    cardField="title"
                    defaultValue={title}
                >
                    <BsModal.Title
                        onClick={(e) => {
                            handleOpenInputPopUp(
                                e,
                                'hello',
                                focusTitle,
                                setFocusTitle
                            )
                        }}
                    >
                        <FontAwesomeIcon icon={faCreditCard} />
                        {title}
                    </BsModal.Title>
                    <p className="modal-list-title-container">
                        in list{' '}
                        <span className="modal-list-title">
                            {lists[modal.data.listId] &&
                                lists[modal.data.listId].title}
                        </span>
                    </p>
                </InputPopUp>
            </BsModal.Header>

            {/* Description Section */}
            <BsModal.Body>
                <Row>
                    <Col md={9}>
                        <Row>
                            <Col>
                                <h4>
                                    <FontAwesomeIcon icon={faGripLines} />
                                    <span className="pl-4">Description</span>
                                </h4>
                                <InputPopUp
                                    myFocus={focusDescRef}
                                    listId={listId}
                                    isButtonCtrl
                                    buttonCtrl={{ name: 'save' }}
                                    handleSaveKeyUp={handleSaveKeyUp}
                                    handleSaveBlur={handleSaveBlur}
                                    updateBlurType="card"
                                    cardId={cardId}
                                    cardField="desc"
                                    defaultValue={
                                        lists[listId] &&
                                        lists[listId]['cards'][cardId].desc
                                    }
                                >
                                    <p
                                        onClick={(e) => {
                                            handleOpenInputPopUp(
                                                e,
                                                'hello',
                                                focusDesc,
                                                setFocusDesc
                                            )
                                        }}
                                    >
                                        {lists[listId] &&
                                            lists[listId]['cards'][cardId].desc}
                                    </p>
                                </InputPopUp>
                            </Col>
                        </Row>

                        {/* Comment Section */}
                        <Row>
                            <Col>
                                <h4>
                                    <FontAwesomeIcon icon={faGripLines} />
                                    <span className="pl-4">Activity</span>
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <div className="avatar">
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </div>
                            </Col>
                            <Col md={11}>
                                <CommentPopUp
                                    placeholder="write a comment..."
                                    setLists={setLists}
                                    lists={lists}
                                    listId={listId}
                                    cardId={cardId}
                                ></CommentPopUp>
                                {lists[listId] &&
                                    lists[listId]['cards'][cardId].comment.map(
                                        (commentText, commentId) => {
                                            return (
                                                <CommentText
                                                    commentId={commentId}
                                                    setLists={setLists}
                                                    lists={lists}
                                                    listId={listId}
                                                    cardId={cardId}
                                                    text={commentText}
                                                ></CommentText>
                                            )
                                        }
                                    )}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}>
                        <h4>ADD TO CARD</h4>
                        <ul className="modal-add-to-card">
                            <li>
                                <button
                                    className="btn btn-atc"
                                    onClick={handleArchiveClick}
                                >
                                    <FontAwesomeIcon icon={faArchive} />
                                    <span className="pl-2">Archive</span>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-atc">
                                    <FontAwesomeIcon icon={faTag} />
                                    <span className="pl-2">Labels</span>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-atc">
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                    <span className="pl-2">CheckList</span>
                                </button>
                            </li>
                            <li>
                                <button className="btn btn-atc">
                                    <FontAwesomeIcon icon={faClock} />
                                    <span className="pl-2">Due Date</span>
                                </button>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </BsModal.Body>
        </BsModal>
    )
}

export { Modal }
