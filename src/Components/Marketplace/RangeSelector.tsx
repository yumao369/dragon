import React, {useState} from 'react'

import { Slider, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import Summary from "./Summary"

function valuetext(value: number) {
  return `${value}`
}

const StyledSlider = styled(Slider)({
  color: '#1DFFA4',
  height: 5,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 14,
    width: 14,
    backgroundColor: 'currenctColor',
    // border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-markLabel': {
    fontSize: 12,
    color: "white",
    top: "28px"
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 24,
    height: 24,
    borderRadius: '50% 50% 50% 0',
    // backgroundColor: '#52af77',
    // transformOrigin: 'bottom left',
    // transform: 'translate(50%, -100%) rotate(135deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      top: "40px",
      // top: "17px",
      // transform: 'translate(50%, -100%) rotate(135deg) scale(1)',
    },
    // '& > *': {
    //   transform: 'rotate(-135deg)',
    // },
  },
});

const styles: Styles = {
  box: {
    width: "200px",
    padding: "0 10px",
    height: "60px",
  }
}

export default function RangeSelector(props: {
  value: [number, number];
  onChange: Fn<[number, number], void>;
  max: number;
  min: number;
  name: string;
  elementsMaxHeight?: string;
}) {
  const {
    value,
    onChange,
  } = props
  const handleChange = (_: any, newValue: any, __: number) => {
    onChange(newValue)
  }
  const marks =
    [ { value: props.min, label: `${props.min}`}
    , { value: props.max, label: `${props.max}`}
    ]
  return (
    <Summary name={props.name} maxHeight="60px" flagNumber={(value[0] === props.min && value[1] === props.max) ? 0 : 1}>
      <Box style={styles.box}>
        <StyledSlider
          value={value}
          min={props.min}
          max={props.max}
          onChange={handleChange}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          marks={marks}
        />
      </Box>
    </Summary>
  )
}