import './Header.css'

function Header() {
    return (
        <header className="header">
            <h1 className="logo"><a href="#">Raabta</a></h1>
            <ul className="main-nav">
                <li><a href="#">Logout</a></li>
            </ul>
        </header>
    )
}


export default Header