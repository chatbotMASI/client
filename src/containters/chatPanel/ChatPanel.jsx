import React, { Component } from 'react';
import "./ChatPanel.css";
import { ChatHeader } from "../chatHeader/ChatHeader";
import { ChatContent } from "../chatContent/ChatContent";
import { ChatInput } from "../chatInput/ChatInput";
import { Layout } from 'antd';

const {Header, Footer, Content} = Layout;

export class ChatPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            context: {}
        };
    }

    addMessage = (message, sender, type) => {
        this.setState({
            messages: [...this.state.messages, {
                sender,
                type,
                time: new Date().getTime(),
                message
            }]
        });
    };

    setContext = (context) => {
        this.setState({
            context: context
        })
    };

    render() {
        return (
            <div className="chat-panel">
                <Layout className="chat">
                    <Header className="header">
                        <ChatHeader/>
                    </Header>
                    <Content className="content" id="scrollbar">
                        <ChatContent allMessages={ this.state.messages }/>
                    </Content>
                    <Footer className="footer">
                        <ChatInput context={ this.state.context } addMessage={ this.addMessage }
                                   setContext={ this.setContext }/>
                    </Footer>
                </Layout>
            </div>
        );
    }
}