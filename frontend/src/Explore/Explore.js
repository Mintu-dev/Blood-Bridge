import { useOutletContext } from "react-router-dom";
import Home from "./Home";

function Explore() {
  const { result } = useOutletContext();

  return <Home result={result} />;
}

export default Explore;