import { FC } from 'react';
import { Nav, Navbar, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//types
enum NavigationElementType {
    Link,
    Button
}

type NavigateItem = {
    url: string,
    label: string,
    type: NavigationElementType
}

type Navigation = {
    logo: string,
    menu: Array<NavigateItem>
};

const NavigationBar: FC<Navigation> = ({ logo, menu }) => {
    const route = window.location.pathname
    return (
        <>
            <Navbar expand="lg" className={route.toString() === '/' ? 'fixed-top home' : 'fixed-top not-home'}>
                <Container>
                    <Nav.Link href="/"><Image src={logo} width={76} height={46} /></Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {menu.map((NavElement: NavigateItem, key: number) => (
                                (NavElement.type === NavigationElementType.Link) ? (
                                    <Nav.Link key={key} href={NavElement.url} className='mx-2 btn'>{NavElement.label}</Nav.Link>
                                ) : (
                                    <Link key={key} to={NavElement.url} className='mx-2 btn bg-primary btn-primary' role="button">{NavElement.label}</Link>
                                )
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export { NavigationBar };