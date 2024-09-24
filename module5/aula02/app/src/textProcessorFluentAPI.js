// regex:  (?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$

// o objetivo do Fluent APi ' executar tarefas
// Como um pipeline, step by step
// e no fim, chama o build. Muito similar ao padrão Builder
// a diferença que aqui é sobre processos,  o Builder sobre construção de objetos
class TextProcessorFluentAPI {
  // propriedade privada
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados de virão depois desse grupo
    // [contratante|contratada] ou um ou outro, (e tem a flag no fim da expressão para pegar maiúsculo e minusculo)
    // :\s{1} vai procurar o caractere literal do dois pontos seguindo de um espaço
    // tudo acima fica dentro de um parenteses para falar "vamos pegar dai para frente"

    // (?!s) negative look around, vai ignorar os contratantes do fil do documento (que tem so espaço a frente deles)
    // .*\n pega qualquer coisa até o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrência, assim ele evita ficar em loop

    // $ informar que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> case insensitive, pode ser Maiúsculo ou minusculo

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi
    const onlyPerson = this.#content.match(matchPerson)
    // console.log('onlyPerson', onlyPerson,test(this.#content))
    this.#content = onlyPerson
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI

// 13:00