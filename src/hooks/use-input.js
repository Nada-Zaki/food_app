import { useReducer } from "react";

const initialState = {
    enteredValue: '',
    inputIsTouched: false
}

const inputStateReducer = (state, action) => {
    switch(action.type) {
        case('CHANGE'):
            return {
                ...state,
                enteredValue: action.value
            }
        case('BLUR'):
            return {
                ...state,
                inputIsTouched: true
            }
        case('RESET'):
            return initialState
        default: 
            return initialState;
    }


}

const useInput = (validateInput) => {
    // const [enteredValue, setEnteredValue] = useState('');
    // const [inputIsTouched, setInputIsTouched] = useState(false);
    const [state, dispatch] = useReducer(inputStateReducer, initialState);

    const inputIsValid = validateInput(state.enteredValue);
    const inputHasError = !inputIsValid && state.inputIsTouched; 

    const firstNameChangeHandler = (event) => {
        // setEnteredValue(event.target.value);
        dispatch({type: 'CHANGE', value: event.target.value});
    }
    const firstNameBlurHandler = (event) => {
        // setInputIsTouched(true);
        dispatch({type: 'BLUR'});
    }

    const resetInput = () => {
        // setEnteredValue('');
        // setInputIsTouched(false);
        dispatch({type:'RESET'});
    }

    return {
        value: state.enteredValue,
        isValid: inputIsValid,
        hasError: inputHasError,
        changeHandler: firstNameChangeHandler,
        blurHandler: firstNameBlurHandler,
        reset: resetInput 
    }
}
export default useInput;