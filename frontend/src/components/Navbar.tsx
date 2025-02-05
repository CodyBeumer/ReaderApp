import { Link } from 'react-router'
import { 
    Navbar as BootstrapNavbar, 
    Container as BootstrapContainer,
    Nav as BoostrapNav
} from 'react-bootstrap'
import Searchbar from './Searchbar'

type Props = {}

function Navbar({}: Props) {
  return (
    <>
        <BootstrapNavbar className="bg-body-tertiary">
            <BootstrapContainer>
                <BootstrapNavbar.Brand href="/">
                    Reader App
                </BootstrapNavbar.Brand>
                <BoostrapNav className="me-auto">
                    <BoostrapNav.Link href="/reading-lists">Reading Lists</BoostrapNav.Link>
                </BoostrapNav>
                <div className='m-auto'>
                    <Searchbar />
                </div>
                <div>
                    Signed in as, User
                </div>
            </BootstrapContainer>
        </BootstrapNavbar>
    </>
  )
}

export default Navbar