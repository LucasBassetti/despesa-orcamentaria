##### Quantos Empenhos cujo valor total ainda não foi totalmente Pago?

``` sql
SELECT (count(?empenho) as ?nEmpenhos) WHERE {
  ?empenho a loa:Empenho ;
       loa:valorTotal ?valorTotalEmpenhado .
  ?pagamento a loa:Pagamento ;
       loa:depende ?empenho ;
       loa:valorTotal ?valorTotalPago

	FILTER(xsd:double(?valorTotalEmpenhado) > xsd:double(?valorTotalPago))
}
```

##### Quantos Empenhos cujo valor total já foi totalmente Pago?

``` sql
SELECT (count(?empenho) as ?nEmpenhos) WHERE {
  ?empenho a loa:Empenho ;
       loa:valorTotal ?valorTotalEmpenhado .
  ?pagamento a loa:Pagamento ;
       loa:depende ?empenho ;
       loa:valorTotal ?valorTotalPago

	FILTER(xsd:double(?valorTotalEmpenhado) = xsd:double(?valorTotalPago))
}
```

##### Qual Credor teve maior número de Empenhos?

``` sql
SELECT ?nome (count(?empenho) as ?nEmpenhos) WHERE {
  ?empenho a loa:Empenho ;
       loa:favorece ?credor .
  ?credor rdfs:label ?nome .
}
GROUP BY (?nome)
ORDER BY DESC(?nEmpenhos)
```

##### Qual Credor recebeu mais dinheiro?

``` sql
SELECT ?nome (SUM(xsd:double(?valorTotal)) as ?sumValorTotal) WHERE {
  ?pagamento a loa:Pagamento ;
       loa:valorTotal ?valorTotal ;
       loa:favorece ?credor .
  ?credor rdfs:label ?nome .
}
GROUP BY (?nome)
ORDER BY DESC(?sumValorTotal)
```

##### Qual o Credor com a maior quantidade de Empenhos não Pagos?

``` sql
SELECT ?nome (count(distinct ?empenho) as ?nEmpenhos) WHERE {
  ?empenho a loa:Empenho ;
       	   loa:favorece ?credor .
  ?pagamento a loa:Pagamento .
  ?credor rdfs:label ?nome .
  MINUS { ?pagamento loa:depende ?empenho }
}
GROUP BY (?nome)
ORDER BY DESC(?nEmpenhos)
```

##### Qual foi o maior Pagamento realizado?

``` sql
SELECT ?pagamento (SUM(xsd:double(?valorTotal)) as ?sumValorTotal) WHERE {
  ?pagamentoURI a loa:Pagamento ;
       loa:valorTotal ?valorTotal ;
	   rdfs:comment ?pagamento .
}
GROUP BY (?pagamento)
ORDER BY DESC(?sumValorTotal)
```

##### Qual o Subelemento de Despesa com maior número de Empenhos?

``` sql
SELECT ?subelementoLabel (count(?empenho) as ?nEmpenhos) WHERE {
  ?empenho a loa:Empenho ;
           loa:compostoDe ?itemDespesa .
  ?itemDespesa a ?subelementoDespesa .
  ?subelementoDespesa a loa:SubelementoDespesa ;
                      rdfs:label ?subelementoLabel .
}
GROUP BY (?subelementoLabel)
ORDER BY DESC(?nEmpenhos)
```

##### Qual o Elemento de Despesa com maior número de Empenhos?

``` sql
SELECT ?elementoLabel (count(?empenho) as ?nEmpenhos) WHERE {
  ?empenho a loa:Empenho ;
           loa:compostoDe ?itemDespesa .
  ?itemDespesa a ?elementoDespesa .
  ?elementoDespesa a loa:ElementoDespesa ;
                      rdfs:label ?elementoLabel .
}
GROUP BY (?elementoLabel)
ORDER BY DESC(?nEmpenhos)
```

##### Qual Subelemento de Despesa com maior valor empenhado?

``` sql
SELECT ?subelementoLabel (SUM(xsd:double(?valorTotal)) as ?sumValorTotal) WHERE {
  ?empenho a loa:Empenho ;
             loa:valorTotal ?valorTotal ;
             loa:compostoDe ?itemDespesa .
  ?itemDespesa a ?subelementoDespesa .
  ?subelementoDespesa a loa:SubelementoDespesa ;
                      rdfs:label ?subelementoLabel .
}
GROUP BY (?subelementoLabel)
ORDER BY DESC(?sumValorTotal)
```

##### Qual Subelemento de Despesa com maior valor pago?

``` sql
SELECT ?subelementoLabel (SUM(xsd:double(?valorTotal)) as ?sumValorTotal) WHERE {
  ?pagamengo a loa:Pagamento ;
             loa:valorTotal ?valorTotal ;
             loa:compostoDe ?itemPagamento .
  ?itemPagamento loa:paga ?subelementoDespesa .
  ?subelementoDespesa a loa:SubelementoDespesa ;
                      rdfs:label ?subelementoLabel .
}
GROUP BY (?subelementoLabel)
ORDER BY DESC(?sumValorTotal)
```

##### Qual Item de Despesa com maior valor empenhado?

``` sql
SELECT ?nomeItem ?subelementoLabel (SUM(xsd:double(?valorTotal)) as ?sumValorTotal) WHERE {
  ?empenho a loa:Empenho ;
             loa:compostoDe ?itemDespesa .
  ?itemDespesa a ?subelementoDespesa ;
               loa:valorTotal ?valorTotal ;
 			   rdfs:comment ?nomeItem .
  ?subelementoDespesa a loa:SubelementoDespesa ;
                      rdfs:label ?subelementoLabel .
}
GROUP BY (?nomeItem)(?subelementoLabel)
ORDER BY DESC(?sumValorTotal)
```
