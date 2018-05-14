import React, { Component } from 'react';
import './App.css';
import { ChatPanel } from "./containters/chatPanel/ChatPanel";

class App extends Component {
    render() {
        return (
            <div className="App">
                <ChatPanel/>
            </div>
        );
    }
}

export default App;
