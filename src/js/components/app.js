import React from 'react/addons';
import Cards from './cards';

class App extends React.Component {

  render() {
    return(
      <div className="wrapper">
        <div className="content">
          <h1>Pay Here</h1>
          <Cards/>
        </div>
      </div>
    )
  }
}

export default App;
