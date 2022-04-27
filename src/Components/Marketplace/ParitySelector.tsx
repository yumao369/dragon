import React from 'react'

import Summary from "./Summary"
import ParityOption from './ParityOption'
import { contains } from 'Common/functions'

const styles: Styles = {
  parities: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "10px",
  }
}

export default function ParitySelector(props: {
  value: number[];
  onChange: Fn<number, void>;
}) {
  const {
    value,
    onChange
  } = props

  const parties = 
    [ { color: "#E54DEE", parity: "Epic", value: 3 }
    , { color: "#EB9840", parity: "Legendary", value: 4 }
    , { color: "#ED3B3B", parity: "Genesis", value: 5 }
    ]
  
  return (
    <Summary name="PARITY" maxHeight="64px" flagNumber={parties.filter(x => contains(x.value, value)).length}>
      <div style={styles.parities}>
        { parties.map(p => 
            <ParityOption 
              key={p.parity}
              onClick={() => onChange(p.value)}
              selected={contains(p.value, value)}
              {...p} 
            />
          )
        }
      </div>
    </Summary>
  )
    

}
