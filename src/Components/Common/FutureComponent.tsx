import React, { useEffect, useState } from 'react'

export function FutureComponent<T>(props: {
  promise: Promise<T>,
  render: (props: any) => JSX.Element,
  params: any,
}) {
  const [state, setState] = useState({})
  useEffect(() => {
    (async () => {
      const d = await props.promise
      setState(d)
    })()
  })

  return props.render({...state, ...props.params})
}