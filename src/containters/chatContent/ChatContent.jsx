import React, {Component} from 'react';
import ChatMessage from "../chatMessage/ChatMessage";
import './ChatContent.css';
import {Card, Col, Steps, Icon} from 'antd';
import {map, isEmpty} from 'lodash';
import PropTypes from "prop-types";

const Step = Steps.Step;

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
                <li key={value.time}>
                    <Col span={23} className="message-element">
                        <Card title={value.sender}>
                            <ChatMessage message={value.message}/>
                        </Card>
                    </Col>
                </li>
            );
        });

        if (!isEmpty(this.props.allMessages)) {
            return (
                <div className="messages-container">
                    <ul className="messages">
                        {messages}
                    </ul>
                    <div style={{float: "left", clear: "both"}}
                         ref={(el) => {
                             this.messagesEnd = el;
                         }}>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="steps-container">
                    <Steps current={3}>
                        <Step title="Chat with bot" icon={<Icon type="message"/>}/>
                        <Step title="Choose your musical instrument" icon={<Icon type="heart-o"/>}/>
                        <Step title="Get product" icon={<Icon type="shop"/>}/>
                    </Steps>
                </div>
            );
        }

    }
}

ChatContent.propTypes = {
    allMessages: PropTypes.array,
};

ChatContent.defaultProps = {
    allMessages: [],
};

export default ChatContent;