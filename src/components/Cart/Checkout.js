import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameIsInvalid,
        changeHandler: nameChangeHandler,
        blurHandler: nameBlurHandler,
        reset: nameInputReset
        
    } = useInput(isNotEmpty);

    const {
        value: enteredStreet,
        isValid: enteredStreetIsValid,
        hasError: enteredStreetIsInvalid,
        changeHandler: streetChangeHandler,
        blurHandler: streetBlurHandler,
        reset: streetInputReset
        
    } = useInput(isNotEmpty);

    const {
        value: enteredPostalCode,
        isValid: enteredPostalCodeIsValid,
        hasError: enteredPostalCodeIsInvalid,
        changeHandler: postalCodeChangeHandler,
        blurHandler: postalCodeBlurHandler,
        reset: postalCodeInputReset
        
    } = useInput(isFiveChars);

    const {
        value: enteredCity,
        isValid: enteredCityIsValid,
        hasError: enteredCityIsInvalid,
        changeHandler: cityChangeHandler,
        blurHandler: cityBlurHandler,
        reset: cityInputReset
        
    } = useInput(isNotEmpty);

    let formInputsValidity = false;
    const formIsValid = 
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

    if (formIsValid) {
        formInputsValidity = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        if (!formInputsValidity) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        });

        nameInputReset();
        streetInputReset();
        postalCodeInputReset();
        cityInputReset();
    }
    const nameControlClasses = `${classes.control} ${enteredNameIsInvalid ? classes.invalid : ''}`;
    const streetControlClasses = `${classes.control} ${enteredStreetIsInvalid ? classes.invalid : ''}`
    const postalCodeControlClasses = `${classes.control} ${enteredPostalCodeIsInvalid ? classes.invalid : ''}`
    const cityControlClasses = `${classes.control} ${enteredCityIsInvalid ? classes.invalid : ''}`

    return <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input 
                type='text' 
                id='name'
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler} />
            {enteredNameIsInvalid && <p>please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input 
                type='text' 
                id='street'
                value={enteredStreet}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler} />
            {enteredStreetIsInvalid && <p>please enter a valid street!</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input 
                type='text' 
                id='postal'
                value={enteredPostalCode}
                onChange={postalCodeChangeHandler}
                onBlur={postalCodeBlurHandler} />
            {enteredPostalCodeIsInvalid && <p>please enter a valid postal code! (5 characters)</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input 
                type='text' 
                id='city' 
                value={enteredCity}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}/>
            {enteredCityIsInvalid && <p>please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
                Cancel
            </button>      
            <div>
            <button disabled={!formInputsValidity} className={classes.submit}>
                Confirm
            </button>
            </div>      
            
        </div>
    </form>
}

export default Checkout;