import React, { Component } from 'react';
import { Button, Col, Form, Input, Tooltip } from 'antd';
import PropTypes from "prop-types";
import './ChatInput.css';

const FormItem = Form.Item;

export class ChatInput extends Component {
    updateMessage = (evt) => {
        this.props.setMessage(evt.target.value);
    };

    sendMessage = () => {
        if (this.props.isProcessing)
            return;

        this.props.sendMessage();
    };

    render() {
        return (
            <Form>
                <Col xs={ { span: 18 } } sm={ { span: 20 } } xl={ { span: 22 } }>
                    { /*<FormItem hasFeedback validateStatus={ this.props.isProcessing ? "validating" : "" }>*/ }
                    <FormItem hasFeedback>
                        <Tooltip title={ this.props.isProcessing && "The request is processing" }>
                            <Input autoFocus placeholder="Type a message to bot here" size="large"
                                   onPressEnter={ this.sendMessage } className="message-input"
                                   value={ this.props.message } onChange={ this.updateMessage }/>
                        </Tooltip>
                    </FormItem>
                </Col>
                <Col xs={ { span: 2 } } sm={ { span: 2 } } xl={ { span: 2 } }>
                    <Button className="send-button" type="primary" size="large" icon="right"
                            onClick={ this.props.sendMessage } loading={ this.props.isProcessing }>Send</Button>
                </Col>
            </Form>
        );
    }
}


ChatInput.propTypes = {
    sendMessage: PropTypes.func,
    isProcessing: PropTypes.bool,
    message: PropTypes.string,
    setMessage: PropTypes.func,
};

ChatInput.defaultProps = {};

export default ChatInput;