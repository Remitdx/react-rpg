import { createContext, useState } from "react";

export const MutedContext = createContext({
  muted: true,
  toggleMuted: ()=>{}
})

export function MutedContextProvider ({children}) {
  const [muted, setMuted] = useState(true)
  const toggleMuted = () => {
    setMuted(!muted)
  }

  return <MutedContext.Provider value={{
    muted,
    toggleMuted
  }}>
    {children}
  </MutedContext.Provider>
}
