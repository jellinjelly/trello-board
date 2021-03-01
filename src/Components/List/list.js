import { faBox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useEffect, useState } from 'react'
import { Col, Card, Dropdown, DropdownButton, Button } from 'react-bootstrap'
import { InputPopUp } from '../InputPopUp'
import './list.css'
import { ListCards } from './listCards'

const List = function (props) {
    const {
        title,
        listId,
        handleOpenInputPopUp,
        handleSaveKeyUp,
        handleSaveBlur,
        clickTypeList,
        clickTypeCard,
        lists,
        createNewCard,
        modal,
        setModal,
    } = props

    const popUpContainer = useRef(null)
    const listFocus = useRef(null)
    const cardFocus = useRef(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (edit) {
            listFocus.current.focus()
            cardFocus.current.focus()
            setEdit(!edit)
        }
    }, [edit])

    return (
        <Col className="list">
            <Card>
                <Card.Body>
                    <InputPopUp
                        popUpContainer={popUpContainer}
                        handleSaveKeyUp={handleSaveKeyUp}
                        handleSaveBlur={handleSaveBlur}
                        updateBlurType="list"
                        defaultValue={title}
                        listId={listId}
                        myFocus={listFocus}
                        edit={edit}
                        setEdit={setEdit}
                    >
                        <Card.Title
                            className="input-popup-sib"
                            onClick={(e) => {
                                handleOpenInputPopUp(
                                    e,
                                    clickTypeList,
                                    edit,
                                    setEdit
                                )
                            }}
                        >
                            {title}
                        </Card.Title>
                    </InputPopUp>
                    <DropdownButton className="float-right" title="...">
                        <Dropdown.Header>List Actions</Dropdown.Header>
                        <Dropdown.Item>Add Card...</Dropdown.Item>
                        <Dropdown.Item>Copy List...</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                            as="button"
                            onClick={(e) => {
                                e.target.closest('.list').remove()
                            }}
                        >
                            Archive This List
                        </Dropdown.Item>
                    </DropdownButton>
                    <ListCards
                        lists={lists}
                        listId={listId}
                        modal={modal}
                        setModal={setModal}
                    ></ListCards>
                    <InputPopUp
                        popUpContainer={popUpContainer}
                        listId={listId}
                        myFocus={cardFocus}
                        edit={edit}
                        setEdit={setEdit}
                        isButtonCtrl
                        placeholder="Enter a title for this card..."
                        buttonCtrl={{
                            name: 'Add Card',
                            onClick: createNewCard,
                        }}
                    >
                        <Button
                            className="btn-add-card input-popup-sib"
                            onClick={(e) => {
                                handleOpenInputPopUp(
                                    e,
                                    clickTypeCard,
                                    edit,
                                    setEdit,
                                    popUpContainer,
                                    listId
                                )
                            }}
                        >
                            + Add Another Card
                        </Button>
                        <button className="float-right btn">
                            <FontAwesomeIcon icon={faBox} />
                        </button>
                    </InputPopUp>
                </Card.Body>
            </Card>
        </Col>
    )
}

export { List }
