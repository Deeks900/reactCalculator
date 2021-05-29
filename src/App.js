import logo from "./logo.svg";
import "./App.css";
/*useState is a hook*/
import { useState } from "react";/*use state is a hook in react*/

function App() {
  let [oldExpression, setOldExpression] =
    useState("Ans = 0"); /*"" empty string default value de rahe hai"*/
  let [newExpression, setNewExpression] = useState("0");
  let [prev, setPrev] = useState("ANS");
  let numerics = new Set("0123456789.");
  let operators = new Set("+*/-%");
  let buttons = [
    "(",
    ")",
    "%",
    "AC",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];
  let evaluateExpression = () => {
    let evaluation = eval(newExpression);
    setOldExpression(newExpression + "=");
    setNewExpression(String(evaluation));
    setPrev("ANS");
  };

  let putNumerics = (value)=>{
    if(prev === "ANS"){
      setOldExpression("Ans = " + newExpression);
      setNewExpression(value);
    }
    else{
      setNewExpression(newExpression + value);
    }
    setPrev("NUM");
  }

  
  let putOperators = (value)=>{
    if(prev !== "OP"){
      setNewExpression(newExpression + value);
      
    }
    else{
      setNewExpression(newExpression.slice(0, -1) + value);
    }
    setPrev("OP");
    
  }
  
  let deleteExpression = () => {
    /*slice mein hum ending se bhi index de sakte hain like -1*/
    if (newExpression.length >= 1) setNewExpression(newExpression.slice(0, -1));
    /*last item in slice is exclusive that -1 is exclusive*/ else if (
      newExpression.length < 1 &&
      oldExpression.length >= 1
    ) {
      setOldExpression("");
    }
    setPrev("DEL");
  };
  let handleKeyUp = function (event) {
    console.log(event.key);
    if (event.key === "Backspace") {
      deleteExpression();
    } else if (event.key === "Enter") {
      evaluateExpression();
     
    } else if (numerics.has(event.key)) {
      putNumerics(event.key);
      
    }
    else if(operators.has(event.key)){
      putOperators(event.key);
    }
  };
  return (
    /*inline styling in format of javascript format*/
    /*TabIndex means by default focus is div par hoga and onKeyUp ka matlab jab mein key press karke release karungi tab ye event occur hoga*/
    <div
      className="App"
      tabIndex={0}
      onKeyUp={handleKeyUp}
      style={{
        /*{} used because writing javascript in between {} used again because using object*/
        width: "100%",
        height: "100vh",
        background: "#888888",
        display: "flex",
        flexDirection: "column",
        //by default flex direction is row
        //major axis here will be vertical axis
        justifyContent: "center",
        //justify content brings thing in centre of major axis
        alignItems: "center",
        //align items brings things in centre of perpendicular axis
      }}
    >
      {/* Calculation area */}
      <div
        style={{
          width: "400px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <h6>{oldExpression}</h6>
        <h1>{newExpression}</h1>
      </div>

      {/*Keypad Area*/}
      <div
        style={{
          width: "400px",
          background: "#ffffff",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "20px",
          borderRadius: "10px",
          flexWrap: "wrap",
          margin: "20px",
        }}
      >
        {buttons.map(function (buttonValue, idx) {
          return (
            <button
              style={{
                width: "90px",
                margin: "5px",
                padding: "5px",
              }}
              onClick={function () {
                if (buttonValue === "AC") {
      deleteExpression();
    } else if (buttonValue === "=") {
      evaluateExpression();
     
    } else if (numerics.has(buttonValue)) {
      putNumerics(buttonValue);
      
    }
    else if(operators.has(buttonValue)){
      putOperators(buttonValue);
    }
              }}
            >
              {buttonValue}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
