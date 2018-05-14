import React, { Component } from 'react';
import { Button, Col, Form, Input, message, Tooltip } from 'antd';
import PropTypes from "prop-types";
import axios from 'axios'
import { isEmpty } from 'lodash'
import './ChatInput.css';

const FormItem = Form.Item;

export class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            http: axios.create({
                baseURL: 'http://localhost:8080',
                timeout: 5000,
                headers: {'Content-Type': 'application/json'}
            }),
            isProcessing: false,
        };
    }

    updateMessage = (evt) => {
        this.setState({message: evt.target.value});
    };

    render() {
        return (
            <Form>
                <Col xs={ {span: 18} } sm={ {span: 20} } xl={ {span: 22} }>
                    <FormItem hasFeedback validateStatus={ this.state.isProcessing ? "validating" : "" }>
                        <Tooltip title={ this.state.isProcessing && "The request is processing"  }>
                            <Input autoFocus placeholder="Type a message to bot here" size="large"
                                   onPressEnter={ this.sendMessage } className="message-input"
                                   value={ this.state.message } onChange={ this.updateMessage }/>
                        </Tooltip>
                    </FormItem>
                </Col>
                <Col xs={ {span: 2} } sm={ {span: 2} } xl={ {span: 2} }>
                    <Button className="send-button" type="primary" size="large" icon="right"
                            onClick={ this.sendMessage }>Send</Button>
                </Col>
            </Form>
        );
    }

    sendMessage = () => {
        if (this.canSendFirstMessage()) {
            this.sendRequest();
            return;
        }

        if (this.canSendMessage()) {
            message.error("Message can't be empty!");
        } else {
            this.props.addMessage(this.state.message, 'User', 'msg');
            this.setState({message: ""});
            this.sendRequest();
        }
    };

    canSendFirstMessage() {
        return isEmpty(this.state.message) && isEmpty(this.props.context);
    }

    canSendMessage() {
        return isEmpty(this.state.message)
    }

    sendRequest = () => {
        let data;
        this.setState({isProcessing: true});
        if (isEmpty(this.props.context)) {
            data = {message: this.state.message};
        } else {
            data = {message: this.state.message, context: this.props.context};
        }
        this.state.http.post('/chat', data).then(value => {
            console.log('response', value);
            this.props.setContext(value.data.context);
            if (!isEmpty(value.data.response)) {
                this.props.addMessage(value.data.response, 'Bot', 'msg');
            }
            this.setState({isProcessing: false});
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