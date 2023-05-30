import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigationContext} from "../context/NavigationContext";

export default function NavBar(props){

    const {setPage} = useNavigationContext()

    return <Navbar className={"navbar"} bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">React Examples</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link onClick={() => setPage('home')}>Home</Nav.Link>
                    <NavDropdown title="Examples" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => setPage('synced')}>useFun</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setPage('observable-context')}>observableContext</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}