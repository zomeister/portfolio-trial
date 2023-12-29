import TodoList from './../apps/TodoList'
import Calculator from './../apps/Calculator'
import Stopwatch from './../apps/Stopwatch'
import Timer from './../apps/Timer'
export default function Demos () {
    return (
        <div className="demos">
            <hr/><h1>Demos</h1>
            <hr/><Timer />
            <hr/><Stopwatch />
            <hr/><Calculator />
            <hr/><TodoList />
            <hr/>
        </div>
    )
}