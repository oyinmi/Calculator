import { useReducer } from "react";
import "./styles.css";
import NumberButton from "./NumberButton";
import OperationButton from "./OperationButton";

// Define action
export const ACTIONS = {
  ADD_NUMBER: 'add-number',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_NUMBER: 'delete-number',
  EQUALS: 'equals'
}

// Reducer to manage all our states for us
// funcion reducer(state, action) {}
function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_NUMBER:
      if (payload.number === "0" && state.currentOperand === "0") {
        return state
      }

      if (payload.number === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.number}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: equals(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {}
  }
}

function equals({ currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }

  return computation.toString()
}


function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
    reducer, 
    {}
  );

  return (
    <div className="calculator">

      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>

      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_NUMBER })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />

      <NumberButton number="1" dispatch={dispatch} />
      <NumberButton number="2" dispatch={dispatch} />
      <NumberButton number="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />

      <NumberButton number="4" dispatch={dispatch} />
      <NumberButton number="5" dispatch={dispatch} />
      <NumberButton number="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />

      <NumberButton number="7" dispatch={dispatch} />
      <NumberButton number="8" dispatch={dispatch} />
      <NumberButton number="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />

      <NumberButton number="." dispatch={dispatch} />
      <NumberButton number="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EQUALS })}>=</button>
      
    </div>
  ); 
}

export default App;
