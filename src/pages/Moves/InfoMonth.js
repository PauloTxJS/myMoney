import React from 'react';
import { useMonthApi } from '../../api';

const InfoMonth = ({ data }) => {
    const { infoMonth, changeMonth } = useMonthApi(data)

    const changeInputForecast = (evt) => {
        changeMonth({ previsao_entrada: evt.target.value})
    }
    
    const changeExitForecast = (evt) => {
        changeMonth({ previsao_saida: evt.target.value})
    }
    
    if (infoMonth.loading) {
        return <p>Loading data month...</p>
    }
    if (infoMonth.data) {
        return (
            <div>
                <span>Previsão entrada: {infoMonth.data.previsao_entrada}</span> <input type='text' onBlur={changeInputForecast}/> / Previsão saída: {infoMonth.data.previsao_saida} <input type='text' onBlur={changeExitForecast}/> <br />
                Entradas: {infoMonth.data.entradas} / Saídas: {infoMonth.data.saidas}    
            </div>
        )
    }
    return null
}

export default InfoMonth