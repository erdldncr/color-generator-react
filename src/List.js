import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({list,removeItem,editItem}) => {
 
  

  return  <div className="grocery-lis">
    {list.map((item,index)=>{
    return  <article className="grocery-item" key={item.id}>
      <p>{item.name}</p>
      <div className="btn-container">
        <button className='edit-btn' onClick={()=>{editItem(item.id)}} > <FaEdit/> </button >
        <button onClick={()=>{removeItem(item.id)}} className='delete-btn' > <FaTrash/> </button>
      </div>
    </article>
    })}
  </div>
}

export default List
