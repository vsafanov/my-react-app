import React, { useEffect, useLayoutEffect, useState } from 'react';
import './calculator.css';
import ResultComponent from './ResultComponent';
import KeyPadComponent from "./KeyPadComponent";


const Calculator = ({ DefaultValue, Show, onShow, onUpdateParentInput, ...other },) => {

    const [result, SetResult] = useState(DefaultValue || 0)

    //Update Result panel when calendar opens (Show = true)
    useEffect(() => {
        Show && SetResult(DefaultValue)
    }, [DefaultValue, Show])

    const onClick = button => {

        // alert(button )
        if (button === null) {
            return
        }

        else if (button === "=") {
            calculate()
        }

        else if (button === 'CInt') {
            convertToInt()
        }

        else if (button === 'C') {
            reset()
        }

        else if (button === 'CE') {
            backspace()
        }

        else if (button === 'Insert') {
            onUpdateParentInput(result)
            onShow(false)
        }

        else if (button === 'Close') {
            onShow(false)
        }

        else {

            // if(result.toString().length > 20) return;

            var error = result.toString().match(/[a-zA-Z]+/g)

            result.toString() === '0' || error != null ? SetResult(button) : SetResult(result + button)

            // console.log('Target clicked: ', result)
        }
    }

    const convertToInt = () => {
        result > 0 && result < 1 ? SetResult(1) : SetResult(parseInt(result))
    }

    const calculatePercentage = (original) => {

        const sign = original.includes('-')
            ? '-' : original.includes('+')
                ? '+' : original.includes('*')
                    ? '*' : original.includes('/') ? '/' : '';

        if (sign === '') return

        const elements = original.split(sign)
        const a = parseFloat(elements[0])
        const b = parseFloat(elements[1].replace('%', ''))
        // console.log(a, b, a * (b / 100))
        if (sign === '-') {
            return a - (a * b) / 100
        }

        if (sign === '+') {
            return a + (a * b) / 100
        }

        if (sign === '*') {
            return a * (b / 100)
        }

        if (sign === '/') {
            return a / (b / 100)
        }

    }


    const calculate = () => {
        var checkResult = ''
        if (result.includes('--')) {
            checkResult = result.replace('--', '+')
        }
        else {
            checkResult = result
        }

        try {

            let calc = ''
            if (checkResult.includes('%')) {
                calc = eval(calculatePercentage(checkResult))?.toString()
                // console.log('calc', calc)
            }
            else {
                calc = eval(checkResult).toString()
            }
            if (calc.length > 12) {
                calc = calc.substring(1, 12) || ""
            }
            //add 0 if it's float value between 0 and 1
            if (calc < 1 && calc > 0) calc = '0' + calc
            SetResult(calc + "")

        } catch (e) {
            console.error("Error:", e)
            SetResult('error')
        }
    };

    const reset = () => {
        SetResult(0)
    };

    const backspace = () => {

        result.toString().length === 1 ? SetResult(0) : SetResult(result.toString().slice(0, -1))
    };

    const closeCalendar = (event => {

        const concernedElement = document.querySelector(".calculator-body");
        if (concernedElement?.contains(event.target)) {
            console.log("Clicked Inside");
        } else {
            console.log("Clicked Outside / Elsewhere");
            onShow(false)
        }
    });


    useEffect(() => {
        
        document.addEventListener("mousedown", closeCalendar);

        return () => { document.removeEventListener("mousedown", closeCalendar) };

    }, [])


    return (
        <>
            {Show &&
                <div style={{ position: 'absolute', zIndex: 10 }}  >
                    <div className="calculator-body">
                        <ResultComponent result={result} />
                        <KeyPadComponent onClick={onClick} />
                    </div>
                </div>
            }
        </>
    );

}

export default Calculator;

// style='display:none;width:200px;height:200px;position:absolute;z-index:10;background:darkgray'