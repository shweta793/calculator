import { useState,useEffect } from 'react';
import { useRef } from 'react';
import './App.css';

import React from 'react';

function App() {
  const initialState = JSON.parse(sessionStorage.getItem("calc"))|| []
  const [calc, setCalc]= useState(initialState);
  const [results, setResults] =useState("");
  const ops =['/','*','-','+','.'];
  useEffect(()=>{
    sessionStorage.setItem("calc",JSON.stringify(calc)); 
 },[calc]);


  const updateCalc = value=>{
    
    if(
      ops.includes(value) && calc=== '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    )
    {
      return;
    }
    setCalc(calc+value);
    if(!ops.includes(value))
    {
    setResults(eval(calc+value).toString());
    }
  }

  const createDigits=()=>{
    const digits =[];
    for(let i=1; i<10; i++){
      digits.push(
        <button onClick={()=>updateCalc(i.toString())}
        key={i}>
          {i}
          </button>
      )
        
    }
    return digits;
  }

  const calculate =()=>{
    setCalc(eval(calc).toString());
  }
   
  const deleteLast=()=>{
    if(calc===""){
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value)
    setResults(calc.slice(0,-1))
    
  }

 const deleteAll=()=>{
  if (calc===""){
    return;
  }
  const value= calc.slice(0);
  setCalc('')
  setResults('');

 }

  return (
    <div className='App'>
    <div className="calculator">
      <div className='display'>
        {results ? <span>({results})</span>:''}&nbsp;
        {calc || "0 "}
      </div>
      <div className='operators'>
        <button onClick={()=>updateCalc('+')}>+</button>
        <button onClick={()=>updateCalc('-')}>-</button>
        <button onClick={()=>updateCalc('*')}>*</button>
        <button onClick={()=>updateCalc('/')}>/</button>
        <button onClick={deleteLast}>DEL</button>
        <button onClick={deleteAll}>AC</button>
      
      </div>

      <div className='digits'>
        { createDigits() }
      <button onClick={()=>updateCalc('0')}>0</button>
      <button onClick={()=>updateCalc('.')}>.</button>
      <button onClick={calculate}>=</button>
      </div>
      
    </div>
    </div>
  );
}

export default App;
