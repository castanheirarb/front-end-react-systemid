import React from "react";
import styles from "./Cad_analista.module.css";
import Analista from "./analista";
import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Home from "./Home.tsx";

const Cad_analista = () => {
  const [data, setData] = useState<Analista[]>([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState<number>(0);
  const [peso_acesso, setPesoAcesso] = useState<number>(0);
  const [sexo, setSexo] = useState<string>("");
  const [valor, setValor] = useState<number>(0)

  const analista: Analista = {
    nome,
    cpf,
    email,
    telefone,
    sexo,
    peso_acesso,
    valor
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/analistas", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(analista),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data)
        console.log(data);
      })
      .catch((err) => console.log(err));


  };

  return (
    <div className={styles.pai}>
      <Navbar linkTo='/' texto='Inicial'/>
      <div className={styles.container}>
        <label className={styles.inputLabel}>
          Nome:
          <input type="text" className={styles.inputField} name="nome" value={nome} onChange={e => setNome(e.target.value)} />
        </label>
        <label className={styles.inputLabel}>
          CPF:
          <input type="text" className={styles.inputField} name="cpf" value={cpf} onChange={e => setCpf(Number(e.target.value))} />
        </label>
        <label className={styles.inputLabel}>
          Email:
          <input type="text" className={styles.inputField} name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className={styles.inputLabel}>
          Telefone:
          <input type="number" className={styles.inputField} name="telefone" value={telefone} onChange={e => setTelefone(Number(e.target.value))} />
        </label>
        <label className={styles.inputLabel}>
          Valor hora:
          <input
            type="number"
            className={styles.inputField}
            name="valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </label>
        <label className={styles.selectLabel}>
        <select name="seletor_peso" id="seletor_peso" className={styles.selectField} value={peso_acesso} onChange={(e) => setPesoAcesso(Number(e.target.value))}>
            <option value="1">ADM</option>
            <option value="2">Gerente de projetos</option>
            <option value="3">Analista</option>
          </select>
        </label>
        <label className={styles.selectLabel}>
        <select name="sexo" id="sexo" className={styles.selectField} value={sexo} onChange={e => setSexo(e.target.value)}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </label>
        
        <button type="button" className={styles.submitButton} onClick={handleSubmit}>
          Cadastrar
        </button>
      </div>

      <div className={styles.grid}></div>
    </div>
  );
};

export default Cad_analista;
