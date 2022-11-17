import React, { useState } from "react"
import Pantalla from "./components/Pantalla/Pantalla"
import Botonescaja from "./components/botonesCaja/Botonescaja";
import Botones from "./components/Botones/Botones";
import FormaBase from "./components/formaBase/formaBase";

const App = () => {
  const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];
const toLocaleString = (num) =>
String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const eliminarEspacios = (num) => num.toString().replace(/\s/g, "");

let [calc, setCalc] = useState({
sign: "",
num: 0,
res: 0,
});

const Clicarnumero = (e) => {
e.preventDefault();
const value = e.target.innerHTML;

if (eliminarEspacios(calc.num).length < 100) {
  setCalc({
    ...calc,
    num:
      calc.num === 0 && value === "0"
        ? "0"
        : eliminarEspacios(calc.num) % 1 === 0
        ? toLocaleString(Number(eliminarEspacios(calc.num + value)))
        : toLocaleString(calc.num + value),
    res: !calc.sign ? 0 : calc.res,
  });
}
};

const Comma = (e) => {
e.preventDefault();
const value = e.target.innerHTML;

setCalc({
  ...calc,
  num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
});
};

const Clicarsigno = (e) => {
e.preventDefault();
const value = e.target.innerHTML;

setCalc({
  ...calc,
  sign: value,
  res: !calc.res && calc.num ? calc.num : calc.res,
  num: 0,
});
};

const Comparar = () => {
if (calc.sign && calc.num) {
  const math = (a, b, sign) =>
    sign === "+"
      ? a + b
      : sign === "-" 
      ? a-b
      : sign === "X"
      ? a * b
      : a / b;


  setCalc({
    ...calc,
    res:
      calc.num === "0" && calc.sign === "/"
        ? "No se puede dividir por 0"
        : toLocaleString(
            math(
              Number(eliminarEspacios(calc.res)),
              Number(eliminarEspacios(calc.num)),
              calc.sign
            )
          ),
    sign: "",
    num: 0,
  });
}
};

const Invertir = () => {
setCalc({
  ...calc,
  num: calc.num ? toLocaleString(eliminarEspacios(calc.num) * -1) : 0,
  res: calc.res ? toLocaleString(eliminarEspacios(calc.res) * -1) : 0,
  sign: "",
});
};

const Calcularporcentaje = () => {
let num = calc.num ? parseFloat(eliminarEspacios(calc.num)) : 0;
let res = calc.res ? parseFloat(eliminarEspacios(calc.res)) : 0;

setCalc({
  ...calc,
  num: (num /= Math.pow(100, 1)),
  res: (res /= Math.pow(100, 1)),
  sign: "",
});
};

const Resetear = () => {
setCalc({
  ...calc,
  sign: "",
  num: 0,
  res: 0,
});
};
  return (
    <FormaBase>
      <Pantalla value={calc.num ? calc.num : calc.res} />
      <Botonescaja>
        {btnValues.flat().map((btn, i) => {
              return (
                <Botones
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                    btn === "C"
                      ? Resetear
                      : btn === "+-"
                      ? Invertir
                      : btn === "%"
                      ? Calcularporcentaje 
                      : btn === "="
                      ? Comparar
                      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                      ? Clicarsigno
                      : btn === "."
                      ? Comma
                      : Clicarnumero
                  }
                />
              )}
        )}
      </Botonescaja>
    </FormaBase>
  );
};

export default App;

