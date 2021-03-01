import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { List } from './Components/List'
import {initData, navData} from './initData'
import { CreateNewList } from './Components/CreateNewList'
import { Modal } from './Components/Modal'
import { Navigation } from './Components/Nav'
import {
    faClipboard,
    faConciergeBell,
    faEllipsisH,
    faImages,
    faRocket,
    faSearch,
    faStickyNote,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// css
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const [lists, setLists] = useState(initData)
    const [showMenu, setShowMenu] = useState(false)
    const [modal, setModal] = useState({
        isShown: false,
        data: {
            title: '',
        },
    })

    function handleOpenInputPopUp(
        e,
        clickType,
        editFocus,
        setEditFocus,
        popUpContainer,
        listId
    ) {
        setEditFocus(!editFocus)
        e.target.style.display = 'none'
        e.target.parentNode.querySelector('.input-popup').style.display =
            'block'

        const hideInputPopUp = function () {
            popUpContainer.current.querySelector('.input-popup').style.display =
                'none'
            popUpContainer.current.querySelector(
                '.input-popup'
            ).nextElementSibling.style.display = 'inline-block'
        }

        const handleClick = (e) => {
            if (clickType === 'close') {
                if (e.target.className.includes('btn-close')) {
                    hideInputPopUp()
                    document.removeEventListener('mousedown', handleClick)
                }
                if (
                    !e.target.closest('.input-popup-container') ||
                    e.target.className.includes('input-popup-sib')
                ) {
                    hideInputPopUp()
                    document.removeEventListener('mousedown', handleClick)
                }
            }
            if (clickType === 'duo') {
                let input = popUpContainer.current.querySelector(
                    '.input-popup-field'
                ).value
                if (
                    (input && e.target.className.includes('submit-item')) ||
                    (input && !e.target.closest('.input-popup-container'))
                ) {
                    createNewCard(input, listId)
                    input = ''
                    hideInputPopUp()
                } else {
                    hideInputPopUp()
                }
                document.removeEventListener('mousedown', handleClick)
            }
        }
        document.addEventListener('mousedown', handleClick)
    }

    function handleSaveKeyUp(e, listId, updateType, cardId, cardField){
        e.preventDefault();
        if(e.keyCode === 13) {
            handleSaveBlur(e, listId, updateType, cardId, cardField)
        }
    }

    function handleSaveBlur(e, listId, updateType, cardId, cardField) {
        const newLists = [...lists]
        if (updateType === 'list') {
            if (newLists[listId].title === e.target.value) {
                let container = e.target.closest('.input-popup-container')
                container.querySelector('.input-popup').style.display = 'none'
                container.querySelector(
                    '.input-popup'
                ).nextElementSibling.style.display = 'inline-block'
            } else {
                newLists[listId].title = e.target.value
                setLists(newLists)
            }
        }
        if (updateType === 'card') {
            let container = e.target.closest('.input-popup-container')
            updateCard(e.target.value, listId, cardId, cardField)
            container.querySelector('.input-popup').style.display = 'none'
            container.querySelector(
                '.input-popup'
            ).nextElementSibling.style.display = 'block'
        }
    }

    function createNewList(input) {
        const newLists = [...lists]
        newLists.push({
            title: input,
            cards: [],
        })
        setLists(newLists)
    }

    function createNewCard(input, listId) {
        const newLists = [...lists]
        newLists[listId]['cards'].push({
            title: input,
            desc: '',
            comment: [],
        })
        setLists(newLists)
    }

    function updateCard(input, listId, cardId, cardField) {
        let newLists = [...lists]
        newLists[listId]['cards'][cardId][cardField] = input
        setLists(newLists)
        setModal({
            ...modal,
            data: {
                ...modal.data,
                title: newLists[listId]['cards'][cardId]['title'],
            },
        })
    }

    function handleShowMenuClick() {
        setShowMenu(!showMenu)
    }

    // auto scroll to farthest right after adding new card
    function scrollBoardRight() {
        let boarderContent = document.querySelector(
            '.board-content-wrapper .row'
        )
        boarderContent.scrollTo(9999, 0)
    }

    useEffect(() => {
        scrollBoardRight()
    }, [lists])

    return (
        <div className="App">
            <header>
                <Navigation
                    isLogo
                    navType="main"
                    leftNav={navData.nav1.left}
                    rightNav={navData.nav1.right}
                ></Navigation>
                <Navigation
                    showMenu={showMenu}
                    className={`mb-3 ${showMenu && 'show-menu'}`}
                    leftNav={navData.nav2.left}
                    rightNav={{...navData.nav2.right,
                        showMenu: {
                        img: <FontAwesomeIcon icon={faEllipsisH} />,
                        t: 'Show Menu',
                        link: 'url',
                        isFree: '',
                        isForm: '',
                        onClick: handleShowMenuClick,
                    }}}
                ></Navigation>
            </header>
            <main>
                <Modal
                    size="lg"
                    modal={modal}
                    setModal={setModal}
                    lists={lists}
                    setLists={setLists}
                    handleSaveKeyUp={handleSaveKeyUp}
                    handleSaveBlur={handleSaveBlur}
                    handleOpenInputPopUp={handleOpenInputPopUp}
                />
                <Container as="section" fluid>
                    <article
                        className={`board-content-wrapper ${
                            showMenu ? 'board-menu-shown' : ''
                        }`}
                    >
                        <Row>
                            <div className="board-content">
                                {lists.map((list, idx) => (
                                    <List
                                        lists={lists}
                                        listId={idx}
                                        key={list.title + idx}
                                        title={list.title}
                                        handleSaveKeyUp={handleSaveKeyUp}
                                        handleSaveBlur={handleSaveBlur}
                                        clickTypeList="hello"
                                        clickTypeCard="duo"
                                        createNewCard={createNewCard}
                                        handleOpenInputPopUp={
                                            handleOpenInputPopUp
                                        }
                                        modal={modal}
                                        setModal={setModal}
                                    ></List>
                                ))}
                                <CreateNewList
                                    handleOpenInputPopUp={handleOpenInputPopUp}
                                    createNewList={createNewList}
                                ></CreateNewList>
                            </div>
                        </Row>
                    </article>
                </Container>
                {/* Menu section */}
                <Container as="section">
                    <article
                        className={`board-menu ${showMenu ? 'show-menu' : ''}`}
                    >
                        <Row>
                            <Col>
                                <p className="text-center menu-title">Menu</p>
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faClipboard} />
                                        About This Board
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faImages} />
                                        Change Background
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faSearch} />
                                        Search Cards
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faStickyNote} />
                                        Stickers
                                    </li>
                                    <li>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                        More
                                    </li>
                                    <hr></hr>
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faConciergeBell}
                                        />
                                        Bulter<p>Automate cards and more...</p>
                                    </li>
                                    <hr></hr>
                                    <li>
                                        <FontAwesomeIcon icon={faRocket} />
                                        Power-Ups
                                        <p>Google Drive and more...</p>
                                    </li>
                                </ul>
                                <button
                                    className="btn btn-menu-close"
                                    onClick={handleShowMenuClick}
                                >
                                    X
                                </button>
                            </Col>
                        </Row>
                    </article>
                </Container>
            </main>
        </div>
    )
}

export default App
