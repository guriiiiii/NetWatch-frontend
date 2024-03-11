import React, { useEffect, useState } from "react";
import "./listitem.scss";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(()=>{
    const getMovie = async()=>{
      try{
        const res = await axios.get("/movies/find/"+item,{
          headers:{
            token:"Bearer " +JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getMovie();
  },[item])

  return (
    <Link to={{pathname:"/watch"}} state={{movie:movie}}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={movie?.imgSm}
          alt=""
        />
        {isHovered && (
          <>
            <video src={movie?.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="iconsL">
                <PlayArrowIcon className="iconL"/>
                <AddIcon className="iconL"/>
                <ThumbUpIcon className="iconL"/>
                <ThumbDownIcon className="iconL"/>
              </div>
              <div className="itemInfoTop">
                <span>{movie?.duration}</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">
                {movie?.desc}
              </div>
              <div className="genre">{movie?.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
