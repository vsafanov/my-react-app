import backspace from './backspace.png';


const KeyPadComponent = (props) => {

    const handleClick = (e) => {
        // console.log(e.target)
        props.onClick(e.target.name)
    }

    const buttonsList = [
        'C','CInt','%','CE',
        '1','2','3','+',
        '4','5','6','-',
        '7','8','9','*',
        '.','0','=','/'
    ]


    return (
        <div className="button">
            {
                buttonsList.map((name) => 
                    name === 'CE'
                    ?   <button key={name} type='button' name={name} className='calc-button' onClick={handleClick} ><img src={backspace} name='CE' style={{width:'20px'}} alt="Backspace" /></button>
                    :   <button key={name} type='button' name={name} className='calc-button' onClick={handleClick}>{name}</button>  
                )
            }

            {/* <button name="C" onClick={handleClick}>C</button>   
            <button name="CInt" onClick={handleClick}>CInt</button>
            <button name="%" onClick={handleClick} title='Parse to integer'>%</button>
            <button name="CE" onClick={handleClick} ><img src={backspace} name='CE' style={{width:'20px'}} alt="Backspace" /></button><br />           


            <button name="1" onClick={handleClick}>1</button>
            <button name="2" onClick={handleClick}>2</button>
            <button name="3" onClick={handleClick}>3</button>
            <button name="+" onClick={handleClick}>+</button><br />


            <button name="4" onClick={handleClick}>4</button>
            <button name="5" onClick={handleClick}>5</button>
            <button name="6" onClick={handleClick}>6</button>
            <button name="-" onClick={handleClick}>-</button><br />


            <button name="7" onClick={handleClick}>7</button>
            <button name="8" onClick={handleClick}>8</button>
            <button name="9" onClick={handleClick}>9</button>
            <button name="*" onClick={handleClick}>x</button><br />


            <button name="." onClick={handleClick}>.</button>
            <button name="0" onClick={handleClick}>0</button>
            <button name="=" onClick={handleClick}>=</button>
            <button name="/" onClick={handleClick}>÷</button><br /> */}
            {/* <div style={{height:'1px', backgroundColor:'ghostwhite'}}/> */}

            <button name="Insert" className='calc-button action-button' onClick={handleClick}>Insert</button>
            <button name="Close"className='calc-button action-button' onClick={handleClick}>Close</button>

        </div>
    );
}



export default KeyPadComponent;