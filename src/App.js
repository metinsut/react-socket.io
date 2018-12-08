import React, { Component } from 'react';
import io from 'socket.io-client';
class App extends Component {
   state = {
      response: [],
      endpoint: 'http://localhost:3000/'
   };
   socket= null;

   componentDidMount() {
      const { endpoint } = this.state;
      this.socket = io(endpoint);
      this.socket.on('sendMes', data =>
         this.setState(prevState => ({
            response: [...prevState.response, data.name]
         }))
      );
      this.forceUpdate();
   }

   sendMessage = () => {
      this.socket.emit('sayHey', { name: 'john', age: 31 });
   };

   render() {
      const { response } = this.state;
      console.log(response);
      return (
         <div className="App">
            <h1>HEYY</h1>
            <button onClick={this.sendMessage}>Send</button>
            {response.length > 0 ? (
               response.map((item, key) => <p key={key}>Hello: {item}</p>)
            ) : (
               <p>Loading...</p>
            )}
         </div>
      );
   }
}

export default App;
