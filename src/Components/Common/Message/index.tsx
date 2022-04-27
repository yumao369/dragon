import React from 'react';
import PropTypes from 'prop-types';
import { render, unmountComponentAtNode } from 'react-dom';
import cx from 'classnames';

import Icon from './Icon';

import './style.scss';

const GlobalMessage = (props: any) => {
  const { type, content } = props;
  const cls = cx(
    'message-content',
    type
  );
  return (
    <div className={cls}>
      <Icon type={type} />
      <p style={{fontWeight: "bold", color: "black", marginLeft: "8px"}}>{content}</p>
    </div>
  );
};

GlobalMessage.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

const Message = {
  success(content: string, timeout?: number) {
    this.message('success', content, timeout);
  },
  warn(content: string, timeout?: number) {
    this.message('warn', content, timeout);
  },
  error(content: string, timeout?: number) {
    this.message('error', content, timeout);
  },
  loading(content: string) {
    const container = document.createElement('div');
    container.setAttribute('class', 'component-message-wrap loading-message');
    container.setAttribute('style', `-webkit-animation-duration: 100000ms; animation-duration: 100000ms`);
    document.body.appendChild(container);
    render(<GlobalMessage type="loading" content={content} />, container);
    return () => {
      unmountComponentAtNode(container);
      container.remove();
    }
  },
  message(type: "success" | "warn" | "error", content: string, timeout = 3000) {
    const container = document.createElement('div');
    container.setAttribute('class', 'component-message-wrap normal-message');
    container.setAttribute('style', `-webkit-animation-duration: ${timeout}ms; animation-duration: ${timeout}ms`);
    document.body.appendChild(container);
    render(<GlobalMessage type={type} content={content} />, container);
    setTimeout(() => {
      unmountComponentAtNode(container);
      container.remove();
    }, timeout);
  }
}

export default Message