import { useState, useEffect, useRef } from 'react'
import { Col, Button } from 'react-bootstrap'
import { InputPopUp } from '../InputPopUp'

const CreateNewList = function (props) {
    const { handleOpenInputPopUp, createNewList } = props

    const popUpContainer = useRef(null)
    const [edit, setEdit] = useState(false)

    const myFocus = useRef(null)
    useEffect(() => {
        if (edit) {
            myFocus.current.focus()
            setEdit(!edit)
        }
    }, [edit])

    return (
        <Col className="list list-add">
            <InputPopUp
                popUpContainer={popUpContainer}
                myFocus={myFocus}
                clickType="close"
                placeholder="Enter list title..."
                isButtonCtrl
                buttonCtrl={{
                    name: 'Add list',
                    onClick: createNewList,
                }}
            >
                <Button
                    onClick={(e) => {
                        handleOpenInputPopUp(
                            e,
                            'close',
                            edit,
                            setEdit,
                            popUpContainer
                        )
                    }}
                    className="btn-add-list input-popup-sib"
                >
                    + Add another list
                </Button>
            </InputPopUp>
        </Col>
    )
}

export { CreateNewList }
