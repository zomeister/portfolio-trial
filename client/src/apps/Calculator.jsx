import { useState, useEffect } from 'react'
import NumPad from '../components/NumPad'

// function OperatorDisplay({ operators, onOperatorChange }) {}

// function NumberDisplay({ numbers, onNumberChange }) {}

// function ButtonDisplay () {
//     const 
//     return (

//     )
// }
// const numbersArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
// const operatorsArray = ['+', '-', '*', '/']
// const evaluatorsArray = ['=', 'C', 'CE']
export default function Calculator () {
    const [input, setInput] = useState('')
    const [result, setResult] = useState('')

    const buttonArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '*', '/']

    const handleButtonClick = (value) => {
        console.log(`${value} btn clicked`)
        setInput(input + value)
    }

    /** [EQUAL] button - evaluate input expression */
    const calculateResult = () => {
        try{
            const result = eval(input).toString()
            setResult(result)
            setInput(result)
            console.log(result)
        } catch {
            setResult('')
            setInput('')
            console.log('error')
        }
    }
    /** C button - clear all */
    const clearInput = () => {
        setInput('')
    }
    /** CE button - clear entry */
    const clearEntry = () => {
        setInput(result)
    }
    return (
        <div className='calculator'>
            <h1>Calculator</h1>
            <div className='result font-mono font-bold'>EQ: {input}</div>
            <div className='buttons'>
                {buttonArray.map( (item, index) =>
                    <button key={index} onClick={()=>handleButtonClick(item)} className='btn font-mono'>
                        {item}
                    </button>)
                }
                <button onClick={calculateResult} className='btn btn-secondary font-mono'>Calculate</button>
                <button onClick={clearInput} className='btn btn-secondary font-mono'>C</button>
                <button onClick={clearEntry} className='btn btn-secondary font-mono'>CE</button>
            </div>
            {/* <NumPad /> */}

            <form>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <p>{result}</p>
            </form>
        </div>
    )
}