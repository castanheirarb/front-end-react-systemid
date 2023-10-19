import React, {  useState } from "react";
import styles from "./Analista.module.css";
import DataTable from "react-data-table-component";
import Navbar from '../components/Navbar.tsx';
import Cad_analista from "./Cad_analista.tsx";

interface Analista {
  id?: number;
  nome: string;
  cpf: number;
  email: string;
  peso_acesso: number;
  sexo: string;
  telefone: number;
  valor: number;
}

const Analista = () => {
  const [data, setData] = useState<Analista[]>([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState<number | null>(null);
  const [peso_acesso, setPesoAcesso] = useState(0);
  const [valor, setValor] = useState<number | null>(null);
  const [editar, setEditar] = useState(false);
  const [analistaId, setAnalistaId] = useState();

  const busca = () => {
    setEditar(false);
    fetch("http://localhost:3000/analistas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const resultados = data.filter(
          (analista) =>
            (nome ? analista.nome.includes(nome) : true) &&
            (cpf ? analista.cpf === cpf : true) &&
            (email ? analista.email.includes(email) : true) &&
            (telefone ? analista.telefone === telefone : true)
        );
        setData(resultados);
      })
      .catch((err) => console.log(err));
  };
  
  function handleEdit(analista) {
    setEditar(true);

    setNome(analista.nome);
    setCpf(analista.cpf);
    setEmail(analista.email);
    setTelefone(analista.telefone);
    setValor(analista.valor);
    setAnalistaId(analista.id);
  }

  function atualiza() {
    fetch(`http://localhost:3000/analistas/${analistaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: analistaId,
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        valor: valor,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(analistaId);
        setNome(data.nome);
        setCpf(data.cpf);
        setEmail(data.email);
        setTelefone(data.telefone);
        setValor(data.valor);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  const columns = [
    {
      name: "nome",
      selector: (row) => row.nome,
    },
    {
      name: "cpf",
      selector: (row) => row.cpf,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "peso_acesso",
      selector: (row) => row.peso_acesso,
      sortable: true,
    },
    {
      name: "sexo",
      selector: (row) => row.sexo,
    },
    {
      name: "number",
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
    },
  ];

 
  return (
    <div className={styles.pai}>
      <Navbar linkTo='/cad_analista' texto='Cadastrar analista'/>
      <div className={styles.container}>
        <label className={styles.inputLabel}>
          Nome:
          <input
            type="text"
            className={styles.inputField}
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do analista"
          />
        </label>
        <label className={styles.inputLabel}>
          CPF:
          <input
            type="text"
            className={styles.inputField}
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(Number(e.target.value))}
            placeholder="CPF do analista"
          />
        </label>
        <label className={styles.inputLabel}>
          Email:
          <input
            type="text"
            className={styles.inputField}
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail do analista"
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
          Valor hora:
          <input
            type="number"
            className={styles.inputField}
            name="valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            placeholder="Valor/hora do analista"
          />
        </label>
        <label className={styles.selectLabel}>
          <select
            name="seletor_peso"
            id="seletor_peso"
            className={styles.selectField}
            value={peso_acesso}
            onChange={(e) => setPesoAcesso(Number(e.target.value))}
          >
            <option value="1">ADM</option>
            <option value="2">Gerente de projetos</option>
            <option value="3">Analista</option>
          </select>
        </label>
        <label className={styles.selectLabel}>
          <select name="sexo" id="sexo" className={styles.selectField}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
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
        <DataTable
          columns={columns}
          data={data}
          pagination
          
        />
      </div>
    </div>
   
  );
};

export default Analista;
