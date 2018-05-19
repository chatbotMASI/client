import React, { Component } from 'react';
import "./ChatPanel.css";
import { ChatHeader } from "../chatHeader/ChatHeader";
import { ChatContent } from "../chatContent/ChatContent";
import { ChatInput } from "../chatInput/ChatInput";
import { Layout, message } from 'antd';
import axios from "axios/index";
import { isEmpty, isNil, map } from "lodash";

const { Header, Footer, Content } = Layout;

export class ChatPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            context: {},
            http: axios.create({
                baseURL: 'http://localhost:8080',
                timeout: 5000,
                headers: { 'Content-Type': 'application/json' }
            }),
            isProcessing: false,
            message: ''
        };
    }

    setProcessing = (status) => {
        this.setState({
            isProcessing: status
        });
    };

    setMessage = (message) => {
        this.setState({
            message
        })
    };

    addMessage = (message, sender, type) => {
        this.setState({
            messages: [...this.state.messages, {
                sender,
                type,
                time: new Date().getTime(),
                message,
                disable: false
            }]
        });
    };

    setContext = (context) => {
        this.setState({
            context: context
        })
    };

    sendMessage = () => {
        if (this.canSendFirstMessage()) {
            this.sendRequest();
            return;
        }

        if (this.canSendMessage()) {
            message.error("Message can't be empty!");
        } else {
            this.addMessage(this.state.message, 'User', 'msg');
            this.setMessage('');
            this.sendRequest();
        }
    };

    canSendFirstMessage() {
        return isEmpty(this.state.message) && isEmpty(this.state.context);
    };

    canSendMessage() {
        return isEmpty(this.state.message)
    };

    sendRequest = (optionalMessage) => {
        const message = isNil(optionalMessage) ? this.state.message : optionalMessage;
        let data;
        this.setProcessing(true);
        if (isEmpty(this.state.context)) {
            data = { message };
        } else {
            data = { message, context: this.state.context };
        }
        this.state.http.post('/chat', data).then(value => {
            console.log('response', value);
            this.setContext(value.data.context);
            if (!isEmpty(value.data.response)) {
                this.addMessage(value.data.response, 'Bot', 'msg');
            }
            if (!isEmpty(value.data.buttons)) {
                this.addMessage(value.data.buttons, 'Bot', 'btn');
            }
            if (!isEmpty(value.data.link)) {
                this.addMessage(value.data.link, 'Bot', 'link');
            }
            if (!isNil(optionalMessage)) {
                this.disableButtons();
            }
            this.setProcessing(false);
        });
    };

    openInNewWindow = (link, window) => {
        const width = window.screen.width - 500;
        const height = window.screen.height - 110;
        const strWindowFeatures = `menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,width=${width},height=${height}`;
        const tab = window.open(link, "_blank", strWindowFeatures);
        
        tab.focus();
        const timer = setInterval(() => {
            if(tab.closed) {
                clearInterval(timer);
                this.addMessage('I see that you close Amazon.com', 'Bot', 'msg');
                this.addMessage('Do you like it?', 'Bot', 'msg');
            }
        }, 1000);
    };

    sendButtonRequest = (message) => {
        this.addMessage(message, 'User', 'msg');
        this.sendRequest(message);
    };

    disableButtons = () => {
        this.setState({
            messages: map(this.state.messages, entry =>
                (entry.type === 'btn' && !entry.disable) ? Object.assign({}, entry, { disable: true }) : entry
            )
        });
    };

    render() {
        return (
            <div className="chat-panel">
                <Layout className="chat">
                    <Header className="header">
                        <ChatHeader/>
                    </Header>
                    <Content className="content" id="scrollbar">
                        <ChatContent
                            allMessages={ this.state.messages }
                            sendButtonRequest={ this.sendButtonRequest }
                            openInNewWindow={ this.openInNewWindow }
                        />
                    </Content>
                    <Footer className="footer">
                        <ChatInput
                            sendMessage={ this.sendMessage }
                            setMessage={ this.setMessage }
                            message={ this.state.message }
                            isProcessing={ this.state.isProcessing }
                        />
                    </Footer>
                </Layout>
            </div>
        );
    }
}