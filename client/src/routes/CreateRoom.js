import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    props.history.push(`/room/${id}`);
  }

  return <button onClick={create}>Create Room</button>;
};

export default CreateRoom;

/*

Esse é um trecho de código em JavaScript, utilizando a biblioteca React e o pacote uuid para criar um identificador único universal (UUID).

A função CreateRoom é um componente funcional que recebe um objeto props como argumento. Dentro dela, há uma função create() que é chamada quando um botão é clicado. Essa função utiliza a função uuid() do pacote uuid para gerar um UUID, que é armazenado na constante id. Em seguida, a função push() do objeto history é usada para redirecionar o usuário para a URL /room/${id}.

O botão "Create Room" é renderizado na tela, e quando clicado, chama a função create(), que gera um UUID único e redireciona o usuário para uma nova página com o UUID como parte da URL.

Esse código é um exemplo de como o pacote uuid pode ser utilizado para gerar identificadores únicos em aplicações React.

 */
