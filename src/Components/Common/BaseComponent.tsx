import React, { Component } from "react";

export default abstract class BaseComponent<P = {}, S = {}, SS = any> extends Component<P, S, SS> {
  protected _isMounted = false

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  safeSetState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void {
    if (this._isMounted) {
      this.setState(state, callback)
    }
  }

  update<K extends keyof S>(
    updater: {[P in K]?: Fn<S[P], S[P]>},
    callback?: () => void
  ) {
    if (this._isMounted) {
      const s: Pick<S, K> = {} as any;
      for (const key in updater) {
        const f = updater[key] as Fn<any, any>
        const oldVal = s[key]
        s[key] = f(oldVal)
      }
      this.setState(s, callback)
    }
  }
}