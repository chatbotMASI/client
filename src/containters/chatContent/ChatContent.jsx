import React, { Component } from 'react';
import ChatMessage from "../chatMessage/ChatMessage";
import './ChatContent.css';
import { Card, Col } from 'antd';
import map from 'lodash/map';
import PropTypes from "prop-types";

export class ChatContent extends Component {
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    };

    render() {
        const messages = map(this.props.allMessages, value => {
            return (
                <li key={ value.time }>
                    <Col span={ 23 } className="message-element">
                        <Card title={ value.sender }>
                            <ChatMessage message={ value.message }/>
                        </Card>
                    </Col>
                </li>
            );
        });

        return (
            <div className="messages-container">
                <ul className="messages">
                    { messages }
                </ul>
                <div style={ {float: "left", clear: "both"} }
                     ref={ (el) => {
                         this.messagesEnd = el;
                     } }>
                </div>
            </div>
        );
    }
}

ChatContent.propTypes = {
    allMessages: PropTypes.array,
};

ChatContent.defaultProps = {
    allMessages: [],
};

export default ChatContent;