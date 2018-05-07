import React, {Component} from 'react';
import {Button, Col, Input, Row, message} from 'antd';
import PropTypes from "prop-types";
import axios from 'axios'
import {map, isEmpty} from 'lodash'

export class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            http: axios.create({
                baseURL: 'http://localhost:8080',
                timeout: 5000,
                headers: {'Content-Type': 'application/json'}
            })
        };
    }

    updateMessage = (evt) => {
        this.setState({message: evt.target.value});
    };

    render() {
        return (
            <Row gutter={5}>
                <Col span={22}>
                    <Input autoFocus placeholder="Type a message to bot here" size="large"
                           onPressEnter={this.sendMessage}
                           value={this.state.message} onChange={this.updateMessage}/>
                </Col>
                <Col span={2}>
                    <Button type="primary" size="large" icon="right" onClick={this.sendMessage}>Send</Button>
                </Col>
            </Row>
        );
    }

    sendMessage = () => {
        if (isEmpty(this.state.message) && isEmpty(this.props.context)) {
            this.sendRequest();
            return;
        }

        if (isEmpty(this.state.message)) {
            message.error("Message can't be empty!");
        } else {
            this.props.addMessage(this.state.message, 'User');
            this.setState({message: ""});
            this.sendRequest();
        }
    };

    sendRequest = () => {
        let data;
        if (isEmpty(this.props.context)) {
            data = {message: this.state.message};
        } else {
            data = {message: this.state.message, context: this.props.context};
        }
        this.state.http.post('/chat', data).then(value => {
            console.log('response', value);
            this.props.setContext(value.data.context);
            if (!isEmpty(value.data.response)) {
                this.props.addMessage(value.data.response, 'Bot');
            }
        });
    }
}


ChatInput.propTypes = {
    addMessage: PropTypes.func,
    setContext: PropTypes.func,
    context: PropTypes.object
};

ChatInput.defaultProps = {};

export default ChatInput;