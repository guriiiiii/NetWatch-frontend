import React, { useEffect, useState } from 'react'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/lists/List';
import axios from "axios";

export default function Home({type}) {
  const[lists,setLists] = useState([]);
  const[genre,setGenre] = useState(null);

  useEffect(()=>{
    const getRandomLists = async () =>{
      try{
        if(type="new"){
          const res = await axios.get(`lists`,{
            headers:{
              token:
              "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
          setLists(res.data);
        }
        else{
          const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,{
            headers:{
              token:
              "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
          });
          setLists(res.data);
        }
      }
      catch(err){
        console.log(err);
      }
    };
    getRandomLists();
  },[type,genre]);

  return (
    <div className='home'>
        <Navbar/>
        <Featured type={type} setGenre={setGenre}/>
        {lists.map((list)=>(
          <List list={list}/>
        ))}
    </div>
  )
}
