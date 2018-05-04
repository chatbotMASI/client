import React, { Component } from 'react';
import "./ChatPanel.css";
import { ChatHeader } from "../chatHeader/ChatHeader";
import { ChatContent } from "../chatContent/ChatContent";
import { ChatInput } from "../chatInput/ChatInput";
import { Layout, Col, Row } from 'antd';

const {Header, Footer, Content} = Layout;

const mockMessages = [
    {sender: 'Bot', time: '11:03', message: 'Hello, i\'m bot'},
    {sender: 'Yuriy', time: '11:04', message: 'Hello, i\'m Yuriy'},
    {sender: 'Yuriy', time: '11:05', message: 'Hello, i\'m Yuriy'},
    {sender: 'Yuriy', time: '11:06', message: 'Hello, i\'m Yuriy'}
];

export class ChatPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: mockMessages
        };
    }

    addMessage = (message) => {
        this.setState({
            messages: [...this.state.messages, {
                sender: 'Yuriy',
                time: new Date().getTime(),
                message: message
            }]
        });
    };

    render() {
        console.log('messages', this.state.messages);
        return (
            <div className="chat-panel">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={ 6 }/>
                    <Col span={ 12 }>
                        <Layout className="chat">
                            <Header className="header">
                                <ChatHeader/>
                            </Header>
                            <Content className="content" id="scrollbar">
                                <ChatContent allMessages={ this.state.messages }/>
                            </Content>
                            <Footer className="footer">
                                <ChatInput onSubmit={ this.addMessage }/>
                            </Footer>
                        </Layout>
                    </Col>
                    <Col span={ 6 }/>
                </Row>
            </div>
        );
    }
}