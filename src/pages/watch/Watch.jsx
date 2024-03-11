import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./watch.scss";
import axios from 'axios';

import UNCHARTED from "./UNCHARTED.mp4"
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Watch() {
  const [picture, setPicture] = useState({});

  useEffect(()=>{
    const getMovie = async()=>{
      try{
        const res = await axios.get("/movies/find/",{
          headers:{
            token:
            "Bearer " +JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setPicture(res.data);
      }catch(err){
        console.log(err)
      }
    };
    getMovie();
  },[])
  const location = useLocation();
  console.log(location)
  const movie = location.state.movie;
  return (
    <div className="watch">
      <Link to ="/">
        <div className="back">
          <ArrowBackIcon />
          <span>Home</span>
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={movie.video}
      />
    </div>
  );
}