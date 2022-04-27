import React from "react"
import { Stack, MenuItem } from "@mui/material"
import Search from "./Search"
import StyledSelect, {MenuProps} from "Components/Common/StyledSelect"
import { SET_PAGE, SET_SEARCHID, SET_SORTTYPE } from "Constants/ActionTypes"
import { connect } from "react-redux"
import { useInput } from "Common/Hooks"

const options = [ "Latest Sale", "Oldest Sale", "Lowest Sale", "Highest Sale" ]

function SearchAndSort (props: {
  filter: any;
  setSortType: Fn<string, void>;
  refresh: () => void;
  setSearchId: Fn<string, void>;
}) {
  const {value, onChange} = useInput(props?.filter?.searchId ?? "")
  const selectOnChange = (e: any) => {
    props.setSortType(e?.target?.value ?? options[0])
    props.refresh()
  }
  const onSearch = () => {
    props.setSearchId(value)
    props.refresh()
  }
  return (
    <Stack direction="row" spacing="18px">
      <Search value={value} onChange={onChange} onSearch={onSearch}/>
      <StyledSelect 
        style={{ width: "187px", height: "37px" }} 
        value={props.filter.sortType} 
        onChange={selectOnChange}
        MenuProps={MenuProps}
      >
        {options.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>)}
      </StyledSelect>
    </Stack>
  )
}

// @ts-ignore
export default connect(store => ({filter: store.MarketplaceFilter}), dispatch => ({
  // @ts-ignore
  setSearchId: searchId => {
     dispatch({type: SET_SEARCHID, data: {searchId}})
     dispatch({type: SET_PAGE, data: {page : 1}})
  },
  // @ts-ignore
  setSortType: sortType => dispatch({type: SET_SORTTYPE, data: {sortType}}),
}))(SearchAndSort)