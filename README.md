# Despesa Orçamentária
Repositório para o conteúdo sobre autorização e execução da despesa orçamentária brasileira.

Para o estudo de caso, foram utilizados dados sobre execução orçamentária do [Portal de Transparência](http://www.portaltransparencia.gov.br/) com as seguintes características:

* **Período:** 01/01/2016 - 28/02/2016
* **Órgão Superior:** Ministério da Educação
* **Órgão / Entidade Vinculada:** Universidade Federal do Espírito Santo

### Ontologia

A ontologia encontra-se nos formatos disponíveis nos links abaixo.

* [Ontogia de Referência (OntoUML)](http://ontology.com.br/loa/spec/)
* [Ontogia Operacional (RDF/OWL)](https://github.com/LucasBassetti/despesa-orcamentaria/blob/master/ontologia/loa.owl)
* [Menthor](https://github.com/LucasBassetti/despesa-orcamentaria/blob/master/ontologia/loa.menthor) ([Link da Ferramenta](http://menthor.net))

### Questões de Competência

Questões de Competência (QCs) são um meio de especificar requisitos funcionais da ontologia, na medida em que referem-se ao conhecimento a ser representado na ontologia.

Questões de competência foram implementadas em consultas SPARQL dando origem a casos de teste para validação da ontologia. Cada questão apresenta sua respectiva consulta SPARQL, cuja resposta pode ser testada no endpoint disponibilizado.

* [Questões de Competência](https://github.com/LucasBassetti/despesa-orcamentaria/tree/master/questoes-de-competencia)

### SPARQL Endpoint

As questões de competência podem ser testadas no endpoint presente no link abaixo.

* [SPARQL Endpoint](http://dev.nemo.inf.ufes.br:5820/dpf#!/query)
* **Username:** ``` nemo ```
* **Password:** ``` nemo ```

### Aplicação de Demonstração

* [API](https://github.com/LucasBassetti/despesa-orcamentaria/tree/master/api)
* [Aplicação](https://github.com/LucasBassetti/despesa-orcamentaria/tree/master/loa-app)

### Autores

1. [Archimedes A. Detoni](http://www.informatica.ufes.br/pos-graduacao/PPGI/detalhes-de-pessoal?id=9227)
2. [João Paulo A. Almeida](http://nemo.inf.ufes.br/jpalmeida/)
3. [Lucas Bassetti R. da Fonseca](http://lucasbassetti.com.br)
4. [Ricardo de Almeida Falbo](http://www.inf.ufes.br/~falbo/)
