export default class ExpireData<T> {
  _last: number = 0
  _timeSpan: number = 0

  constructor(private _data: T | null,  timeSpan: number) {
    this._last = Date.now()
    this._timeSpan = timeSpan * 1000
  }

  getData(): ["Ok", T] | ["Expired", T] | ["Empty"] {
    if (this._data === null) {
      return ['Empty']
    } else if (Date.now() > this._last + this._timeSpan) {
      return ['Expired', this._data]
    } else {
      return ['Ok', this._data]
    }
  }

  setData(data: T) {
    this._data = data
    this._last = Date.now()
  }

  clearData() {
    this._data = null
  }
}