import React, { useState } from "react";
import styles from "./Clientes.module.css";
import DataTable from "react-data-table-component";
import Navbar from "../components/Navbar.tsx";
import Cad_Clientes from "./Cad_Clientes";

interface Clientes {
  id?: number;
  nome: string;
  cnpj: number;
  telefone: number;
  endereco: string;
  descricao: string;
}

const Clientes = () => {
  const [data, setData] = useState<Clientes[]>([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState<number | null>(null);
  const [telefone, setTelefone] = useState<number | null>(null);
  const [endereco, setEndereco] = useState('');
  const [descricao, SetDescricao] = useState('');
  const [editar, setEditar] = useState(false);
  const [clienteId, setClienteId] = useState();
  
  const columns = [
    {
        name: "nome",
        selector: (row) => row.nome,
      },
      {
        name: "cnpj",
        selector: (row) => row.cnpj,
      },
      {
        name: "telefone",
        selector: (row) => row.telefone,
      },
      {
        cell: (row) => (
          <>
            <button onClick={() => handleEdit(row)}>Editar</button>
          </>
        ),
        widht: "100px",
        right: "true",
      }
  ]

  function handleEdit(cliente) {
    setEditar(true);

    setClienteId(cliente.id);
    setNome(cliente.nome);
    setCnpj(cliente.cpf);
    setEndereco(cliente.email);
    setTelefone(cliente.telefone);
  }

  function atualiza() {
    fetch(`http://localhost:3000/clientes/${clienteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: clienteId,
        nome: nome,
        cnpj: cnpj,
        endereco: endereco,
        telefone: telefone,
        descricao: descricao
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(clienteId);
        setNome(data.nome);
        setCnpj(data.cnpj);
        setEndereco(data.endereco);
        setTelefone(data.telefone);
        SetDescricao(data.descricao)
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  const busca = () => {
    setEditar(false);
    fetch("http://localhost:3000/clientes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const resultados = data.filter(
          (cliente) =>
            (nome ? cliente.nome.includes(nome) : true) &&
            (cnpj ? cliente.cnpj === cnpj : true) &&
            (endereco ? cliente.endereco.includes(endereco) : true) &&
            (telefone ? cliente.telefone === telefone : true)
        );
        setData(resultados);
      })
      .catch((err) => console.log(err));
  };



  return (
    <div className={styles.pai}>
        <Navbar linkTo='/cad_clientes' texto='Cadastrar cliente'/>
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
          onClick={(analista) => (editar ? atualiza() : busca())}

        >
       {editar === true ? "Editar" : "Pesquisar"}
        </button>
      </div>

      <div className={styles.grid}>
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
};

export default Clientes;
