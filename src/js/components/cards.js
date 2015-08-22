import React from 'react/addons';
import App from './app';

var defaultFormat = /(\d{1,4})/g;
var cards = [
  {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6759|676[1-3]|6768|5612|5893|6304|6759|0604|6390)/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3]
  },
  {
    type: 'diners_club',
    pattern: /^(36|38|30[0-5])/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3]
  },
  {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3]
  },
  {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3]
  },
  {
    type: 'mastercard',
    pattern: /^5[1-5]/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3]
  },
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4]
  },
  {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 14, 15, 16],
    cvcLength: [3],
    luhn: true
  }
];

var cardFromNumber = function(num) {
  num = (num + "").replace(/D/g, "");
  for (var i = 0; i < cards.length; i++) {
    var n = cards[i];
    if (n.pattern.test(num)) return n;
  }
}

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardNumber: '', cardType: ''};
  }

  render() {
    return(
      <div className="cards">
        <h2>Your<strong>Bank</strong></h2>
        <form className="inputs">
          <input
            className="number"
            autoComplete="off"
            autoFocus="true"
            onChange={(e)=> this.setCardNumber(e)}
            onKeyPress={(e)=> this.handleCCNumberInput(e)}
            placeholder="XXXXXXXXXXXXXXXX"></input>
          <div className="expiration">
            <p>Valid Thru</p>
            <input className="month" placeholder="Exp"></input>
            <span> / </span>
            <input className="year" placeholder="Exp"></input>
          </div>
          <input className="name" placeholder="Full Name"></input>
        </form>
        {this.state.cardNumber && <h3 className="card-type">{this.state.cardType}</h3>}
      </div>
    )
  }

  setCardNumber(e) {
    var targetVal = e.target.value;
    this.setState({cardNumber: targetVal});
  }

  handleCCNumberInput(e) {
    var target = e.currentTarget,
    targetVal = target.value,
    charCode = String.fromCharCode(e.which),
    charCodeLen = (targetVal.replace(/\D/g, "") + charCode).length,
    card = cardFromNumber(targetVal + charCode),
    maxLength = 16;

    if(this.state.cardNumber.length >= 2)
      this.setState({cardType: card.type});

    if(card && (maxLength = card.length), !/^\d+$/.test(charCode) || charCodeLen > maxLength) {
      return void e.preventDefault();
    }

    var cardTest = card && "amex" === card.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/;

    return cardTest.test(targetVal) && target.selectionStart === targetVal.length ?
      (e.preventDefault(), void(target.value = targetVal + " " + charCode)) : void 0;
  }
}

export default Cards;
