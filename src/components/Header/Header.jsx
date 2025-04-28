import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png"

function Header ({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { 
        month: 'long', 
        day: 'numeric' });
    return (
        <header className="header">        
            <img src={logo} alt="Header Logo"className="header__logo" />
            <p className="header__date-and-loc">
                {currentDate}, {weatherData.city}
            </p>
            <button
                onClick={handleAddClick} 
                type="button" 
                className="header__add-clothes-btn"
            >
                + Add Clothes
            </button>
            <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
            </div>
        </header>
    )
}

export default Header;