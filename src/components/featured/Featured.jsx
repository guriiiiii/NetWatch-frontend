import React from "react";
import "./featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Featured({type, setGenre}) {
  const [content,setContent]=useState({});

  useEffect(()=>{
    const getRandomContent = async()=>{
      try{
        if(type="new"){
          const res = await axios.get(`/movies/random`,{
            headers:{
              token:
                "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
          setContent(res.data[0]);
        }
        else{
          const res = await axios.get(`/movies/random?type=${type}`,{
            headers:{
              token:
                "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken,
            },
          })
          setContent(res.data[0]);
        }
      }catch(err){
        console.log(err)
      }
    }
    getRandomContent();
  },[type])
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : type === "series" ? "Series" : "New & Popular"}</span>
          <select name="genre" id="genre" onChange={e=>setGenre(e.target.value)}>
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
        <img
          src={content.imgTitle}
          alt=""
        />

        <span className="desc">
          {content.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <Link to={{pathname:"/watch"}} state={{movie:content}} style={{ 'textDecoration': 'none', 'color':"black"}}><span>Play</span></Link>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
