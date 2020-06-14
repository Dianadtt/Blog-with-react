import React from 'react'

export function Filter(props){
 return(
     <div>
         <label htmlFor="search">Search by title</label>
         <input type="text" value={props.inputValue} onChange={props.filterTitle}/>
     </div>
 )
}