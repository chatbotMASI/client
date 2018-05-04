import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ChatMessage.css';

export class ChatMessage extends Component {
    render() {
        return (
            <span className={ classNames({
                ['left-align']: this.props.align === 'left',
                ['right-align']: this.props.align === 'right'
            }) }>{ this.props.message }</span>
        );
    }
}

ChatMessage.propTypes = {
    align: PropTypes.string,
    message: PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
    align: 'left',
};

export default ChatMessage;
