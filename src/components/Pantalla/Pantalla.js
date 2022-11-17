import { Textfit } from "react-textfit";
import "./Pantalla.css";

//value num screen, result value
const Pantalla = ({ value}) => {
  return (
    <Textfit className="pantalla" mode="single" max={100}>
      {value} 

    </Textfit>
    
  );
};

export default Pantalla;
