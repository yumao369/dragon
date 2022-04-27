import React, { useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { divide } from 'ramda';

function GlobalDialog(props: {
  onClose: () => void;
  onCancel: () => void;
  onOk: () => void;
  title: string;
  description: string;
  okText?: string;
  cancelText?: string;
}) {
  const {
    title, 
    description, 
    onCancel, 
    onOk,
    okText = "Ok",
    cancelText = "Cancel"
  } = props
  return (<MuiDialog
    open={true}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>{cancelText}</Button>
      <Button onClick={onOk} autoFocus>
        {okText}
      </Button>
    </DialogActions>
  </MuiDialog>)
}

GlobalDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

const Dialog = {
  show(
    props: {
      onCancel?: () => void;
      onOk?: () => void;
      title: string;
      description: string;
      okText?: string;
      cancelText?: string;
    }
  ) {
    const container = document.createElement('div');
    const onClose = () => {
      unmountComponentAtNode(container);
      container.remove()
    }
    const onCancel = props.onCancel ? () => {
      if (props.onCancel) {
        props.onCancel()
      }
      onClose()
    } : onClose
    const onOk = props.onOk ? () => {
      if (props.onOk) {
        props.onOk()
      }
      onClose()
    }: onClose
    render(<GlobalDialog
      onClose={onClose}
      onCancel={onCancel}
      onOk={onOk}
      title={props.title}
      description={props.description}
      okText={props.okText}
      cancelText={props.cancelText}
    />, container)
    document.body.appendChild(container);
  }
}

export default Dialog