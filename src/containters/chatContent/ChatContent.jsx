import React, { Component } from 'react';
import ChatMessage from "../chatMessage/ChatMessage";
import './ChatContent.css';
import { Col, Icon, Steps } from 'antd';
import { isEmpty, map } from 'lodash';
import PropTypes from "prop-types";

const Step = Steps.Step;

export class ChatContent extends Component {
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    };

    render() {
        const messages = map(this.props.allMessages, value => {
            return (
                <li key={ value.time }>
                    <Col span={ 24 } className="message-element">
                        <ChatMessage
                            message={ value.message }
                            type={ value.type }
                            sender={ value.sender }
                            disable={ value.disable }
                            time={ value.time }
                            conversationId={ value.conversationId }
                            sendUsabilityRatingRequest={ this.props.sendUsabilityRatingRequest }
                            sendEfficiencyRatingRequest={ this.props.sendEfficiencyRatingRequest }
                            openInNewWindow={ this.props.openInNewWindow }
                            context={ value.context }
                            sendButtonRequest={ this.props.sendButtonRequest }
                        />
                    </Col>
                </li>
            );
        });

        if (!isEmpty(this.props.allMessages)) {
            return (
                <div className="messages-container">
                    <ul className="messages">
                        { messages }
                    </ul>
                    <div style={ { float: "left", clear: "both" } }
                         ref={ (el) => {
                             this.messagesEnd = el;
                         } }>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="steps-container">
                    <Steps current={ 3 }>
                        <Step title="Chat with bot" icon={ <Icon type="message"/> }/>
                        <Step title="Choose your musical instrument" icon={ <Icon type="heart-o"/> }/>
                        <Step title="Get product" icon={ <Icon type="shop"/> }/>
                    </Steps>
                    <div className="tooltip">
                        For start chat with bot write a <Icon type="message"/> or press <Icon type="enter"/>
                    </div>
                    <div style={ { float: "left", clear: "both" } }
                         ref={ (el) => {
                             this.messagesEnd = el;
                         } }>
                    </div>
                </div>
            );
        }

    }
}

ChatContent.propTypes = {
    allMessages: PropTypes.array,
    sendButtonRequest: PropTypes.func,
    sendUsabilityRatingRequest: PropTypes.func,
    sendEfficiencyRatingRequest: PropTypes.func,
    openInNewWindow: PropTypes.func
};

ChatContent.defaultProps = {
    allMessages: [],
};

export default ChatContent;