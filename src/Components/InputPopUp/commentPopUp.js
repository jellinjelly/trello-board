import { useState } from 'react'
const CommentPopUp = function (props) {
    const {
        placeholder,
        lists,
        setLists,
        listId,
        cardId,
        defaultValue,
        isUpdateComment,
        commentId,
    } = props
    const [showButton, setShowButton] = useState(false)
    const [input, setInput] = useState('')

    function handleBlur() {
        if (input.length === 0) {
            setShowButton(false)
        }
    }

    function handleOnChange(e) {
        setInput(e.target.value)
    }

    function handleClick() {
        let newLists = [...lists]
        newLists[listId]['cards'][cardId]['comment'].unshift(input)
        setLists(newLists)
        setShowButton(false)
        setInput('')
        document.querySelector('.input-comment').value = ''
    }

    function isButtonDisabled() {
        if (defaultValue && !defaultValue.length === 0) {
            return false
        }
        if (input.length > 0) {
            return false
        }
        return true
    }

    return (
        <div>
            <input
                className="input-comment"
                type="text"
                placeholder={placeholder}
                onFocus={() => {
                    setShowButton(true)
                }}
                onBlur={handleBlur}
                onChange={(e) => {
                    handleOnChange(e)
                }}
                defaultValue={defaultValue || ''}
            ></input>
            {showButton && (
                <button
                    className="btn btn-success"
                    disabled={isButtonDisabled()}
                    onClick={handleClick}
                >
                    save
                </button>
            )}
        </div>
    )
}

export { CommentPopUp }
