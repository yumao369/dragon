type Language
  = "en-US"
  | "zh-CN"

type StoredData = {
  language: Language;
  authentication: Authentication
}

let data: StoredData = {
  language: "en-US",
  authentication: {
    token: '',
    qrtoken: '',
    address: '',
    sign: '',
    avatar: '',
    email: '',
    name: '',
    timestamp: Date.now(),
  }
}

Object.keys(data).forEach(key => {
  const stored = localStorage.getItem(key)
  if (stored) {
    (data as any)[key] = Boolean(stored) ? JSON.parse(stored) : {} 
  }
})

export function setData<T extends keyof StoredData>(key: T, value: StoredData[T]) {
  data[key] = value
  localStorage.setItem(key, JSON.stringify(value))
}

 export function removeData(key: keyof StoredData) {
  localStorage.removeItem(key);
  (data as any)[key] = {}
}


export function getData<T extends keyof StoredData>(key: T ): StoredData[T] {
  return data[key]
}
