import React, { Component } from 'react';
import { ChatPanel } from "./chatPanel/ChatPanel";


export class RootViewController extends Component {
    render() {
        return (
            <ChatPanel/>
        );
    }
}