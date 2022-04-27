import React from "react"
import { Box, Stack } from "@mui/material"
import { splitEvery } from "ramda"

const styles: Styles = {
  heroItem: {
    width: "46px",
    height: "46px",
  },
  availableHeros: {
    width: "414px",
    height: "394px",
    borderRadius: "4px",
    background: "#303C39",
    padding: "28px 7px 37px 27px",
  },
  title: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  },
  heroList: {
    marginTop: "18px",
    height: "310px",
    width: "370px",
    overflow: "auto",
  }
}

export default function AvailableHeros (props: {
  dragonIds: number[]
}) {
  const listOfArr = splitEvery(6, props.dragonIds)
  return (
    <Box style={styles.availableHeros}>
      <Stack>
        <div style={styles.title}>Avaiable Heros: {props.dragonIds.length}</div>
        <div style={styles.heroList} className="scrollbar">
          <Stack spacing="10px">
            {
              listOfArr.map((arr, index) => (
                <Stack key={index} direction="row" spacing="10px">
                  {arr.map(dragonId => (
                    <img 
                      key={dragonId}
                      src={process.env.PUBLIC_URL  + `/dragons/${dragonId}/${dragonId}_icon.png`}
                      style={styles.heroItem} 
                      alt="hero icon"
                    />
                  ))}
                </Stack>
              ))
            }
          </Stack>
        </div>
      </Stack>
    </Box>
  )
}