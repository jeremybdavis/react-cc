import React from 'react/addons';
import Cards from './cards';

class App extends React.Component {

  render() {
    return(
      <div className="main-container">
        <h1>Pay Here</h1>
        <div className="wrapper">
            <Cards/>
        </div>
      </div>
    )
  }
}

export default App;
