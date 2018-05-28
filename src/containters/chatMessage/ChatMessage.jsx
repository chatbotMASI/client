import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ChatMessage.css';
import { Avatar, Button, Col, Form, Rate } from 'antd';
import { isEqual, map } from 'lodash';

const FormItem = Form.Item;

export class ChatMessage extends Component {
    openWindow = () => {
        this.props.openInNewWindow(this.props.message, window);
    };

    efficiencyRatingRequest = (value) => {
        this.props.sendEfficiencyRatingRequest(value, this.props.conversationId);
    };

    sendUsabilityRatingRequest = (value) => {
        this.props.sendUsabilityRatingRequest(value, this.props.conversationId);
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
                                <span
                                    className={ classNames('message', 'left-align', 'bot-text-message') }
                                >
                                    { this.props.message }
                                </span>
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
            } else if (isEqual(this.props.type, 'rating')) {
                return (
                    <Form>
                        <span className="bot-message">
                            <div style={ { marginLeft: '37px' } }/>
                            <div className="buttons">
                                <FormItem>
                                    <span style={ { color: '#efefef', marginTop: '-4px', marginBottom: '10px' } }
                                          className={ classNames('message', 'left-align') }>
                                        Rate your satisfaction with listed products
                                    </span>
                                </FormItem>
                                <FormItem>
                                    <Rate
                                        className={ classNames('left-align', 'bot-button', 'rating') }
                                        onChange={ this.efficiencyRatingRequest }
                                        allowHalf
                                        allowClear={ false }
                                    />
                                </FormItem>
                                <FormItem>
                                    <span style={ { color: '#efefef', marginTop: '-4px', marginBottom: '10px' } }
                                          className={ classNames('message', 'left-align') }>
                                        Also rate how useful I was
                                    </span>
                                </FormItem>
                                <FormItem>
                                    <Rate
                                        className={ classNames('left-align', 'bot-button', 'rating') }
                                        onChange={ this.sendUsabilityRatingRequest }
                                        allowHalf
                                        allowClear={ false }
                                    />
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
                                                onClick={ () => this.props.sendButtonRequest(btnMessage, this.props.context) }
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
    conversationId: PropTypes.string,
    sendUsabilityRatingRequest: PropTypes.func,
    sendEfficiencyRatingRequest: PropTypes.func,
    openInNewWindow: PropTypes.func,
    context: PropTypes.any,
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
};

ChatMessage.defaultProps = {
    align: 'left',
};

export default ChatMessage;
