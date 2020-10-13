import React from 'react'
import mitt from 'mitt'

const { createContext, useContext, useEffect, useState } = React

interface tmpObj {
  children: any
}

export const BusContext: React.Context<any> = createContext(null)

export default function useBus() {
  return useContext(BusContext)
}

export const useListener = (name: string, func: Function) => {
  const bus = useBus()
  useEffect(() => {
    bus.on(name, func)
    return () => {
      bus.off(name, func)
    }
  }, [bus, name, func])
}


export const Provider = ({ children }: tmpObj) => {
  const [bus] = useState(() => mitt())
  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>
}