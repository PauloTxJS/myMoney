import React from 'react';
import Rest from './rest';
import Header from './elements/Header';
import Meses from './Meses';
import AdicionarMes from './AdicionarMes';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

function App() {
  //const data = useGet('movimentacoes/2020-06')
  const data = useGet('meses')
  //const [postData, post] = usePost('movimentacoes/2020-06')
  //const [deleteData, remove] = useDelete()
  
  const saveNew = () => {
    //post({ valor: 10, descricao: 'olá' })
  }

  const doRemove = () => {
    //remove('movimentacoes/2020-06/-MAYmHr3wB4Sbhp_w8dT')
  }

  return (
    <div>
      <Header />
      <div className='container'>
        <AdicionarMes />
        <Meses />
      </div>
    </div>
  );
}

export default App;
