
const zero = document.querySelector("#zeroInput")
const one = document.querySelector("#oneInput")
const two = document.querySelector("#twoInput")
const three = document.querySelector("#threeInput")
const four = document.querySelector("#fourInput")
const five = document.querySelector("#fiveInput")
const six = document.querySelector("#sixInput")
const seven = document.querySelector("#sevenInput")
const eight = document.querySelector("#eightInput")
const nine = document.querySelector("#nineInput")
const pi = document.querySelector("#piInput")
const euler = document.querySelector("#eulerInput")
const decimal = document.querySelector("#decimalInput")
const negative = document.querySelector("#negativeInput")
const plus = document.querySelector("#plusInput")
const clear = document.querySelector("#clearInput")
const equal = document.querySelector("#equalInput")
const subtract = document.querySelector("#subtractInput")
const multiply = document.querySelector("#multiplyInput")
const divide = document.querySelector("#divideInput")
const mod = document.querySelector("#modInput")
const exponent = document.querySelector("#exponentInput")
const log = document.querySelector("#logInput")
const sqrt = document.querySelector("#sqrtInput")
const calcDisplayValue = document.querySelector("#calcDisplayValue")

let numArray = [];
let operationArray = [];
let totalValue = 0;

zero.addEventListener("click",  () => {
    addValue("0")})
one.addEventListener("click",  () => {
    addValue("1")})
two.addEventListener("click",  () => {
    addValue("2")})
three.addEventListener("click",  () => {
    addValue("3")})
four.addEventListener("click",  () => {
    addValue("4")})
five.addEventListener("click",  () => {
    addValue("5")})
six.addEventListener("click",  () => {
    addValue("6")})
seven.addEventListener("click", () => {
    addValue("7")})
eight.addEventListener("click",  () => {
    addValue("8")})
nine.addEventListener("click",  () => {
    addValue("9")})
pi.addEventListener("click", () => {
    addValue("π")})
euler.addEventListener("click", () => {
    addValue("e")})
decimal.addEventListener("click", () => {
    addValue(".")})
negative.addEventListener("click", () => {
    addValue("-")})
plus.addEventListener("click", () => {
    addValue(" + ")
})
subtract.addEventListener("click", () => {
    addValue(" - ")
})
multiply.addEventListener("click", () => {
    addValue(" x ")
})
divide.addEventListener("click", () => {
    addValue(" / ")
})
mod.addEventListener("click", () => {
    addValue(" % ")
})
exponent.addEventListener("click", () => {
    addValue("^")
})
log.addEventListener("click", () => {
    if(Number.isInteger(parseInt(calcDisplayValue.value[calcDisplayValue.value.length -1])))
    {
        addValue(" x ")
        addValue("log")
    }else
    {
        addValue("log")
    }
    
})
sqrt.addEventListener("click", () => {
    if(Number.isInteger(parseInt(calcDisplayValue.value[calcDisplayValue.value.length -1])))
    {
        addValue(" x ")
        addValue("√")
    }else
    {
        addValue("√")
    }
})
//√
clear.addEventListener("click", () =>{
    
    clearValue()})
equal.addEventListener("click", () => {
    calcValue()
    
})


function updateArrayValue()
{
    let numString = "";
    for(let i = 0; i < calcDisplayValue.value.length; i++)
    {
       
        if(calcDisplayValue.value[i] == '^')
        {
            operationArray.push('^')
            numArray.push(parseFloat(numString))
            numString = ""
            
        }else if (calcDisplayValue.value[i] == '√')
        {
            if(numString.length > 0)
            {
                numArray.push(parseFloat(numString))
                numString = ""
            }
            operationArray.push('√')    
        }
        else if (calcDisplayValue.value.substring(i,i+3) == "log")
        {
            if(numString.length > 0)
            {
                numArray.push(parseFloat(numString))
                numString = ""
            }
            operationArray.push("log")
            i += 2
            
        }else if (calcDisplayValue.value[i] == 'π')
        {
            numArray.push(Math.PI)
            
        }else if (calcDisplayValue.value[i] == 'e')
        {
            numArray.push(Math.E)
        }else if(calcDisplayValue.value[i] == (" "))
        {
            operationArray.push(calcDisplayValue.value[i+1])
            numArray.push(parseFloat(numString))
            numString = ""
            i += 2
        }else if(i == calcDisplayValue.value.length -1)
        {
            numString += calcDisplayValue.value[i]
            numArray.push(parseFloat(numString))
        }else
        {
            numString += calcDisplayValue.value[i]
        }
    }
   
}


function updateTotalValue()
{
    while(operationArray.length > 0)
    {
        let index = findOperationIndex();
        if(operationArray[index] == '√')
        {
            numArray[index] = Math.sqrt(numArray[index])
        }
        if(operationArray[index] == '^')
        {
            numArray[index] = Math.pow(numArray[index], numArray[index+1])
            numArray.splice(index+1,1)
        }
        if(operationArray[index] == "log")
        {
            numArray[index] = Math.log10(numArray[index])
        }
        if(operationArray[index] == '%')
        {
            numArray[index] = numArray[index] % numArray[index+1]
            numArray.splice(index+1,1)
        }
        if(operationArray[index] == 'x')
        {
            numArray[index] = numArray[index] * numArray[index+1]
            numArray.splice(index+1,1)
        }
        if(operationArray[index] == '/')
        {
            numArray[index] = numArray[index] / numArray[index+1]
            numArray.splice(index+1,1)
        }
        if(operationArray[index] == '+')
        {
            numArray[index] = numArray[index] + numArray[index+1]
            numArray.splice(index+1,1)
        }
        if(operationArray[index] == '-')
        {
            
            numArray[index] = numArray[index] - numArray[index+1]
            numArray.splice(index+1,1)
        }
        
        operationArray.splice(index,1)
        
    }

    totalValue = numArray[0]
}



function findOperationIndex()
{
    if(operationArray.includes('^') || operationArray.includes("log") || operationArray.includes('√'))
    {
        let eIndex = operationArray.indexOf('^')
        let lIndex = operationArray.indexOf("log")
        let sqrtIndex = operationArray.indexOf('√')

        if(lIndex < 0 && sqrtIndex < 0)
        {
            return eIndex;
        }
        if(eIndex < 0 && sqrtIndex < 0)
        {
            return lIndex
        }
        if(eIndex < 0 && lIndex < 0)
        {
            return sqrtIndex
        }
        if(((lIndex < eIndex && lIndex < sqrtIndex) || (lIndex < eIndex && sqrtIndex == -1) || (lIndex < sqrtIndex && eIndex == -1)) && lIndex != -1)
        {
            return lIndex
        }
        if(((sqrtIndex < lIndex && sqrtIndex < eIndex) || (sqrtIndex < eIndex && lIndex == -1) || (sqrtIndex < lIndex && eIndex == -1)) && sqrtIndex != -1)
        { 
            return sqrtIndex
        }
        return eIndex
    }
    if(operationArray.includes('x') || operationArray.includes('/') || operationArray.includes('%'))
    {
        let mIndex = operationArray.indexOf('x')
        let dIndex = operationArray.indexOf('/')
        let modIndex = operationArray.indexOf('%')
        if(mIndex < 0 && modIndex < 0)
        {
            
            return dIndex
        }
        if(dIndex < 0 && modIndex)
        {
            return mIndex
        }
        if(dIndex < 0 && mIndex < 0)
        {
            return modIndex
        }
        if(((mIndex < dIndex && mIndex < modIndex) || (mIndex < dIndex && modIndex == -1) || (mIndex < modIndex && dIndex == -1)) && mIndex != -1)
        {
            return mIndex
        }
        if((modIndex < mIndex && modIndex < dIndex) || (modIndex < dIndex && mIndex == -1) || (modIndex < mIndex && dIndex == -1) && modIndex != -1)
        {
            return modIndex
        }
        return dIndex
    }

    if(operationArray.includes('+') || operationArray.includes('-'))
    {
        
        let aIndex = operationArray.indexOf('+')
        let sIndex = operationArray.indexOf('-')

        if(aIndex < 0)
        {
            return sIndex
        }
        if(sIndex < 0)
        {
            return aIndex
        }
        if(aIndex < sIndex)
        {
            return aIndex
        }
        return sIndex
    }
    
}

function addValue(x)
{
    calcDisplayValue.value += x
}


function clearValue()
{
    calcDisplayValue.value = ""
    numArray = []
    operationArray = []
    totalValue = 0;
}


function updateValue()
{
    numArray = []
    operationArray = []
    totalValue = 0;
}
function checkSyntax()
{
    let string = calcDisplayValue.value

}

function calcValue()
{
    
    updateArrayValue()
    updateTotalValue()
    calcDisplayValue.value = parseFloat(totalValue)
    updateValue()
}