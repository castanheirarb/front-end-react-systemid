import React, { useState } from 'react'
import Navbar from '../components/Navbar.tsx'
import styles from './cad_clientes.module.css'
import Clientes from './Clientes'

const Cad_Clientes = () => {

  
  const [data, setData] = useState<Clientes[]>([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState<number>(0);
  const [telefone, setTelefone] = useState<number>(0);
  const [endereco, setEndereco] = useState('');
  const [descricao, SetDescricao] = useState('');
  const [editar, setEditar] = useState(false);
  const [clienteId, setClienteId] = useState();
  
  const Clientes: Clientes =  {
    nome,
    cnpj,
    endereco,
    telefone,
    descricao,
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Clientes),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data)
        console.log(data);
      })
      .catch((err) => console.log(err));
    }

  return (
    <div>
      <div className={styles.pai}>
        <Navbar linkTo='/' texto='Início'/>
      <div className={styles.container}>
        <label className={styles.inputLabel}>
          Nome:
          <input
            type="text"
            className={styles.inputField}
            name="nome_cliente"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do cliente"
          />
        </label>
        <label className={styles.inputLabel}>
          CNPJ:
          <input
            type="text"
            className={styles.inputField}
            name="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(Number(e.target.value))}
            placeholder="CNPJ do analista"
          />
        </label>
        <label className={styles.inputLabel}>
          Endereço:
          <input
            type="text"
            className={styles.inputField}
            name="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="E-mail do endereço"
          />
        </label>
        <label className={styles.inputLabel}>
          Telefone:
          <input
            type="tel"
            className={styles.inputField}
            name="telefone"
            value={telefone}
            onChange={(e) => setTelefone(Number(e.target.value))}
            placeholder="Telefone do analista"
          />
        </label>
        <label className={styles.inputLabel}>
          Descrição cliente:
          <input
            type="text"
            className={styles.inputField}
            name="descricao"
            value={descricao}
            onChange={(e) => SetDescricao(e.target.value)}
            placeholder="Descrição do cliente"
          />
        </label>
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}

        >
       Cadastrar
        </button>
      </div>

      
    </div>
    </div>
  )
}

export default Cad_Clientes