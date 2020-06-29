import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'

const minYear = 2020
const maxYear = 2022

const AddMonth = () => {

    const refYear = useRef()
    const refMonth = useRef()
    const [redir, setRedir] = useState('') 
    const years = []
    const months = []


    for(let i = minYear; i <= maxYear; i++) {
        years.push(i);        
    }
    for(let i = 1; i <= 12; i++) {
        months.push(i);        
    }
    
    const zeroPad = num => {
        if(num < 10) {
            return '0' + num; 
        }
        return num;
    }

    const lookMonth = () => {
        setRedir(refYear.current.value + '-' + refMonth.current.value);
    }
    if(redir !== '') {
        return <Redirect to={'/movimentacoes/' + redir} />
    }

    return (
        <React.Fragment>
            <h2>Adicionar mês</h2>
            <select ref={refYear}>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
            <select ref={refMonth}>
                {months.map(zeroPad).map(month => <option key={month} value={month}>{month}</option>)}
            </select>
            <button onClick={lookMonth}>Adicionar mês</button>
        </React.Fragment>
    )
}

export default AddMonth