import React from 'react';


export default function Loading ({setLoading}){
 return(
     <div>
         <div>
             <img src='https://acegif.com/wp-content/uploads/loading-16.gif' alt=''/>
         </div>
         <div>
             {
                 setTimeout(() =>{
                     setLoading(false)
                 }, 5000)
             }
         </div>
     </div>
 )
}