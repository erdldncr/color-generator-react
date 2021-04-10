import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const[name,setName]=useState('')
  const [list,setList]=useState(JSON.parse(localStorage.getItem('items'))||[])
  const [isEditing, setIsEditing]=useState(false)
  const[editID,setEditID]=useState(null)
  const[alert,setAlert]=useState({show:false,msg:'',type:''})
  
  const setAlertFunction=(show=false,message='',type='')=>{
    setAlert({show:show,msg:message,type:type})
 
  }

  const handleSubmit=(e)=>{
      e.preventDefault()
      if(name===''){
        setAlertFunction(true,'please,don\' leave it blank','danger')
        }
       else if(name&&isEditing){
        setList(list.map(item=>{
          if(item.id===editID){
            item.name=name
          }
          return item
        }))
         setAlertFunction(true,'item edited','success')
         setIsEditing(false)
         setName('')
         setEditID(null)
         localStorage.setItem('items',JSON.stringify(list))
       }else{
        const newITem={name,id:new Date().getTime().toString()}
        setList([...list,newITem])
        setName('')
        setAlertFunction(true,'item added','success')
  
       localStorage.setItem('items',JSON.stringify([...list,newITem]))
       } 
      
  }
  const clearList=()=>{
    setAlertFunction(true,'list is empty','danger')
    setList([])
    localStorage.setItem('items',JSON.stringify([]))
  }
  const removeItem=(id)=>{
    let newList=list.filter(item=>item.id!==id)
    setList(newList)
    setAlertFunction(true,'item deleted','danger')
    localStorage.setItem('items',JSON.stringify(newList))
  }
  const editItem=(id)=>{
    setIsEditing(true)
    let personToEdit=list.filter(item=>item.id===id)[0]
    console.log(personToEdit)
    setEditID(personToEdit.id)
    setName(personToEdit.name)
  }
  
  // console.log()
  return <section className="section-center">
    <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show&& <Alert {...alert} list={list}setAlertFunction={setAlertFunction} /> }
        <h3>Grocery bud</h3>
        <div className="form-control">
        <input type="text"
        className='grocery'
        placeholder='e.g. eggs'
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        />
        <button className="submit-btn">{isEditing?`Edit`:'Submit'}</button>  
        </div>
    </form>
    {list.length>0&&
    <div className="grocery-container">
      <List list={list} editItem={editItem} removeItem={removeItem}  />
      <button className="clear-btn" onClick={clearList} >Clear Items</button>
    </div>
}
        </section>
}

export default App
