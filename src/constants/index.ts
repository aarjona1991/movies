//Types
enum NavigationElementType {
    Link,
    Button
}

//Consts
export const nav = {
    logo: '/media/logo.svg',
    menu: [
        {
            url: '/#destacadas',
            label: 'Destacadas',
            type: NavigationElementType.Link
        },
        {
            url: '/#cartelera',
            label: 'Cartelera',
            type: NavigationElementType.Link
        },
        {
            url: '/comprar-ticket',
            label: 'Comprar ticket',
            type: NavigationElementType.Button
        }
    ]
}