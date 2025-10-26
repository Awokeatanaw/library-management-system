import axios from 'axios'
import React, { useEffect, useState } from 'react'

 function Traying() {
    const [books,setbooks]=useState([])
    useEffect(()=>{axios.get("http://localhost:8000/library/books/")
                    .then((response)=>{
                        setbooks(response.data);
                    })
    }
,[])
  return (
    <div>
      <div className='ml-96 grid grid-cols-3 gap-2'>
      {books.map((book)=>(
        <div className='bg-slate-600 text-white mt-2 w-20'>
       <p key={book.book_id}>{book.title}</p>
       <p>{book.author}</p>
       </div>
      ))}
      </div>
      <div class="relative h-60 w-full">
  <div class="absolute inset-0 bg-gradient-animation"></div>
  <div class="relative z-10 flex justify-center items-center h-full text-white">
    <h1 class="text-4xl">Welcome to My Portfolio</h1>
    <h2 className='text-3xl'>this also econd header</h2>
  </div>
</div>
    </div>
  )
}
export default Traying
