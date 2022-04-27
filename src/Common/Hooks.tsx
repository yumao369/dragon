import React, { useState } from 'react'
import { contains } from "Common/functions"
import BigNumber from 'bignumber.js'

export function useMuiSelect<T>(defaultValue: T) {
  const [value, setValue] = useState(defaultValue)
  const onChange = (event: any) => {
    setValue(event.target.value);
  }
  return {
    value,
    onChange
  }
}

export function useSelectable(defaultValue: number) {
  const [selectedIndex, setSelectedIndex] = useState(defaultValue)
  const select = (index: number) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1)
    } else {
      setSelectedIndex(index)
    }
  }
  return {
    selectedIndex,
    select
  }
}

export function useMultiSelectable(defaultValue: Array<number | string>) {
  const [selectedIds, setSelectedIds] = useState(defaultValue)
  const onClick = (id: number | string) => {
    if (contains(id, selectedIds)) {
      setSelectedIds(selectedIds.filter(x => x !== id))
    } else {
      setSelectedIds(selectedIds.concat(id))
    }
  }

  return {
    selectedIds,
    onClick
  }
}

export function useCounter(defaultValue = 0, min = 0, max = Number.MAX_VALUE) {
  const [count, setCount] = useState(Math.max(min, defaultValue))
  const inc = () => {
    if (count < max) {
      setCount(count + 1)
    }
  }
  const dec = () => {
    if (count > min) {
      setCount(count - 1)
    }
  }
  const onChange = (e: any) => {
    try {
      let newCount = parseInt(e?.target?.value ?? min)
      if (newCount > max) {
        newCount = max
      } else if (newCount < min) {
        newCount = min
      }
      setCount(newCount)
    } catch (e) {
      console.error(e)
    }
  }
  return {
    count,
    inc,
    dec,
    onChange
  }
}


export function useModal(defaultValue = false) {
  const [visible, setVisible] = useState(defaultValue)
  const show = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(!visible)
  }

  return {
    visible,
    show,
    onClose
  }
}

export function useMouseOver() {
  const [isOver, setOver] = useState(false)
  return {
    isOver,
    onMouseOver: () => setOver(true),
    onMouseLeave: () => setOver(false)
  }
}

export function useHover(timeMs = 500) {
  let [show, setShow] = useState(false)
  let timeout: any = null
  const onPointerEnter = () => {
    if (timeout) {
      clearInterval(timeout)
    }
    timeout = setTimeout(() => setShow(true), timeMs)
  }

  const onPointerLeave = () => {
    if (timeout) {
      clearInterval(timeout)
    }
    timeout = null
    setShow(false)
  }

  return {
    show,
    onPointerEnter,
    onPointerLeave
  }
}

export function useInput(defaultValue = "", validator = (oldValue: string, newValue: string) => newValue) {
  const [value, setVal] = useState(defaultValue)
  const onChange = (e: any) => {
    var newVal = validator(value, e?.target?.value ?? "")
    if (newVal !== value) {
      setVal(newVal)
    }
  }

  return {
    value, onChange
  }
}

export function useTokenAmountInput(defaultvalue: string, max: number) {
  const realBN = new BigNumber(max)

  return useInput(defaultvalue, (_, newVal) => {
    if (newVal === '') {
      return '0'
    }
    const newBN = new BigNumber(newVal)
    if (newBN.gt(realBN)) {
      return String(max)
    } else if (newBN.lt(0)) {
      return '0'
    } else {
      return newVal
    }
  })
}