import React, { createContext, useState } from 'react'

export const addServiceContextApi = createContext()
export const editServiceContextApi = createContext()

function ContextShare({children}) {
    const [addServiceRes,setAddServiceRes] = useState("")
    const [editServiceRes,setEditServiceRes] = useState("")
  return (
    <div>
        <addServiceContextApi.Provider value={{addServiceRes,setAddServiceRes}}>
          <editServiceContextApi.Provider value={{editServiceRes,setEditServiceRes}}>
          {children}
          </editServiceContextApi.Provider>
        </addServiceContextApi.Provider>
    
    </div>
  )
}

export default ContextShare