import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ChatMessage.css';
import { Avatar, Col, Form } from 'antd';
import { isEqual } from 'lodash';

const FormItem = Form.Item;

export class ChatMessage extends Component {
    render() {
        if (isEqual(this.props.type, 'msg')) {
            if (isEqual(this.props.sender, 'Bot')) {
                return (
                    <Form>
                        <span className="bot-message">
                            <FormItem>
                                <Avatar style={ {backgroundColor: '#1890ff'} } icon="aliwangwang"/>
                            </FormItem>
                            <FormItem>
                                <span style={ {color: '#efefef', marginLeft: '5px'} }
                                      className={ classNames('message', 'left-align') }>{ this.props.message }</span>
                            </FormItem>
                        </span>
                    </Form>
                );
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
        } else {
            return (
                <span>Some btn</span>
            );
        }
    }
}

ChatMessage.propTypes = {
    sender: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
    align: 'left',
};

export default ChatMessage;
