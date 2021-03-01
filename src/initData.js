import {
    faBell,
    faClipboard,
    faConciergeBell,
    faEllipsisH,
    faHome,
    faInfoCircle,
    faPlus,
    faSearch,
    faStar,
    faTh,
    faUser,
    faUserCircle,
    faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const initData = [
    {
        title: 'To do',
        cards: [
            { title: 'test', desc: 'description', comment: ['comment', 'aa'] },
            { title: 'test2', desc: 'description', comment: ['comment', 'aa'] },
        ],
    },
    {
        title: 'Doing',
        cards: [
            { title: 'taks', desc: 'description', comment: ['comment', 'aaa'] },
            { title: 'test2', desc: 'description', comment: ['comment', 'aa'] },
        ],
    },
    {
        title: 'Done',
        cards: [
            { title: 'taks', desc: 'description', comment: ['comment', 'aaa'] },
            { title: 'test2', desc: 'description', comment: ['comment', 'aa'] },
        ],
    },
]

const navData = {
    nav1: {
        right: {
            add: {
                img: <FontAwesomeIcon icon={faPlus} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            info: {
                img: <FontAwesomeIcon icon={faInfoCircle} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            bell: {
                img: <FontAwesomeIcon icon={faBell} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            avatar: {
                img: <FontAwesomeIcon icon={faUserCircle} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
        },
        left: {
            dash: {
                img: <FontAwesomeIcon icon={faTh} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            home: {
                img: <FontAwesomeIcon icon={faHome} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            boards: {
                img: <FontAwesomeIcon icon={faClipboard} />,
                t: 'Boards',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            jumpTo: {
                img: <FontAwesomeIcon icon={faSearch} />,
                t: 'Jump to..',
                link: '',
                isFree: '',
                isForm: 'search',
            },
            husky: {
                img: 'url',
            },
        }
    },
    nav2: {
        left: {
            proj: {
                img: <FontAwesomeIcon icon={faClipboard} />,
                t: 'Board',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            test: {
                img: '',
                t: 'Test',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            star: {
                img: <FontAwesomeIcon icon={faStar} />,
                t: '',
                link: 'url',
                isFree: '',
                isForm: '',
            },
            sdc: {
                img: '',
                t: 'TEST',
                link: '',
                isFree: '',
                isForm: '',
            },
            team: {
                img: <FontAwesomeIcon icon={faUserFriends} />,
                t: 'Team Visible',
                link: '',
                isFree: '',
                isForm: '',
            },
            avatar: {
                img: <FontAwesomeIcon icon={faUser} />,
                t: 'VC',
                link: '',
                isFree: '',
                isForm: '',
            },
            invite: {
                img: '',
                t: 'invite',
                link: '',
                isFree: '',
                isForm: '',
            },
        },
        right: {
            bulter: {
                img: <FontAwesomeIcon icon={faConciergeBell} />,
                t: 'Bulter',
                link: 'url',
                isFree: '',
                isForm: '',
            },
        }
    }
}

export  {initData,navData}
