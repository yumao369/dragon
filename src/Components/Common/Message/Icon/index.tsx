import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from "@mui/material"
import {
  CheckCircle, ErrorOutline, Cancel
} from "@mui/icons-material"

import './style.scss';

const Icon = (props: any) => {
  const { type  } = props;
  switch (type) {
    case "success": {
      return <CheckCircle/>
    }
    case "warn": {
      return <ErrorOutline/>
    }
    case "error": {
      return <Cancel/>
    }
    case "loading": {
      return <CircularProgress style={{width: "18px", height: "18px"}}/>
    }
    default: {
      return <></>
    }
  }
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};
Icon.defaultProps = {
  className: undefined,
  onClick: () => {}
};

export default Icon;