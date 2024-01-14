import { useState, useEffect } from 'react'

export default function Timer () {
    const [timeRemaining, setTimeRemaining] = useState(20)
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
        let interval = null
        if (isActive && timeRemaining > 0) {
            interval = setInterval(() => {setTimeRemaining(prev => prev-1)},1000)
        } else if (!isActive && timeRemaining !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, timeRemaining])

    const startTimer = () => setIsActive(true)
    const stopTimer = () => setIsActive(false)
    const resetTimer = () => {
        setIsActive(false)
        setTimeRemaining(20)
    }

    return (
        <div className='timer'>
            <h1>Timer: <span className="countdown font-mono text-6xl">{timeRemaining}</span></h1>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    )
}