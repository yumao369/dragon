import React from "react"
import { Stack } from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

import './Pagination.scss'

const styles: Styles = {
  arrow: {
    width: "37px",
    height: "25px",
    borderRadius: "3px",
    cursor: "pointer",
    margin: "0 11px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "transparent",
  },
  arrowIcon: {
    // color: "#3B4845",
  },
  input: {
    width: "40px",
    height: "25px",
    background: "#131E1C",
    border: "1px solid #46514F",
    borderRadius: "3px",
    color: "white",
    fontSize: "11px",
    textAlign: "center",
  }
}

export default function Pagination(props: {
  totalPage: number;
  page: number;
  onPrev: () => void;
  onNext: () => void;
  onChange: (page: number) => void;
}) {
  const {
    totalPage = 173,
    page = 1,
    onPrev,
    onNext,
    onChange,
  } = props

  const pageOnChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const pageStr = e?.target?.value ?? "1"
    const result = parseInt(pageStr)
    onChange(isNaN(result) ? 1 : result)
  }

  return (
    <Stack alignItems="center" justifyContent="center" direction="row" style={{color: "#46514F"}} spacing="6px">
      <button className="pagination-button" style={styles.arrow} onClick={onPrev} disabled={page <= 1}>
        <KeyboardArrowLeft style={styles.arrowIcon} />
      </button>
      <span>Page</span>
      <input className="pagination-input" style={styles.input} type="number" pattern="[1-9][0-9]*?" value={page} onChange={pageOnChange}/>
      <span> of {totalPage}</span>
      <button className="pagination-button" style={styles.arrow} onClick={onNext} disabled={totalPage <= 1}>
        <KeyboardArrowRight style={styles.arrowIcon} />
      </button>
    </Stack>
  )
}
