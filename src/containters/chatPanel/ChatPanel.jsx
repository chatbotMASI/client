import React, {Component} from 'react';
import "./ChatPanel.css";
import {ChatHeader} from "../chatHeader/ChatHeader";
import {ChatContent} from "../chatContent/ChatContent";
import {ChatInput} from "../chatInput/ChatInput";
import {Layout, Col, Row} from 'antd';

const {Header, Footer, Content} = Layout;

export class ChatPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            context: {}
        };
    }

    addMessage = (message, sender) => {
        this.setState({
            messages: [...this.state.messages, {
                sender,
                time: new Date().getTime(),
                message: message
            }]
        });
    };

    setContext = (context) => {
        this.setState({
            context: context
        })
    };

    render() {
        console.log('messages', this.state.messages);
        return (
            <div className="chat-panel">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={6}/>
                    <Col span={12}>
                        <Layout className="chat">
                            <Header className="header">
                                <ChatHeader/>
                            </Header>
                            <Content className="content" id="scrollbar">
                                <ChatContent allMessages={this.state.messages}/>
                            </Content>
                            <Footer className="footer">
                                <ChatInput context={this.state.context} addMessage={this.addMessage}
                                           setContext={this.setContext}/>
                            </Footer>
                        </Layout>
                    </Col>
                    <Col span={6}/>
                </Row>
            </div>
        );
    }
}