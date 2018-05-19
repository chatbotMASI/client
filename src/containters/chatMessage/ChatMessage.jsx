import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ChatMessage.css';
import { Avatar, Button, Col, Form } from 'antd';
import { isEqual, map } from 'lodash';

const FormItem = Form.Item;

export class ChatMessage extends Component {
    openWindow = () => {
        this.props.openInNewWindow(this.props.message, window);
    };

    render() {
        if (isEqual(this.props.sender, 'Bot')) {
            if (isEqual(this.props.type, 'msg')) {
                return (
                    <Form className="bot-form">
                        <span className="bot-message">
                            <FormItem>
                                <Avatar style={ { backgroundColor: '#1890ff' } } icon="aliwangwang"/>
                            </FormItem>
                            <FormItem>
                                <span style={ { color: '#efefef', marginLeft: '5px' } }
                                      className={ classNames('message', 'left-align') }>{ this.props.message }</span>
                            </FormItem>
                        </span>
                    </Form>
                );
            } else if (isEqual(this.props.type, 'link')) {
                return (
                    <Form>
                        <span className="bot-message">
                            <div style={ { marginLeft: '37px' } }/>
                            <div className="buttons">
                                <FormItem key={ `${this.props.time}-form-link` }>
                                    <Button
                                        key={ `${this.props.time}-button-link` }
                                        className={ classNames('left-align', 'bot-button') }
                                        disabled={ this.props.disable }
                                        onClick={ this.openWindow }
                                        type="dashed"
                                        icon="select"
                                    >
                                        Open link in new window
                                    </Button>
                                </FormItem>
                            </div>
                        </span>
                    </Form>
                );
            } else {
                return (
                    <Form>
                        <span className="bot-message">
                            <div style={ { marginLeft: '37px' } }/>
                            <div className="buttons">
                                { map(this.props.message, btnMessage => {
                                    return (
                                        <FormItem key={ btnMessage }>
                                            <Button
                                                key={ btnMessage }
                                                className={ classNames('left-align', 'bot-button') }
                                                onClick={ () => this.props.sendButtonRequest(btnMessage) }
                                                disabled={ this.props.disable }
                                            >
                                                { btnMessage }
                                            </Button>
                                        </FormItem>
                                    );
                                }) }
                            </div>
                        </span>
                    </Form>
                );
            }
        } else {
            return (
                <Form>
                    <Col span={ 24 }>
                        <FormItem>
                            <span className={ classNames('message', 'right-align') }>{ this.props.message }</span>
                        </FormItem>
                    </Col>
                </Form>
            );
        }
    }
}

ChatMessage.propTypes = {
    sender: PropTypes.string,
    type: PropTypes.string,
    disable: PropTypes.bool,
    time: PropTypes.number,
    sendButtonRequest: PropTypes.func,
    openInNewWindow: PropTypes.func,
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
};

ChatMessage.defaultProps = {
    align: 'left',
};

export default ChatMessage;
