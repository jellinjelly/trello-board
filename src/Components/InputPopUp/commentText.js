import { useState } from 'react'
const CommentText = function (props) {
    const { text, lists, setLists, listId, cardId, commentId } = props
    const [isEdit, setIsEdit] = useState(false)
    const [input, setInput] = useState()

    function handleClickSave() {
        let newLists = [...lists]
        newLists[listId]['cards'][cardId]['comment'][commentId] = input
        setLists(newLists)
        setIsEdit(false)
    }

    function handleClickDelete() {
        let newLists = [...lists]
        newLists[listId]['cards'][cardId]['comment'].splice(commentId, 1)
        setLists(newLists)
        setIsEdit(false)
    }

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    return (
        <div>
            {isEdit ? (
                <div>
                    <input
                        className="input-comment"
                        defaultValue={text}
                        onChange={handleInputChange}
                    />
                    <button
                        className="btn btn-success"
                        onClick={handleClickSave}
                    >
                        save
                    </button>
                    <button
                        onClick={() => {
                            {
                                setIsEdit(false)
                            }
                        }}
                        className="btn"
                    >
                        X
                    </button>
                </div>
            ) : (
                <div className="comment-container">
                    <p className="comment-user">user name</p>
                    <p className="comment-text">{text}</p>
                    <div className="comment-button-group">
                        <button
                            className="btn"
                            onClick={() => {
                                setIsEdit(true)
                            }}
                        >
                            Edit
                        </button>
                        <button className="btn" onClick={handleClickDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export { CommentText }
