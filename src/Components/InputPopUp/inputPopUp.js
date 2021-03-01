import { useState } from 'react'
import { Button } from 'react-bootstrap'

const InputPopUp = function (props) {
    const {
        myFocus,
        isButtonCtrl,
        buttonCtrl,
        defaultValue,
        children,
        placeholder,
        handleSaveKeyUp,
        handleSaveBlur,
        updateBlurType,
        listId,
        popUpContainer,
        cardId,
        cardField,
    } = props

    const [inputText, setInputText] = useState()

    function handleInputOnChange(e) {
        setInputText(e.target.value)
    }

    return (
        <div ref={popUpContainer} className="input-popup-container">
            <div className="input-popup">
                <input
                    className="input-popup-field"
                    ref={myFocus}
                    type="text"
                    defaultValue={defaultValue || ''}
                    placeholder={placeholder}
                    onChange={handleInputOnChange}
                    autoFocus
                    onKeyUp={
                        handleSaveKeyUp &&
                        ((e) => {
                            handleSaveKeyUp(
                                e,
                                listId,
                                updateBlurType,
                                cardId,
                                cardField
                            )
                        })
                    }
                    onBlur={
                        handleSaveBlur &&
                        ((e) => {
                            handleSaveBlur(
                                e,
                                listId,
                                updateBlurType,
                                cardId,
                                cardField
                            )
                        })
                    }
                />
                {isButtonCtrl && (
                    <div className="button-group">
                        <Button
                            className="submit-item btn-success"
                            onClick={() => {
                                buttonCtrl.onClick(inputText, listId)
                            }}
                        >
                            {buttonCtrl.name}
                        </Button>
                        <button className="btn btn-close">X</button>
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}

export { InputPopUp }
