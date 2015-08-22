import React from 'react/addons';

class Cards extends React.Component {
  render() {
    return(
      <div className="cards">
        <h2>Your<strong>Bank</strong></h2>
        <form className="inputs">
          <input className="number" placeholder="XXXXXXXXXXXXXXXX"></input>
          <div className="expiration">
            <p>Valid Thru</p>
            <input className="month" placeholder="Exp"></input>
            <span> / </span>
            <input className="year" placeholder="Exp"></input>
          </div>
          <input className="name" placeholder="Full Name"></input>
        </form>
      </div>
    )
  }
}

export default Cards;
