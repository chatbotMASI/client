import React, { Component } from 'react';
import "./ChatPanel.css";
import { ChatHeader } from "../chatHeader/ChatHeader";
import { ChatContent } from "../chatContent/ChatContent";
import { ChatInput } from "../chatInput/ChatInput";
import { Layout, message, Icon } from 'antd';
import axios from "axios/index";
import { isEmpty, isNil, map, last } from "lodash";
import { Dot } from 'react-animated-dots';

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
            message: '',
            ipAddress: '',
            conversationId: ''
        };
        this.getIpAddress();
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
                disable: false,
                conversationId: this.state.conversationId,
                context: this.state.context
            }]
        });
    };

    setContext = (context) => {
        this.setState({
            context: context,
            conversationId: isNil(context) ? undefined : context.conversation_id
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

    sendRequest = (optionalMessage, optionalContext) => {
        const message = isNil(optionalMessage) ? this.state.message : optionalMessage;
        let data;
        this.setProcessing(true);
        if (isEmpty(optionalContext)) {
            if (isEmpty(this.state.context)) {
                data = { message, ipAddress: this.state.ipAddress };
            } else {
                data = { message, context: this.state.context };
            }
        } else {
            data = { message, context: optionalContext };
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
                this.openLink(value.data.link);
            }
            // if (!isNil(optionalMessage) && last(this.state.messages).type !== 'btn') {
            //     this.disableButtons();
            // }
            this.setProcessing(false);
        }).catch(() => message.error(
            <span>
                Something bad happened <Icon type="frown-o"/>Please try again later
            </span>
        ));
    };

    openLink = (link) => {
        this.addMessage(link, 'Bot', 'link');
        this.openInNewWindow(link, window);
        this.addMessage('Now we are starting over. What else can I do for you?', 'Bot', 'msg');
        this.setContext(null);
    };

    openInNewWindow = (link, window) => {
        const width = window.screen.width - 500;
        const height = window.screen.height - 110;
        const strWindowFeatures = `menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,width=${width},height=${height}`;
        const tab = window.open(link, "_blank", strWindowFeatures);
        tab.focus();

        this.addMessage('How about rating me?', 'Bot', 'msg');
        this.addMessage('', 'Bot', 'rating');

        // const timer = setInterval(() => {
        //     if(tab.closed) {
        //         clearInterval(timer);
        //         this.addMessage('I see that you close Amazon.com', 'Bot', 'msg');
        //         this.addMessage('Do you like it?', 'Bot', 'msg');
        //     }
        // }, 1000);
    };

    sendButtonRequest = (message, context) => {
        this.addMessage(message, 'User', 'msg');
        // this.sendRequest(message);
        this.sendRequest(message, context);
    };

    sendUsabilityRatingRequest = (rated, conversationId) => {
        const rate = rated * 2;
        this.state.http.post(`/usability-rate?conversationId=${conversationId}`, rate).then(() => {
            message.success(
                <span>
                    Usability rated. Thanks! <Icon type="smile-o"/>
                </span>
            );
        }).catch(() => message.error(
            <span>
                Something bad happened <Icon type="frown-o"/>Please try again later
            </span>
        ));
    };


    sendEfficiencyRatingRequest = (rated, conversationId) => {
        const rate = rated * 2;
        this.state.http.post(`/effectiveness-rate?conversationId=${conversationId}`, rate).then(() => {
            message.success(
                <span>
                    Satisfaction rated. Thanks! <Icon type="smile-o"/>
                </span>
            );
        }).catch(() => message.error(
            <span>
                Something bad happened <Icon type="frown-o"/>Please try again later
            </span>
        ));
    };

    getIpAddress = () => {
        axios.post('http://ipinfo.io').then(res => {
            this.setState({
                ipAddress: res.data.ip
            });
        });
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
                            sendUsabilityRatingRequest={ this.sendUsabilityRatingRequest }
                            sendEfficiencyRatingRequest={ this.sendEfficiencyRatingRequest }
                            openInNewWindow={ this.openInNewWindow }
                        />
                    </Content>
                    { this.state.isProcessing &&
                    <span className="bot-typing">
                        Bot is typing<Dot>.</Dot><Dot>.</Dot><Dot>.</Dot>
                    </span>
                    }
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