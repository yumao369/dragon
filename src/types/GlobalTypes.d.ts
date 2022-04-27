import Message from "Components/Common/Message";
import Dialog from 'Components/Common/Dialog'
import React from "react";
declare type ChainId = "1337";
declare global {
  interface Window {
    message: (typeof Message);
    dialog: (typeof Dialog);

    ethereum: any;
    mui: any;
  }

  type Address = string

  type Action = {
    type: string;
    data: any;
  }

  type Fn<a, b> = (_1: a) => b
  type Fn2<a, b, c> = (_1: a, _2: b) => c
  type Fn3<a, b, c, d> = (_1: a, _2: b, _3: c) => d
  type Fn4<a, b, c, d, e> = (_1: a, _2: b, _3: c, _4: d) => e

  type Callback = () => void
  type FnAction<T> = () => T

  type Address = string

  type Amount = string | number

  type Signautre = {
    v: string;
    r: string;
    s: string;
  }

  type Authentication = {
    token: string;
    qrtoken: string;
    address: string;
    sign: string;
    avatar: string;
    email: string;
    name: string;
    timestamp: number;
  }

  declare module '*.svg'
  declare module '*.png'
  declare module '*.jpg'
  declare module '*.jpeg'
  declare module '*.gif'
  declare module '*.bmp'
  declare module '*.tiff'

  type BaseResponse<T> = {
    code: number;
    data: T | null;
    msg: string;
  }

  type Styles = {[key: string]: React.CSSProperties}

  type StakePlanType = {
    id: number,
    state: number,
    duration: number,
    durationTitle: string, 
    multiplierDecimals: number,
    multiplier: number,
    multiplierScale: number,
  }

}

