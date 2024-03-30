import { FC } from 'react';
import { Nav, Navbar, Container, Image } from 'react-bootstrap';

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
                    <Image src={logo} width={76} height={46} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {menu.map((NavElement: NavigateItem, key: number) => (
                                (NavElement.type === NavigationElementType.Link) ? (
                                    <Nav.Link key={key} href={NavElement.url} className='mx-2'>{NavElement.label}</Nav.Link>
                                ) : (
                                    <Nav.Link key={key} href={NavElement.url} className='mx-2 btn bg-primary btn-primary' role="button">{NavElement.label}</Nav.Link>
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