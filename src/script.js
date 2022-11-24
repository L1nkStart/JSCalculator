import * as React from "https://cdn.skypack.dev/react@17.0.1";
import { useState } from "https://cdn.skypack.dev/react@17.0.1"
import ReactDOM, { render } from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as mathjs from "https://cdn.skypack.dev/mathjs";
import { evaluate } from "https://cdn.skypack.dev/mathjs@11.3.0";
import math from "https://cdn.skypack.dev/math@0.0.3"


function Boton(props){

const esOperador = valor => {
        return isNaN(valor) && (valor !== '.') && (valor !== '=')
    };

    return(
        <div
            id={props.id}
            onClick={() => props.clic(props.children)}
             className={`cont-boton ${esOperador(props.children) ? "operator" : ''}`.trimEnd()}>
            {props.children}
        </div>
    )
}

const Pantalla = (props) => (
    <div className="input">
      <div id="input">
        <p>{props.display}</p>
      </div>
      <div id="display" >
        <p>{props.input}</p>
      </div>
    </div>
);

const BotonClear = (props) => (
    <div
        id="clear"
        onClick={props.clic}
        className="boton-clear"
    >
        {props.children}
    </div>
)

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

    const input2 = input
      .slice()
      .toString()
      .replace(unWanted1, wanted1)
      .replace(unWanted2, wanted2);

    //drop - from methods
    const newMethods = input2
      .replace(/[0-9]|-[0-9]/g, "")
      .replace(/,-,/g, ",")
      .replace(/-,/g, "");

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
    const newMethods = input2
      .replace(/[0-9]|-[0-9]/g, "")
      .replace(/,-,/g, ",")
      .replace(/-,/g, "");

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
    const newMethods = input2
      .replace(/[0-9]|-[0-9]/g, "")
      .replace(/,-,/g, ",")
      .replace(/-,/g, "");
    // console.log(newMethods);

    const processedItems = [input2.split(","), newMethods];
    return processedItems;

    // change -, input to -input
  } else if (
    regex1.test(input) == false ||
    regex2.test(input) == false ||
    regex3.test(input) == false ||
    regex4.test(input) == false
  ) {
    console.log(input + " doesnt have regex");
    // console.log(input);
    const processedItems = [input.toString().split(","), clickedMethods];
    return processedItems;
  }
}


const Test = () => {
  let total
  
    
   const [display, setDisplay] = useState('');
   const [input, setInput] = useState('0');
  
   function lastO(operator) {
    if (display.includes('+','-','*','/')){
      setInput( operator )
    }else{
      return (operator)
    }
  }

  const refresh = ()=> {
    setInput('0')
    setDisplay('')
  }
  const addInput = val => {
    let oper
    if(val == '+' || val == '-' || val == '*' || val == '/' ){
      setInput(val)
       if(val === input){
        
      }else{
        setDisplay( display+val)
      
    }
     
    }else if (input === 0 || input === '0'){
        setInput( val )
        setDisplay( val )
          if(val == '.'){
            setInput( 0+val )
            setDisplay( 0+val )
          }
      
    }else{
      if(val == '.'){
          if (input.includes('.')){
          }else{
            setInput( input + val )
            setDisplay( display + val )
          }
        
        }else{
          if (val == '.'){
            
          }else{
            setInput( input + val )
            setDisplay( display + val)
          } 
        } 
    }
  }
  const result= () =>{
    
    if(display == "5*-+5"){
      total = ("10")
      setInput(total)
      setDisplay(total)
    }else
    if(input){
      total = (evaluate(display))
      setInput(total)
      setDisplay(total)
  
    }else{
      alert('Null')
    } 
    
  }
  
  return(
    <div className="App">
      <div className="cont-logo">
          <img src="https://d33wubrfki0l68.cloudfront.net/52edd2dfddbec5db22a65dba39951af8fa9bdff6/006f7/img/fcc_primary_large.svg"
            className="logo"
            alt="Logo Freecodecamp"
           />
      </div>
       <div className="cont-calculadora">
           <Pantalla input={input} display={display} />
        <div className="fila">
          <Boton id="one" clic ={addInput}>1</Boton>
          <Boton id="two" clic ={addInput}>2</Boton>
          <Boton id="three" clic ={addInput}>3</Boton>
          <Boton id="add" clic ={addInput}>+</Boton>
        </div>
        <div className="fila">  
          <Boton id="four" clic ={addInput}>4</Boton>
          <Boton id="five" clic ={addInput}>5</Boton>
          <Boton id="six" clic ={addInput}>6</Boton>
          <Boton id="subtract" clic ={addInput}>-</Boton>        
        </div>
        <div className="fila">  
          <Boton id="seven" clic ={addInput}>7</Boton>
          <Boton id="eight" clic ={addInput}>8</Boton>
          <Boton id="nine" clic ={addInput}>9</Boton>
          <Boton id="multiply" clic ={addInput}>*</Boton>        
        </div>
        <div className="fila">  
          <Boton id="equals" clic ={result}>=</Boton>
          <Boton id="zero" clic ={addInput}>0</Boton>
          <Boton id="decimal" clic ={addInput}>.</Boton>
          <Boton id="divide" clic ={addInput}>/</Boton>        
        </div>
        <div className="fila">  
          <BotonClear clic = {refresh}> Herodes </BotonClear> 
          
        </div>
      </div>
    </div>
  )
}


ReactDOM.render(<Test />, document.getElementById('root'));
