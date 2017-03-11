### QC1. Quais despesas uma organização pública está autorizada a realizar de acordo com a LOA?

``` sql
SELECT DISTINCT
  ?unidadeOrcamentariaURI
WHERE {     
  ?unidadeOrcamentariaURI rdf:type odp:UnidadeOrcamentaria ;
    rdfs:label ?unidadeOrcamentaria ;
    odp:autorizadaAExecutarDespesaPor ?autorizacaoDespesa .
}
```

### QC2. Quais classificadores estão prescritos por uma determinada autorização de despesa?

``` sql
SELECT DISTINCT
  ?autorizacaoDespesa
  ?categoriaEconomica
  ?grupoDespesa
  ?modalidadeAplicacao
  ?esfera
  ?programa
  ?acao
  ?subtitulo
  ?funcao
  ?subfuncao
WHERE {     
  ?autorizacaoDespesa odp:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica ;  
    odp:prescreveGrupoDespesa/rdfs:label ?grupoDespesa ;
    odp:prescreveModalidadeAplicacao/rdfs:label ?modalidadeAplicacao ;
    odp:prescreveEsfera/rdfs:label ?esfera ;
    odp:prescrevePrograma/rdfs:label ?programa ;
    odp:prescreveAcao/rdfs:label ?acao ;
    odp:prescreveSubtitulo/rdfs:label ?subtitulo ;
    odp:prescreveFuncao/rdfs:label ?funcao ;
    odp:prescreveSubfuncao/rdfs:label ?subfuncao .
}
```

### QC3. Que ente federativo cria uma LOA e, portanto, concede autorizações de despesa nos orçamentos descritos por essa LOA?

``` sql
SELECT ?enteFederativo WHERE {   
  ?enteFederativoURI odp:cria ?LOA .   
  ?LOA rdf:type odp:LeiOrcamentariaAnual .   
  ?enteFederativoURI rdfs:label ?enteFederativo
}
```

### QC5. Quais empenhos foram feitos tendo como base uma determinada autorização de despesa?

``` sql
SELECT
  ?empenho
  ?autorizacaoDespesa
  ?urlPortal
WHERE {     
  ?empenho rdf:type odp:Empenho .
  ?empenho odp:refereSe ?autorizacaoDespesa .     
  ?empenho owl:sameAs ?urlPortal .
}

```

### QC6. Qual é a unidade gestora e o credor de um empenho?

``` sql
SELECT
  ?empenho
  ?credor
  ?unidadeGestora
WHERE {         
  ?empenho odp:favorece ?credorURI .
  ?credorURI rdfs:label ?credor .
  ?unidadeGestoraURI odp:realiza ?empenho ;
    rdfs:label ?unidadeGestora .
}
```

### QC7. Quais os itens relativos a materiais empenhados em um empenho e as quantidades e valores associados a esses itens?

``` sql
SELECT
  ?empenho
  ?itemEmpenho
  ?valorTotal
  ?quantidade
WHERE {
  ?empenho odp:compostoDe ?itemEmpenho .
  ?itemEmpenho odp:valorTotal ?valorTotal ;   
  odp:quantidade ?quantidade .  
}
```

### QC9. Quais são os classificadores dos itens que compõem um determinado empenho?

``` sql
SELECT DISTINCT
  ?empenho
  ?categoriaEconomica
  ?grupoDespesa
  ?modalidadeAplicacao
  ?esfera
  ?programa
  ?acao
  ?subtitulo
  ?funcao
  ?subfuncao
WHERE {
  ?empenho odp:refereSe ?autorizacaoDespesa .     
  ?autorizacaoDespesa odp:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica ;                         
    odp:prescreveGrupoDespesa/rdfs:label ?grupoDespesa ;   
    odp:prescreveModalidadeAplicacao/rdfs:label ?modalidadeAplicacao ;
    odp:prescreveEsfera/rdfs:label ?esfera ;
    odp:prescrevePrograma/rdfs:label ?programa ;
    odp:prescreveAcao/rdfs:label ?acao ;   
    odp:prescreveSubtitulo/rdfs:label ?subtitulo ;
    odp:prescreveFuncao/rdfs:label ?funcao ;  
    odp:prescreveSubfuncao/rdfs:label ?subfuncao .
}
```

### QC10. Quais unidades gestoras empenharam recursos de uma determinada autorização da despesa?

``` sql
SELECT DISTINCT
  ?unidadeGestora
  ?autorizacaoDespesa
WHERE {   
  ?unidadeGestoraURI odp:realiza ?empenho ;
    rdfs:label ?unidadeGestora .   
  ?empenho a odp:Empenho ;
    odp:refereSe ?autorizacaoDespesa .
}
```

### QC11. Quais credores foram favorecidos com empenhos relacionados a uma determinada autorização de despesa?

``` sql
SELECT DISTINCT
  ?credor
  ?autorizacaoDespesa
WHERE {   
  ?empenho a odp:Empenho ;
    odp:favorece ?credorURI ;            
    odp:refereSe ?autorizacaoDespesa .   
  ?credorURI rdfs:label ?credor .
}
```

### QC12. Em um exercício fiscal, Quanto foi empenhado a determinado credor?

``` sql
SELECT DISTINCT
  ?credor
  ?autorizacaoDespesa
WHERE {   
  ?empenho a odp:Empenho ;
    odp:favorece ?credorURI ;            
    odp:refereSe ?autorizacaoDespesa .   
  ?credorURI rdfs:label ?credor .
}
```

### QC13. Em um exercício fiscal, Qual valor empenhado para determinado classificador de despesa?

``` sql
SELECT
  ?programa
  (SUM(xsd:double(?valorTotal)) as ?valorEmpenhado)
WHERE {     
  ?empenho a odp:Empenho ;
    odp:refereSe ?autorizacaoDespesa ;
    odp:valorTotal ?valorTotal .
  ?autorizacaoDespesa odp:prescrevePrograma/rdfs:label ?programa .
}
GROUP BY ?programa ORDER BY DESC(?valorEmpenhado)
```

### QC14. Em um exercício fiscal, qual o valor empenhado por uma unidade gestora?

``` sql
SELECT
  ?unidadeGestora
  (SUM(xsd:double(?valorTotal)) as ?valorEmpenhado)
WHERE {     
  ?unidadeGestoraURI odp:realiza ?empenho ;
    rdfs:label ?unidadeGestora .
  ?empenho a odp:Empenho ;
    odp:valorTotal ?valorTotal .       
}
GROUP BY ?unidadeGestora ORDER BY DESC(?valorEmpenhado)
```

### QC15. Qual é a unidade gestora e o credor de uma liquidação?

``` sql
SELECT
  ?liquidacao
  ?credor
  ?unidadeGestora
WHERE {   
  ?liquidacao odp:quita/rdfs:label ?credor .   
  ?unidadeGestoraURI odp:realiza ?liquidacao ;
    rdfs:label ?unidadeGestora .
}
```

### QC16. Quais os itens liquidados em uma liquidação e os valores associados a esses itens?

``` sql
SELECT
  ?liquidacao
  ?itemLiquidacao
  ?valorTotal
WHERE {   
  ?liquidacao odp:compostoDe ?itemLiquidacao .   
  ?itemLiquidacao odp:valorTotal ?valorTotal .
}
```

### QC17. A quais empenhos se referem uma liquidação e seus itens?

``` sql
SELECT
  ?liquidacao
  ?itemLiquidacao
  ?empenho
WHERE {   
  ?liquidacao odp:depende ?empenho ;
    odp:compostoDe ?itemLiquidacao .
}
```

### QC19. Quais liquidações foram feitas tendo como base uma determinada autorização de despesa?

``` sql
SELECT
  ?liquidacao
  ?autorizacaoDespesa
  ?urlPortal
WHERE {     
  ?liquidacao rdf:type odp:Liquidacao ;
    odp:depende ?empenho ;
    owl:sameAs ?urlPortal .
  ?empenho rdf:type odp:Empenho ;
    odp:refereSe ?autorizacaoDespesa .
}
```

### QC20. Em um exercício fiscal, quanto foi liquidado a um determinado credor?

``` sql
SELECT
  ?credor
  (SUM(xsd:double(?valorTotal)) as ?valorLiquidado)
WHERE {   
  ?liquidacao a odp:Liquidacao ;
    odp:quita ?credor;
    odp:compostoDe ?itemLiquidacao .
  ?itemLiquidacao odp:valorTotal ?valorTotal .
}
GROUP BY ?credor
```

### QC21. Em um exercício fiscal, quanto foi liquidado de determinada unidade gestora?

``` sql
SELECT ?unidadeGestora (SUM(xsd:double(?valorTotal)) as ?valorLiquidado) WHERE {   
  ?unidadeGestoraURI odp:realiza ?liquidacao ;
    rdfs:label ?unidadeGestora .
  ?liquidacao a odp:Liquidacao ;
    odp:compostoDe ?itemLiquidacao .
  ?itemLiquidacao odp:valorTotal ?valorTotal .
}
GROUP BY ?unidadeGestora ORDER BY DESC(?valorLiquidado)
```

### QC22. Qual é a unidade gestora que realizou um pagamento e qual o credor favorecido por esse pagamento?

``` sql
SELECT
  ?pagamento
  ?unidadeGestora
  ?credor
WHERE {   
  ?pagamento odp:favorece/rdfs:label ?credor .   
  ?unidadeGestoraURI odp:realiza ?pagamento ;
    rdfs:label ?unidadeGestora .
}
```

### QC23. De quais liquidações um pagamento depende?

``` sql
SELECT
  ?liquidacao
  ?pagamento
WHERE {
  ?pagamento odp:depende ?liquidacao .   
  ?liquidacao rdf:type odp:Liquidacao .
}
```

### QC24. A que empenho se refere um item de pagamento?

``` sql
SELECT
  ?itemPagamento
  ?empenho
WHERE {   
  ?itemPagamento odp:depende ?empenho .   
  ?empenho rdf:type odp:Empenho .
}
```

### QC25. Quais pagamentos foram feitos tendo como base uma determinada autorização de despesa da LOA?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390`

``` sql
SELECT
  ?pagamento
  ?autorizacaoDespesa
  ?urlPortal
WHERE {     
  ?pagamento rdf:type odp:Pagamento ;
    odp:depende ?empenho ;
    owl:sameAs ?urlPortal .     
  ?empenho rdf:type odp:Empenho ;
    odp:refereSe ?autorizacaoDespesa .
}
```

### QC26. Quanto do valor de uma autorização de despesa da LOA foi efetivamente objeto de pagamentos?

``` sql
SELECT
  ?autorizacaoDespesa
  (SUM(xsd:double(?valorTotalAD)) as ?valorAD)
  (SUM(xsd:double(?valorTotalPago)) as ?valorPago)
WHERE {
  ?pagamento rdf:type odp:Pagamento ;
    odp:depende ?empenho ;
    odp:valorTotal ?valorTotalPago ;
    owl:sameAs ?urlPortal .     
  ?empenho rdf:type odp:Empenho ;
    odp:refereSe ?autorizacaoDespesa .
  ?autorizacaoDespesa odp:valorDotacaoInicial ?valorTotalAD .
}
GROUP BY ?autorizacaoDespesa
```

### QC27. Em um exercício fiscal, quanto foi pago a determinado credor?

``` sql
SELECT
  ?autorizacaoDespesa
  (SUM(xsd:double(?valorTotalAD)) as ?valorAD)
  (SUM(xsd:double(?valorTotalPago)) as ?valorPago)
WHERE {
  ?pagamento rdf:type odp:Pagamento ;
    odp:depende ?empenho ;
    odp:valorTotal ?valorTotalPago ;
    owl:sameAs ?urlPortal .     
  ?empenho rdf:type odp:Empenho ;
    odp:refereSe ?autorizacaoDespesa .
  ?autorizacaoDespesa odp:valorDotacaoInicial ?valorTotalAD .
}
GROUP BY ?autorizacaoDespesa
```

### QC28. Em um exercício fiscal, quanto foi pago por determinada unidade gestora?

``` sql
SELECT ?unidadeGestora (SUM(xsd:double(?valorTotal)) as ?valorPago) WHERE {  
  ?unidadeGestoraURI odp:realiza ?pagamento ;  
    rdfs:label ?unidadeGestora .
  ?pagamento a odp:Pagamento ;
    odp:compostoDe ?itemPagamento .   
  ?itemPagamento odp:valorTotal ?valorTotal .
}
GROUP BY ?unidadeGestora ORDER BY DESC(?valorPago)
```
