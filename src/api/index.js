import Rest from '../usefull/rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

export const useMonthApi = (data) => {
    const infoMonth = useGet(`meses/${data}`)
    const [dataPatch, changeMonth] = usePatch(`meses/${data}`)
    return { infoMonth, changeMonth }
}

export const useMovesApi = (data) => {
    const moves = useGet(`movimentacoes/${data}`)
    const [postData, saveNewMoves] = usePost(`movimentacoes/${data}`)
    const [removeData, removeMoves] = useDelete()
    return { moves, saveNewMoves, removeMoves }
}