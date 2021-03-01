import { Nav, Navbar, Button } from 'react-bootstrap'
import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './nav.css'

const Navigation = function (props) {
    const { leftNav, rightNav, isLogo, className, navType } = props

    function setNav(nav, dir) {
        const navContent = []
        for (let key in nav) {
            navContent.push(
                <Button variant="light" onClick={nav[key].onClick}>
                    {nav[key].img}
                    <span className={`${nav[key].t && 'pl-2'} nav-btn-text`}>
                        {nav[key].t}
                    </span>
                </Button>
            )
        }
        return (
            <Nav className={dir === 'right' ? 'mr-0' : 'ml-0'}>
                {navContent}
            </Nav>
        )
    }

    let logo = (
        <Nav className="mx-auto logo">
            {isLogo && <FontAwesomeIcon icon={faCookieBite} />}
            {isLogo && 'JellinJelly'}
        </Nav>
    )

    const navRender = [setNav(leftNav, 'left'), logo, setNav(rightNav, 'right')]

    return (
        <Navbar
            bg={navType && 'secondary'}
            variant={navType && 'secondary'}
            className={`${className} py-4`}
        >
            {navRender}
        </Navbar>
    )
}

export { Navigation }
