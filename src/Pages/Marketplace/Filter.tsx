import React from 'react'

import { connect } from "react-redux"

import {
  CLEAR_ALL,
  MARKETPLATE_LOAD,
  SET_CLASSTYPE,
  SET_ELEMENT,
  SET_FARMPOWER,
  SET_PARITY,
  SET_STARRANGE,
  SET_LEVELRANGE,
  SET_BREEDRANGE,
  SET_DERANGE,
  SET_PRICERANGE,
  SET_SEARCHID,
  SET_SORTTYPE
} from "Constants/ActionTypes"

import ElementClassSelector from "Components/Marketplace/ElementClassSelector"
import ParitySelector from "Components/Marketplace/ParitySelector"
import FarmPowerSelector from "Components/Marketplace/FarmPowerSelector"
import RangeSelector from "Components/Marketplace/RangeSelector"
import PriceInput from "Components/Marketplace/PriceInput"

import WaterIcon from "Assets/Images/Marketplace/Elements/water.png"
import EarthIcon from "Assets/Images/Marketplace/Elements/earth.png"
import LightIcon from "Assets/Images/Marketplace/Elements/light.png"
import DarkIcon from "Assets/Images/Marketplace/Elements/dark.png"
import FireIcon from "Assets/Images/Marketplace/Elements/fire.png"
import WindIcon from "Assets/Images/Marketplace/Elements/wind.png"
import EtherealIcon from "Assets/Images/Marketplace/Elements/ethereal.png"

import MagicIcon from "Assets/Images/Marketplace/Classes/magic.png"
import MercyIcon from "Assets/Images/Marketplace/Classes/mercy.png"
import AgilityIcon from "Assets/Images/Marketplace/Classes/agility.png"
import StrengthIcon from "Assets/Images/Marketplace/Classes/strength.png"

const styles: Styles = {
  root: {
    paddingTop: "20px",
    width: "200px",
    display: "flex",
    flexDirection: "column",
    color: "white"
  },
  clearAllDiv: {
    height: "36px",
    width: "200px",
    display: "flex",
    alignItems: "space-between",
    fontSize: "12px",
  },
  clearAllText: {
    color: "#27D5FF",
    marginLeft: "auto",
    cursor: "pointer"
  },
  button: {
    width: "96px",
    height: "27px",
    borderRadius: "3px",
    fontSize: "14px",
    color: "white",
    border: "none",
    backgroundColor: "#3E8959",
    padding: "0",
    marginTop: "10px",
    lineHeight: "27px",
    textAlign: "center",
  }

}

const mapStateToProps = (store: any) => ({
  filter: store.MarketplaceFilter,
})

// @ts-ignore
const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch({ type: MARKETPLATE_LOAD }),
  clearAll: () => dispatch({ type: CLEAR_ALL }),
  // @ts-ignore
  setElement: element => dispatch({ type: SET_ELEMENT, data: { element } }),
  // @ts-ignore
  setClassType: classType => dispatch({ type: SET_CLASSTYPE, data: { classType } }),
  // @ts-ignore
  setParity: parity => dispatch({ type: SET_PARITY, data: { parity } }),
  // @ts-ignore
  setFarmPower: farmPower => dispatch({ type: SET_FARMPOWER, data: { farmPower } }),
  // @ts-ignore
  setStarRange: starRange => dispatch({ type: SET_STARRANGE, data: { starRange } }),
  // @ts-ignore
  setLevelRange: levelRange => dispatch({ type: SET_LEVELRANGE, data: { levelRange } }),
  // @ts-ignore
  setBreedRange: breedRange => dispatch({ type: SET_BREEDRANGE, data: { breedRange } }),
  // @ts-ignore
  setDeRange: deRange => dispatch({ type: SET_DERANGE, data: { deRange } }),
  // @ts-ignore
  setPriceRange: priceRange => dispatch({ type: SET_PRICERANGE, data: { priceRange } }),
  // @ts-ignore
  setSearchId: searchId => dispatch({ type: SET_SEARCHID, data: { searchId } }),
  // @ts-ignore
  setSortType: sortType => dispatch({ type: SET_SORTTYPE, data: { sortType } }),
})

class Filter extends React.Component<any> {
  elements =
    [{ imageSrc: WaterIcon, name: "Water", value: 2 }
      , { imageSrc: FireIcon, name: "Fire", value: 3 }
      , { imageSrc: WindIcon, name: "Wind", value: 4 }
      , { imageSrc: EarthIcon, name: "Earth", value: 1 }
      , { imageSrc: LightIcon, name: "Light", value: 5 }
      , { imageSrc: DarkIcon, name: "Dark", value: 6 }
      , { imageSrc: EtherealIcon, name: "Ethereal", value: 7 }
    ]

  classes =
    [{ imageSrc: MercyIcon, name: "Mercy", value: 4 }
      , { imageSrc: AgilityIcon, name: "Agility", value: 2 }
      , { imageSrc: MagicIcon, name: "Magic", value: 3 }
      , { imageSrc: StrengthIcon, name: "Strength", value: 1 }
    ]

  componentDidMount () {
    this.props.onLoad()
    console.log(this.props)
  }


  render () {
    return (
      <div style={styles.root}>
        <div style={styles.clearAllDiv}>
          <span>FILTERS</span>
          <span style={styles.clearAllText} onClick={this.props.clearAll}>CLEAR ALL</span>
        </div>

        <ElementClassSelector
          options={this.elements}
          value={this.props.filter.element}
          onChange={this.props.setElement}
          name="ELEMENT"
          elementsMaxHeight="158px"
        />

        <ElementClassSelector
          name="CLASS"
          options={this.classes}
          value={this.props.filter.classType}
          onChange={this.props.setClassType}
          iconStyle={{
            width: "28px",
            height: "28px",
            marginLeft: "4px",
            marginRight: "4px"
          }}
          elementsMaxHeight="84px"
        />

        <ParitySelector value={this.props.filter.parity} onChange={this.props.setParity} />

        <FarmPowerSelector value={this.props.filter.farmPower} onChange={this.props.setFarmPower} />

        <RangeSelector
          name="STAR"
          min={3}
          max={15}
          value={this.props.filter.starRange}
          onChange={this.props.setStarRange}
        />

        <RangeSelector
          name="LEVEL"
          min={1}
          max={260}
          value={this.props.filter.levelRange}
          onChange={this.props.setLevelRange}
        />

        <RangeSelector
          name="BREED COUNT"
          min={0}
          max={3}
          value={this.props.filter.breedRange}
          onChange={this.props.setBreedRange}
        />

        <RangeSelector
          name="DE"
          min={0}
          max={20480}
          value={this.props.filter.deRange}
          onChange={this.props.setDeRange}
        />

        <PriceInput 
          value={this.props.filter.priceRange}
          onChange={this.props.setPriceRange}
        />

        <button style={styles.button} onClick={this.props.onApply}>APPLY</button>
        <div style={{ minHeight: "150px" }} />
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Filter)