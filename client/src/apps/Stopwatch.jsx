import { useState, useEffect, useCallback } from 'react'

export default function Stopwatch () {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(9)
    const [seconds, setSeconds] = useState(58)
    const [laps, setLaps] = useState([])
    const [isRunning, setIsRunning] = useState(false)

    const startStopwatch = () => {
        setIsRunning(true)
    }
    const stopStopwatch = () => {
        setIsRunning(false)
    }
    const handleLap = () => {
        
    }

    const resetStopwatch = () => {
        setIsRunning(false)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
        setLaps([])
    }
    useEffect(() => {
        // let interval
        if (isRunning) {
            const interval = setInterval(() => {
                setSeconds( (prevSeconds) => {
                    if (prevSeconds === 59) {
                        setMinutes( (prevMinutes) => {
                            if (prevMinutes === 59) {
                                setHours((prevHours) => prevHours + 1)
                                return 0
                            } else {
                                return prevMinutes + 1
                            }
                        })
                        return 0
                    } else {
                        return prevSeconds + 1
                    }
                })
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    }, [isRunning])

    return (
        <div className='stopwatch'>
            <h1>Stopwatch</h1>
            <h2 className='font-mono'>
                { hours < 10 ? `0${hours}` : hours
                }:{minutes < 10 ? `0${minutes}` : minutes
                }:{seconds < 10 ? `0${seconds}` : seconds
                }
            </h2>

            <button onClick={startStopwatch}>Start</button>
            <button onClick={stopStopwatch}>Stop</button>
            <button onClick={resetStopwatch}>Reset</button>

        </div>
    )
}