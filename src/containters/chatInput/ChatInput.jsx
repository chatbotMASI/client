import React, { Component } from 'react';
import { Button, Col, Input, Row, message } from 'antd';
import PropTypes from "prop-types";
import axios from 'axios'
import isEmpty from 'lodash/isEmpty';

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
            <Row gutter={ 5 }>
                <Col span={ 22 }>
                    <Input placeholder="Type a message" size="large" onPressEnter={ this.sendMessage }
                           value={ this.state.message } onChange={ this.updateMessage }/>
                </Col>
                <Col span={ 2 }>
                    <Button type="primary" size="large" icon="right" onClick={ this.sendMessage }>Send</Button>
                </Col>
            </Row>
        );
    }

    sendMessage = () => {
        if (isEmpty(this.state.message)) {
            message.error("Message can't be empty!")
        } else {
            this.state.http.post('/messages', { message: this.state.message }).then(value => {
                console.log('response', value);
                this.props.onSubmit(this.state.message);
                this.setState({message: ""});
            });
        }
    }
}


ChatInput.propTypes = {
    onSubmit: PropTypes.func,
};

ChatInput.defaultProps = {};

export default ChatInput;