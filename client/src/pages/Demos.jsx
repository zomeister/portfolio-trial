import TodoList from './../apps/TodoList'
import Calculator from './../apps/Calculator'
import Stopwatch from './../apps/Stopwatch'
import Timer from './../apps/Timer'
export default function Demos () {
    return (
        <div className="bg-blue-500 text-white p-4">
            <h1 className="text-3xl font-bold underline">Demos</h1>
            <hr/>
            <Timer />
            <hr/>
            <Stopwatch />
            <hr/>
            <Calculator />
            <hr/>
            <TodoList />
            <hr/>
            
        </div>
    )
}