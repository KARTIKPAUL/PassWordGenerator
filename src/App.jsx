import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const[numberAllowed , setNumberAllowed] = useState(false);
  const[characterAllowed , setCharacterAllowed] = useState(false);
  const[password , setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str += "0123456789"
    }
    if(characterAllowed){
      str += "!@#$%^&*()"
    }

    for(let i = 1 ; i <= length ; i++){
        let char = Math.floor(Math.random() * str.length + 1);

        pass += str.charAt(char)
    }
    setPassword(pass);

  },[length,numberAllowed,characterAllowed]);


  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,8);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length,numberAllowed,characterAllowed ,passwordGenerator]);


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-center my-5'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          ref={passwordRef}
          readOnly
           />
           <button className='outline-none bg-blue-700 text-white py-0.5 shrink-0 px-2 hover:bg-blue-800 duration-200 cursor-pointer' onClick={copyPassword} >Copy</button>
        </div>

        <div className='flex text-sm gap-x-2 my-6'>
          <div className='flex items-center gap-x-1 mb-5'>
            <input 
            type="range" 
            name=""
            id=""
            min={8} 
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="">Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1 mb-5'>
          <input 
          type="checkbox"
          id="numberInput" 
          defaultChecked={numberAllowed}
          onChange={(e) => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Number</label>
          </div>
          <div className='flex items-center gap-x-1 mb-5'>
          <input 
          type="checkbox"
          id="characterInput" 
          defaultChecked={characterAllowed}
          onChange={(e) => setCharacterAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Character</label>
          </div>

        </div>

       <div className='flex justify-center items-center'>
          <button
            className='border rounded px-4 mb-4 py-1 bg-green-400 text-white font-bold cursor-pointer hover:bg-green-500 duration-200'
            onClick={passwordGenerator} 
            >Submit</button>
       </div>

      </div>
    </>
  )
}

export default App
