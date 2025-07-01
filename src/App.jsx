import { Fundo } from "./components/Fundo";
import { Container } from "./containers";
import { Campo } from "./components/Campo";
import { Botao } from "./components/Botao";
import { NomePokemon } from "./components/NomePokemon";
import { Foto } from "./components/Imagem";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { useState } from "react";
import EstiloGlobal from "./styles";


function App() {
  const [nomePokemo, setNomePokemon] = useState('')
  const [nameId , setNameId] = useState('')
  const [imagem, setImagem] = useState('')

  console.log('renderizou')
  

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
    <>
      <EstiloGlobal/>
      <Fundo>
        <Container>
          <Header>PokéDex</Header>
          <Form>
            <Campo type="text" onBlur={evento => setNameId(evento.target.value)} placeholder="Digite um nome ou ID" />
            <Botao disabled={nameId === ''} onClick={pegaAPI}>Buscar Pokémon</Botao>
            <NomePokemon>{nomePokemo}</NomePokemon>
            {imagem ? (<Foto src={imagem}/>) : null}
          </Form>
        </Container>
      </Fundo>
    </>
  )
}

export default App
