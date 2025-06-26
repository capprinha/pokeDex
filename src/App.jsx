import { Fundo } from "./components/Fundo/index";
import { Container } from "./containers/index";
import { Campo } from "./components/Campo/index";
import { Botao } from "./components/Botao/index";
import { NomePokemon } from "./components/NomePokemon/index";
import { Foto } from "./components/Imagem/index";
import { Form } from "./components/Form/index";
import { Header } from "./components/Header/index";
import { useState } from "react";
import './index.css'


function App() {
  const [nomePokemo, setNomePokemon] = useState('')
  const [nameId , setNameId] = useState('')
  const [imagem, setImagem] = useState('')

  

  async function pegaAPI() {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId.toLowerCase()}`);
    try{
      if(resp.status === 200){
        const data = await resp.json();
        setNomePokemon(data.name);
        setImagem(data.sprites.front_default);
      } else {
        setNomePokemon('Pokémon não encontrado, tente novamente');
      }
    } catch(e){
      setNomePokemon(e);
    }
  }

  return (
    <Fundo>
      <Container>
        <Header>PokéDex</Header>
        <Form>
          <Campo type="text" onChange={evento => setNameId(evento.target.value)} />
          <Botao disabled={nameId === ''} onClick={pegaAPI}>Buscar Pokémon</Botao>
          <NomePokemon>{nomePokemo}</NomePokemon>
          {imagem ? (<Foto src={imagem}/>) : null}
        </Form>
      </Container>
    </Fundo>
  )
}

export default App
