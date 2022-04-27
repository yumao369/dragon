import React from "react"

import { Avatar, Box, Divider, Stack } from "@mui/material"

import AppModal from "Components/Common/AppModal"
import { useModal, useSelectable } from "Common/Hooks"

import SelectedImage from "Assets/Images/MyDragonaire/selected.png"
import GradientButton from "Components/Common/GradientButton"
import { dragonIds } from "Constants/DragonConfig"
import { splitEvery } from "ramda"

const styles: Styles = {
  avatarItem: {
    position: "relative",
    width: "57px",
    height: "57px",
    cursor: "pointer"
  },
  selectedImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "57px",
    height: "57px",
  }
}

function AvatarItem (props: {
  selected: boolean;
  imgUrl: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div style={styles.avatarItem} onClick={props.onClick}>
      {props.selected
        ? (<img src={SelectedImage} style={{ width: "57px", height: "57px", ...styles.selectedImage}} alt="selected"/>)
        : (<></>)
      }
      <Avatar sx={{ width: "51px", height: "51px", border: "2px solid white", margin: "2px" }} src={props.imgUrl} />
    </div>
  )
}

export default function AvatarSettingModal (props: {
  width?: string;
  height?: string;
  visible: boolean;
  onClose: Callback;
}) {
  const { selectedIndex, select } = useSelectable(-1)
  const splited = splitEvery(5, dragonIds)

  return (
    <AppModal {...props} width="402px" height="434px">
      <Stack alignItems="start" style={{ padding: "25px 0px 0px 14px" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>Recommended Avatar</div>
        <Divider style={{ background: "#475D50", width: "331px", margin: "18px 0" }} />
        <Box className="scrollbar" style={{ height: "270px", width: "375px", marginBottom: "18px" }}>
          <Stack spacing="13px">
            {
              splited.map((x, i) => (
                <Stack direction="row" key={i} spacing="13px">
                  {x.map(dragonId => (
                    <AvatarItem 
                      key={dragonId} 
                      selected={dragonId === selectedIndex} 
                      onClick={() => select(dragonId)} 
                      imgUrl={process.env.PUBLIC_URL  + `/dragons/${dragonId}/${dragonId}_icon.png`}
                    />
                  ))}
                </Stack>
              ))
            }
          </Stack>
        </Box>
        <Stack justifyContent="center" style={{ paddingRight: "14px", width: "100%", }} direction="row">
          <GradientButton
            startColor="#3A7F53"
            endColor="#26663D"
            width="177px"
            height="40px"
          >Confirm</GradientButton>
        </Stack>
      </Stack>
    </AppModal>
  )
}