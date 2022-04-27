import { takeLast } from "ramda"

export const dragonIds = [
  1101, 1102, 

  1008, 1011, 1012, 1015, 1016, 1017, 1018,
  1019, 1020, 1021, 1022, 1023, 1024, 1025,
  1026, 1027, 1028, 1029, 1030, 1031, 1032,
  1033, 1034, 1035, 1036, 1037, 1038, 1039,
  1040, 1041, 1042, 1043, 1045, 1046, 1047,
  1051, 1053, 1055, 1057, 1058, 1059, 1060,

  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2009, 2013,
]

export const gameId = 1

export const dragonAmount = 53

export const MYSTERYBOX_SERVER_WALLET = "0xC50A949A6136F25a7640252C4f32101dd05A9589"

export function getCharacter(cfgId: string | number, characterId: string | number) {
  return process.env.PUBLIC_URL + `/dragons/${cfgId}/${characterId}.png`
}

export function getCharacterByImageUrl(imageUrl: string) {
  return `${process.env.PUBLIC_URL}/dragons/${imageUrl}`
}


export function parseBoxType(artifact: string) {
  return parseInt(`0x${takeLast(2, parseInt(artifact).toString(16))}`)
}

export const qualityConfigItems = [
  { id: 3, name: "Epic", color: "#e54dee"},
  { id: 4, name: "Legendary", color: "#eb9840"},
  { id: 5, name: "Genesis", color: "#ed3b3b"},
]

export const boxTypeToPercents = {
  "1": [0.8, 0.2, 0],
  "2": [0, 1.0, 0],
  "3": [0, 0.99, 0.01]
}