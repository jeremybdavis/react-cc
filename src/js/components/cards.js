import React from 'react/addons';
import App from './app';
import jquery from 'jquery';
import $ from 'jquery';

var defaultFormat = /(\d{1,4})/g;
var cards = [
  {
    type: 'maestro',
    pattern: /^(5018|5020|5038|6304|6759|676[1-3]|6768|5612|5893|6304|6759|0604|6390)/,
    format: defaultFormat,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Maestro_logo.svg/180px-Maestro_logo.svg.png'
  },
  {
    type: 'union_pay',
    pattern: /^(6211)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    url: 'http://ecommpay.com/wp-content/uploads/2015/03/UnionPay-card-1127132416.png'
  },
  {
    type: 'diners_club',
    pattern: /^(36|38|30[0-5])/,
    format: defaultFormat,
    length: [14],
    cvcLength: [3],
    url: 'https://dianhasan.files.wordpress.com/2011/08/logo_diners-club_us-2.png?w=150&h=150'
  },
  {
    type: 'jcb',
    pattern: /^35/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/JCB_Cards.svg/780px-JCB_Cards.svg.png'
  },
  {
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    url: 'http://www.spi.8m.com/discover.png'
  },
  {
    type: 'mastercard',
    pattern: /^5[1-5]/,
    format: defaultFormat,
    length: [16],
    cvcLength: [3],
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MasterCard_logo.png/320px-MasterCard_logo.png'
  },
  {
    type: 'amex',
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15],
    cvcLength: [3, 4],
    url: 'http://foothillspac.org/files/2614/2428/2957/American-Express-Logo.png'
  },
  {
    type: 'visa',
    pattern: /^4/,
    format: defaultFormat,
    length: [13, 14, 15, 16],
    cvcLength: [3],
    luhn: true,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/500px-Visa_Inc._logo.svg.png'
  }
];

var cardFromNumber = function(num) {
  num = (num + "").replace(/D/g, "");
  for (var i = 0; i < cards.length; i++) {
    var n = cards[i];
    if (n.pattern.test(num)) return n;
  }
};

var init = function() {
  // var card = document.getElementById('cards');

  document.getElementById('flip').addEventListener( 'click', function(){
    $('#cards').toggleClass('flipped');
  }, false);
};

window.addEventListener('DOMContentLoaded', init, false);

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cardNumber: '', cardImg: ''};
  }

  render() {
    return(
      <div className="container">

        <div id="cards">

          <main className="cc-front">

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
                <input className="month" placeholder="MM"></input>
                <span> / </span>
                <input className="year" placeholder="YY"></input>
              </div>

              <input className="name" placeholder="Full Name"></input>

            </form>

            {this.state.cardNumber && <img className="card-type" src={this.state.cardImg}/>}

          </main>

          <main className="cc-back">
            <div className="mag"></div>
            <input className="cvc" placeholder="XXX"></input>
          </main>

        </div>

        <button id="flip">Flip Card for CVC!</button>
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
      this.setState({cardImg: card.url});

    if(card && (maxLength = card.length), !/^\d+$/.test(charCode) || charCodeLen > maxLength) {
      return void e.preventDefault();
    }

    var cardTest = card && "amex" === card.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/;

    return cardTest.test(targetVal) && target.selectionStart === targetVal.length ?
      (e.preventDefault(), void(target.value = targetVal + " " + charCode)) : void 0;
  }

}

export default Cards;
