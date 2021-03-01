import { ListGroup, ListGroupItem } from 'react-bootstrap'

const ListCards = function (props) {
    const { lists, listId, modal, setModal } = props

    function handleShowModalClick(e, cardId) {
        setModal({
            ...modal,
            isShown: true,
            data: {
                title: lists[listId]['cards'][cardId].title,
                listId,
                cardId,
                el: e.target,
            },
        })
        // let desc = lists[listId]['cards'][cardId].desc
    }

    return (
        <ListGroup>
            {lists[listId]['cards'].map((card, cardId) => (
                <ListGroupItem
                    className={`card-${cardId}`}
                    key={card + cardId}
                    onClick={(e) => {
                        handleShowModalClick(e, cardId)
                    }}
                >
                    {card.title}
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}

export { ListCards }
