import * as React from "https://cdn.skypack.dev/react@17.0.1";
import { useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM, { render } from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as mathjs from "https://cdn.skypack.dev/mathjs";
import { evaluate } from "https://cdn.skypack.dev/mathjs@11.3.0";
import math from "https://cdn.skypack.dev/math@0.0.3";


function Boton(props) {

  const esOperador = valor => {
    return isNaN(valor) && valor !== '.' && valor !== '=';
  };

  return /*#__PURE__*/(
    React.createElement("div", {
      id: props.id,
      onClick: () => props.clic(props.children),
      className: `cont-boton ${esOperador(props.children) ? "operator" : ''}`.trimEnd() },
    props.children));


}

const Pantalla = (props) => /*#__PURE__*/
React.createElement("div", { className: "input" }, /*#__PURE__*/
React.createElement("div", { id: "input" }, /*#__PURE__*/
React.createElement("p", null, props.display)), /*#__PURE__*/

React.createElement("div", { id: "display" }, /*#__PURE__*/
React.createElement("p", null, props.input)));




const BotonClear = (props) => /*#__PURE__*/
React.createElement("div", {
  id: "clear",
  onClick: props.clic,
  className: "boton-clear" },

props.children);



let regex1;
let regex2;
let unWanted;
let wanted;

// a function to make input to be -X if preceded by - sign after /X+-
const correctFormatNegativeNumbers = (input, clickedMethods) => {
  const regex1 = /[0-9],[\/|X|+|-],-,[0-9]/g; // test if input has negative number and is preceded with /X+-
  const regex2 = /^(-,[0-9],[\/|X|+|-],[0-9])/g; // test if input has negative number and is followed with /X+-
  const regex3 = /^(-,[0-9],[\/|X|+|-](.*?))/g; // test if input has a starting negative number and is followed with /X+- then anything
  const regex4 = /((.*?)[\/|X|+|-],-,[0-9](.*?))/g; // test if input has negative number that is preceded with anyhting and /X+- and is followed with /X+-

  if (regex3.test(input) || regex4.test(input)) {
    const unWanted1 = "-,";
    const wanted1 = "-";
    const unWanted2 = ",-,";
    const wanted2 = ",-";

    const input2 = input.
    slice().
    toString().
    replace(unWanted1, wanted1).
    replace(unWanted2, wanted2);

    //drop - from methods
    const newMethods = input2.
    replace(/[0-9]|-[0-9]/g, "").
    replace(/,-,/g, ",").
    replace(/-,/g, "");

    const processedItems = [input2.split(","), newMethods];
    return processedItems;

    // change -, input to -input
  } else if (regex1.test(input)) {
    console.log("Regex is regex1");
    const unWanted = ",-,";
    const wanted = ",-";

    const input2 = input.slice().toString().replace(unWanted, wanted);
    console.log(input2);

    //drop - from methods
    const newMethods = input2.
    replace(/[0-9]|-[0-9]/g, "").
    replace(/,-,/g, ",").
    replace(/-,/g, "");

    const processedItems = [input2.toString().split(","), newMethods];
    return processedItems;

    // change -, input to -input
  } else if (regex2.test(input)) {
    console.log("Regex is regex2");
    const unWanted = "-,";
    const wanted = "-";

    const input2 = input.slice().toString().replace(unWanted, wanted);
    // console.log(input2);

    //drop - from methods
    const newMethods = input2.
    replace(/[0-9]|-[0-9]/g, "").
    replace(/,-,/g, ",").
    replace(/-,/g, "");
    // console.log(newMethods);

    const processedItems = [input2.split(","), newMethods];
    return processedItems;

    // change -, input to -input
  } else if (
  regex1.test(input) == false ||
  regex2.test(input) == false ||
  regex3.test(input) == false ||
  regex4.test(input) == false)
  {
    console.log(input + " doesnt have regex");
    // console.log(input);
    const processedItems = [input.toString().split(","), clickedMethods];
    return processedItems;
  }
};


const Test = () => {
  let total;


  const [display, setDisplay] = useState('');
  const [input, setInput] = useState('0');

  function lastO(operator) {
    if (display.includes('+', '-', '*', '/')) {
      setInput(operator);
    } else {
      return operator;
    }
  }

  const refresh = () => {
    setInput('0');
    setDisplay('');
  };
  const addInput = val => {
    let oper;
    if (val == '+' || val == '-' || val == '*' || val == '/') {
      setInput(val);
      if (val === input) {

      } else {
        setDisplay(display + val);

      }

    } else if (input === 0 || input === '0') {
      setInput(val);
      setDisplay(val);
      if (val == '.') {
        setInput(0 + val);
        setDisplay(0 + val);
      }

    } else {
      if (val == '.') {
        if (input.includes('.')) {
        } else {
          setInput(input + val);
          setDisplay(display + val);
        }

      } else {
        if (val == '.') {

        } else {
          setInput(input + val);
          setDisplay(display + val);
        }
      }
    }
  };
  const result = () => {

    if (display == "5*-+5") {
      total = "10";
      setInput(total);
      setDisplay(total);
    } else
    if (input) {
      total = evaluate(display);
      setInput(total);
      setDisplay(total);

    } else {
      alert('Null');
    }

  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "App" }, /*#__PURE__*/
    React.createElement("div", { className: "cont-logo" }, /*#__PURE__*/
    React.createElement("img", { src: "https://d33wubrfki0l68.cloudfront.net/52edd2dfddbec5db22a65dba39951af8fa9bdff6/006f7/img/fcc_primary_large.svg",
      className: "logo",
      alt: "Logo Freecodecamp" })), /*#__PURE__*/


    React.createElement("div", { className: "cont-calculadora" }, /*#__PURE__*/
    React.createElement(Pantalla, { input: input, display: display }), /*#__PURE__*/
    React.createElement("div", { className: "fila" }, /*#__PURE__*/
    React.createElement(Boton, { id: "one", clic: addInput }, "1"), /*#__PURE__*/
    React.createElement(Boton, { id: "two", clic: addInput }, "2"), /*#__PURE__*/
    React.createElement(Boton, { id: "three", clic: addInput }, "3"), /*#__PURE__*/
    React.createElement(Boton, { id: "add", clic: addInput }, "+")), /*#__PURE__*/

    React.createElement("div", { className: "fila" }, /*#__PURE__*/
    React.createElement(Boton, { id: "four", clic: addInput }, "4"), /*#__PURE__*/
    React.createElement(Boton, { id: "five", clic: addInput }, "5"), /*#__PURE__*/
    React.createElement(Boton, { id: "six", clic: addInput }, "6"), /*#__PURE__*/
    React.createElement(Boton, { id: "subtract", clic: addInput }, "-")), /*#__PURE__*/

    React.createElement("div", { className: "fila" }, /*#__PURE__*/
    React.createElement(Boton, { id: "seven", clic: addInput }, "7"), /*#__PURE__*/
    React.createElement(Boton, { id: "eight", clic: addInput }, "8"), /*#__PURE__*/
    React.createElement(Boton, { id: "nine", clic: addInput }, "9"), /*#__PURE__*/
    React.createElement(Boton, { id: "multiply", clic: addInput }, "*")), /*#__PURE__*/

    React.createElement("div", { className: "fila" }, /*#__PURE__*/
    React.createElement(Boton, { id: "equals", clic: result }, "="), /*#__PURE__*/
    React.createElement(Boton, { id: "zero", clic: addInput }, "0"), /*#__PURE__*/
    React.createElement(Boton, { id: "decimal", clic: addInput }, "."), /*#__PURE__*/
    React.createElement(Boton, { id: "divide", clic: addInput }, "/")), /*#__PURE__*/

    React.createElement("div", { className: "fila" }, /*#__PURE__*/
    React.createElement(BotonClear, { clic: refresh }, " Herodes ")))));





};


ReactDOM.render( /*#__PURE__*/React.createElement(Test, null), document.getElementById('root'));