import React, { useEffect } from 'react'

const Alert = ({msg,type,setAlertFunction,list}) => {
  
   useEffect(()=>{
    setTimeout(()=>{
      setAlertFunction(false,'','')
    },3000)
   },[list])
  return <p className={'alert alert-'+type}>{msg}</p>
}

export default Alert
