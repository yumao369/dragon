import * as R from 'ramda'

export function id<T>(x: T) {
  return x
}

export function deepClone(x: any) {
  return JSON.parse(JSON.stringify(x))
}

/**
 * 是否包含
 */
export function contains<T>(target: T, arr: T[]) {
  if (!arr || !Array.isArray(arr)) {
    return false
  }
  for (let x of arr) {
    if (target === x) {
      return true
    }
  }
  return false
}


/**
 * 输入`150469`, 输出`150,469`
 */
export function formatNumber(n: number) {
  let str = n.toFixed(4).replace(/0*?$/g, '').replace(/\.$/g, "")
  const [a, b] = str.split('.')
  const rest = Boolean(b) ? `.${b}` : ''
  return R.splitEvery(3, R.reverse(a)).reverse().map(R.reverse).join(',') + rest
}

export function formatWei(num: number) {
  const m = num / 1e18
  if (m > 1e6) {
    return (m / 1e6).toFixed(2) + 'M'
  } else if (m > 1e3) {
    return (m / 1e3).toFixed(2) + 'K'
  } else {
    return m.toFixed(2)
  }
}

class SwitchExpr<T> {
  shot = false
  targetObj: T | null = null
  val = null

  constructor (obj: T) {
    this.targetObj = obj
  }

  caseIs(caseKey: T, caseValue: any) {
    if (!this.shot && caseKey === this.targetObj) {
      this.val = caseValue
      this.shot = true
    }
    return this
  }


  defaultAs(defaultValue: any): any {
    return this.shot ? this.val : defaultValue
  }
}

export function switchExpr<T>(obj: T) {
  return new SwitchExpr(obj)
}


export function randInt (start: number, end: number) {
  const delta = end - start;
  return Math.floor(Math.random() * delta) + start
}




export function ifSameThenDefault<T>(newValue: T, oldValue: T, defaultValue: T) {
  return newValue === oldValue ? defaultValue : newValue
}

export function ifContainThenRemove<T>(elm: T, arr: T[]) {
  if (contains(elm, arr)) {
    return arr.filter(x => x !== elm)
  } else {
    return arr.concat(elm)
  }
}

export function upperFirst(word = "") {
  if (word.length > 0) {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
  } else {
    return word
  }
}


export async function askPermission () {
  const result = await navigator.permissions.query({ name: 'clipboard-write' as any });
  if (result.state === 'granted') {
    return true
  } else {
    window.message.warn("You need to grant the permission to copy")
    return false
  }
}

export function writeToClipboard (text: string, parent = document.body) {
  const aux = document.createElement("input");
  aux.setAttribute("value", text);
  parent.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  parent.removeChild(aux);
}

export function randomOne<T>(arr: T[]): T | null {
  if (arr.length === 0) {
    return null
  } else {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}