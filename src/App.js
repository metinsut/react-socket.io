import React, { Component } from 'react';
import io from 'socket.io-client';
class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         response: [],
         endpoint: 'http://localhost:3000/',
         socket: null,
         msg: null
      };
   }

   async componentDidMount() {
      await this.setState({ socket: io(this.state.endpoint) });

      this.state.socket.on('getMsg', data =>
         this.setState(prevState => ({
            response: [...prevState.response, data.msg]
         }))
      );
   }

   sendMessage = () => {
      this.state.socket.emit('sendMsg', { msg: this.state.msg });
   };

   render() {
      const { response } = this.state;
      console.log(response);
      return (
         <div className="App">
            <input
               name="msg"
               onChange={e => this.setState({ msg: e.target.value })}
            />
            <button onClick={this.sendMessage}>Send</button>
            <br />
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
