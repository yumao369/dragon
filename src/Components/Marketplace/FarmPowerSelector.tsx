import React from 'react'

import { contains } from 'Common/functions'
import { useMultiSelectable } from "Common/Hooks"
import Summary from "./Summary"
import FarmPowerOption from './FarmPowerOption'

import SSIcon from "Assets/Images/Marketplace/Power/ss.png"
import SIcon from "Assets/Images/Marketplace/Power/s.png"
import AIcon from "Assets/Images/Marketplace/Power/a.png"
import BIcon from "Assets/Images/Marketplace/Power/b.png"
import CIcon from "Assets/Images/Marketplace/Power/c.png"
import DIcon from "Assets/Images/Marketplace/Power/d.png"

const styles: Styles = {
  parities: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px",
  }
}

export default function FarmPowerSelector(props: {
  value: string[];
  onChange: Fn<string, void>;
}) {
  const {
    value,
    onChange
  } = props
  const powers = [ 
    { icon: SSIcon, power: "SS" },
    { icon: SIcon, power: "S" },
    { icon: AIcon, power: "A" }, 
    { icon: BIcon, power: "B" },
    { icon: CIcon, power: "C" },
    { icon: DIcon, power: "D" }
  ]
  
  return (
    <Summary name="FARM POWER" maxHeight="64px" flagNumber={powers.filter(x => contains(x.power, value)).length}>
      <div style={styles.parities}>
        { powers.map(power => 
            <FarmPowerOption 
              key={power.power}
              onClick={() => onChange(power.power)}
              selected={contains(power.power, value)}
              icon={power.icon} 
            />
          )
        }
      </div>
    </Summary>
  )
}
