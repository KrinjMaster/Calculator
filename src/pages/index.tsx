import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMemo, useState } from 'react'
import { Container, Switch } from '@mui/material'

interface IState {
  display: string,
  result: string,
  showResult: boolean
}

export default function Home() {
  const [mode, setMode] = useState('dark')
  const [number, setNumber] = useState<IState>({display: '0', result: '', showResult: false})

  const operations = ['+', '-', '*', '/','.']

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === 'light' ? 'light' : 'dark',
          secondary: {light: '#505050', dark: '#D4D4D2', main: '#000000'}
        }
      }),
    [mode]
  )

  const modifyNum2 = (method: string) => {
    if ([...number.display].includes('.') && method === '.') return 
    else if (operations.splice(2,4).includes((number.display).slice(-1))) return 
    else if (method === '.') return setNumber((prevState) => ({
      ...prevState,
      display:  prevState.display === '' ? '0'.concat('.') : (prevState.display).concat('.'),
      showResult: false
    }))
    else if (method === '+') {
      setNumber((prevState) => prevState && ({
        display: '',
        result: prevState.result.concat(number.display + '+'),
        showResult: false
      }))
    } 
    else if (method === '-') {
      setNumber((prevState) => prevState && ({
        display: '',
        result: prevState.result.concat(number.display + '-'),
        showResult: false
      }))
    } 
    else if (method === '*') {
      setNumber((prevState) => prevState && ({
        display: '',
        result: prevState.result.concat(number.display + '*'),
        showResult: false
      }))
    } 
    else if (method === '/') {
      setNumber((prevState) => prevState && ({
        display: '',
        result: prevState.result.concat(number.display + '/'),
        showResult: false
      }))
    } 
    else if (method === '=' ) {
      setNumber((prevState) => ({
        display: '',
        result: number.display === '' ? (eval(prevState.result.concat(number.result.slice(-2,-1))).toString()) : (eval(prevState.result.concat(number.display)).toString()),
        showResult: true
      }))
    }
  }

  const modifyNum = (num: number | string) => {
    if (operations.includes(number.result.slice(-1))) {
      setNumber((prevState) => ({
        ...prevState,
        display: ''
      }))
    }
    if (num === 'ac') return setNumber(() => ({
      display: '0',
      result: '',
      showResult: false
    })) 
    else if (num === '%') return setNumber((prevState) => ({
        ...prevState,
        result: (Number(prevState.result) * 0.01).toString(),
    }))
    else if (num === '-') return setNumber((prevState) => ({
      ...prevState,
      display: prevState.display === '' ? prevState.display : (Number(prevState.display) * -1).toString(),
      result: prevState.result === '' ? prevState.result : (Number(prevState.result) * -1).toString(),
    }))
    else if (number.display === '0' && typeof num === 'string') {
      return setNumber((prevState) => ({
        ...prevState,
        display: num,
        showResult: false
      }))
    }
    else {
      return setNumber((prevState) => ({
        ...prevState,
        display: (prevState.display).concat(num.toString()),
        showResult: false
      }))
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className='flex flex-col items-center transition-colors duration-500 ease-in-out'>
          <h1 className='font-bold text-4xl'>{mode.toUpperCase()} MODE</h1>
          <Switch onChange={() => setMode(mode === 'light' ? 'dark' : 'light')} className='scale-150'/>
          <div className='w-full h-full flex justify-center mt-5'>
            <div className='scale-75 lg:scale-100 xl:scale-120 flex flex-col items-center w-fit'>
              <div className='w-full h-[150px] px-1'>
                <h1 className='text-right text-8xl'>{number.showResult ? number.result : number.display}</h1>
              </div>
              <div className='grid grid-cols-4 item-2 justify-center items-center gap-1 w-[340px] text-3xl m-1 '>
                <button onClick={() => modifyNum('ac')} className={`w-20 h-20 rounded-full ${mode === 'dark' ? `bg-[#D4D4D2]` : `bg-[#505050]`}  ${mode === 'dark' ? `text-black` : `text-white`}`}>AC</button>
                <button onClick={() => modifyNum('-')} className={`w-20 h-20 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light}]  ${mode === 'dark' ? `text-black` : `text-white`}`}>+/-</button>
                <button onClick={() => modifyNum('%')} className={`w-20 h-20 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.light}] text-${mode === 'dark' ? `black` : `white`}`}>%</button>
                <button onClick={() => modifyNum2('/')} className='w-20 h-20 -2 rounded-full bg-[#FF9500] -[#FF9500]'>÷</button>
                <button onClick={() => modifyNum('7')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>7</button>
                <button onClick={() => modifyNum('8')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>8</button>
                <button onClick={() => modifyNum('9')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>9</button>
                <button onClick={() => modifyNum2('*')} className='w-20 h-20 -2 rounded-full bg-[#FF9500] -[#FF9500]'>x</button>
                <button onClick={() => modifyNum('4')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>4</button>
                <button onClick={() => modifyNum('5')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>5</button>
                <button onClick={() => modifyNum('6')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>6</button>
                <button onClick={() => modifyNum2('-')} className='w-20 h-20 -2 rounded-full bg-[#FF9500] -[#FF9500]'>-</button>
                <button onClick={() => modifyNum('1')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>1</button>
                <button onClick={() => modifyNum('2')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>2</button>
                <button onClick={() => modifyNum('3')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>3</button>
                <button onClick={() => modifyNum2('+')} className='w-20 h-20 -2 rounded-full bg-[#FF9500] -[#FF9500]'>+</button>
                <button onClick={() => modifyNum('0')} className={`w-40 h-20 -2 rounded-full col-span-2 text-left px-8 bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>0</button>
                <button onClick={() => modifyNum2('.')} className={`w-20 h-20 -2 rounded-full bg-[${mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark}]`}>.</button>
                <button onClick={() => modifyNum2('=')} className='w-20 h-20 -2 rounded-full bg-[#FF9500] -[#FF9500]'>=</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  )
}
