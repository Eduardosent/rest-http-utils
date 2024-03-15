import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { motion } from 'framer-motion'

export const Home = () => {

  const[initPosts,setInitPosts] = useState([]);
  const[posts,setPosts] = useState([])

  const[currentPage,setCurrentPage] = useState(1)
  const[pagination,setPagination] = useState(10)

  function generateButtons(){
    var temparray = []
    const length = calcPages(posts.length,pagination);
    for(var i=1;i<=length;i++){
      temparray = [...temparray,i]
    }
    return temparray
  }

  async function getPosts(){
    await fetch('https://jsonplaceholder.typicode.com/posts').then(data=>data.json())
    .then((res)=>{console.log(res);setInitPosts(res);setPosts(res);paginator(10);setPaginateButtons(generateButtons())})
  }
  function paginator(paginate){
    setCurrentPage(1)
    setPagination(paginate)
    calcPages(posts.length,paginate);
  }
  function calcPages(length,pagination){
    var pages = length/pagination;
    length%pagination>0 && pages++;
    return pages;
  }

  useEffect(()=>{
    getPosts()
  },[])

  console.log(generateButtons())

  return (
    <div>
      {
        <div>
          <p>paginacion</p>
          <select name="" id="" value={pagination} onChange={(e)=>paginator(e.target.value)}>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <div className='flex justify-center gap-4'>
          {
            currentPage>1&&
            <button className='' onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
          }
          <button className=''>{currentPage}</button>
          {
            currentPage<calcPages(posts.length,pagination)&&
            <button className='' onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
          }
          </div>
        </div>
      }
      {      
        posts.map((post,i)=>(
          <div key={i} className={i > pagination*currentPage-pagination-1&&i < pagination*currentPage ? 'flex' : 'hidden'}>
            <h3>{post.title}</h3>
            <h5>{post.body}</h5>
            <p>{post.userId}</p>
            <p>{i}</p>
          </div>
        ))
      }
        <div className='text-center mb-2'>Soy el Home</div>
        <Form titled={'title'} bodyd={'body'} useridd={'2'} put={true}/>
        <Form/>
        <motion.div className='mt-40' animate={{translateX:0}} initial={{translateX:500}} transition={{duration:10,repeatType:Infinity}}>
            <h1 className=''>Welcome</h1>
            <h2 className='mt-40'>Welcome2</h2>
            <h2 className='mt-40'>Welcome2</h2>
            <h2 className='mt-40'>Welcome2</h2>
            <h2 className='mt-40'>Welcome2</h2>
        </motion.div>
        
    </div>
  )
}
