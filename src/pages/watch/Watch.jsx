import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./watch.scss";
import { Link, useLocation } from 'react-router-dom';

export default function Watch() {

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