export default class Optional<a> {
  private constructor(
    private _val: a | null,
    private _valid: boolean
  ) {}

  public static None<a>() {
    return new Optional<a>(null, false)
  }

  public static Some<a>(val: a) {
    return new Optional<a>(val, true)
  }

  get valid() {
    return this._valid
  }

  map<b>(f: Fn<a, b>): Optional<b> {
    if (this.valid) {
      return Optional.Some(f(this._val as a))
    } else {
      return Optional.None()
    }
  }  
  
  flatMap<b>(f: Fn<a, Optional<b>>): Optional<b> {
    if (this.valid) {
      return f(this._val as a)
    } else {
      return Optional.None()
    }
  }

  getOrElse(val: a): a {
    return this.valid ? (this._val as a) : val
  }

  bind<b>(ifSome: Fn<a, b>, ifNone: () => b): b {
    if (this.valid) {
      return ifSome(this._val as a)
    } else {
      return ifNone()
    }
  }


  // errMsg 
  private errMsg = ""

  setErrMsg(errMsg: string) {
    this.errMsg = errMsg
  }
  
  error(errMsg = ""): a {
    if (errMsg.length === 0) {
      errMsg = this.errMsg
    }
    if (this.valid) {
      return this._val as a
    } else {
      throw new Error(errMsg)
    }
  }

}