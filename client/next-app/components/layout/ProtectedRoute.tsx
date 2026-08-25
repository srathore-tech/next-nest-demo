import React from "react"

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {


  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute