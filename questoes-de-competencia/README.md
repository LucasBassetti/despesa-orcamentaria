### QC1. Que ente federativo cria uma LOA e, portanto, concede autorizações de despesa nos orçamentos descritos por essa LOA? *

``` sql
SELECT ?enteFederativo WHERE {
  ?enteFederativoURI loa:cria ?LOA .
  ?LOA rdf:type loa:LeiOrcamentariaAnual .
  ?enteFederativoURI rdfs:label ?enteFederativo
}
```

### QC2. Que tipos de orçamentos podem ser descritos em uma LOA?

``` sql
SELECT ?orcamento WHERE {
  ?orcamento rdfs:subClassOf loa:Orcamento
}
```

### QC3. Quais despesas uma organização pública está autorizada a realizar de acordo com a LOA? *

``` sql
SELECT DISTINCT ?unidadeOrcamentariaURI ?categoriaEconomica ?grupoDespesa ?modalidadeAplicacao
WHERE {
    ?unidadeOrcamentariaURI rdf:type loa:UnidadeOrcamentaria ;
                         	rdfs:label ?unidadeOrcamentaria ;
    					 	loa:autorizadaAExecutarDespesaPor ?autorizacaoDespesa .
    ?autorizacaoDespesa loa:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica ;
                        loa:prescreveGrupoDespesa/rdfs:label ?grupoDespesa ;
                        loa:prescreveModalidadeAplicacao/rdfs:label ?modalidadeAplicacao .
}
```

### QC4. Quais classificadores estão prescritos por uma determinada autorização da despesa?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490`

``` sql
SELECT DISTINCT ?categoriaEconomica ?grupoDespesa ?modalidadeAplicacao ?esfera ?programa ?acao ?subtitulo ?funcao ?subfuncao
WHERE {
    <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490> loa:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica ;
                        loa:prescreveGrupoDespesa/rdfs:label ?grupoDespesa ;
                        loa:prescreveModalidadeAplicacao/rdfs:label ?modalidadeAplicacao ;
                        loa:prescreveEsfera/rdfs:label ?esfera ;
                        loa:prescrevePrograma/rdfs:label ?programa ;
                        loa:prescreveAcao/rdfs:label ?acao ;
                        loa:prescreveSubtitulo/rdfs:label ?subtitulo ;
    					loa:prescreveFuncao/rdfs:label ?funcao ;
                        loa:prescreveSubfuncao/rdfs:label ?subfuncao .
}
```

### QC5. Quais empenhos foram feitos tendo como base uma determinada autorização de despesa da LOA?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490`

``` sql
SELECT ?empenho ?urlPortal WHERE {
    ?empenho rdf:type loa:Empenho .
	?empenho loa:conformidadeCom <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490> .
    ?empenho owl:sameAs ?urlPortal .
}
```

### QC6. Qual é a unidade gestora e o credor de um empenho?

Exemplo URI Empenho: `http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027`

``` sql
SELECT ?credor ?unidadeGestora WHERE {
    <http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027> loa:favorece ?credorURI .
    ?credorURI rdfs:label ?credor .
  	?unidadeGestoraURI loa:realiza <http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027> ;
                    rdfs:label ?unidadeGestora .
}
```

### QC7. Quais os itens empenhados em um empenho e as quantidades e valores associados a esses itens?

Exemplo URI Empenho: `http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027`

``` sql
SELECT ?itemEmpenho ?valorTotal ?quantidade WHERE {
    <http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027> loa:compostoDe ?itemEmpenho .
    ?itemEmpenho loa:valorTotal ?valorTotal ;
                 loa:quantidade ?quantidade .

}
```

### QC8. Quais classificadores estão prescritos por um determinado empenho e seus itens?

Exemplo URI Empenho: `http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027`

``` sql
SELECT DISTINCT ?autorizacaoDespesa ?categoriaEconomica ?grupoDespesa ?modalidadeAplicacao ?esfera ?programa ?acao ?subtitulo ?funcao ?subfuncao
WHERE {
    <http://ontology.com.br/loa/resource/empenho/2016/153048152252016NE800027> loa:conformidadeCom ?autorizacaoDespesa .
    ?autorizacaoDespesa loa:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica ;
                        loa:prescreveGrupoDespesa/rdfs:label ?grupoDespesa ;
                        loa:prescreveModalidadeAplicacao/rdfs:label ?modalidadeAplicacao ;
                        loa:prescreveEsfera/rdfs:label ?esfera ;
                        loa:prescrevePrograma/rdfs:label ?programa ;
                        loa:prescreveAcao/rdfs:label ?acao ;
                        loa:prescreveSubtitulo/rdfs:label ?subtitulo ;
    					loa:prescreveFuncao/rdfs:label ?funcao ;
                        loa:prescreveSubfuncao/rdfs:label ?subfuncao .
}
```

### QC9. Quanto foi empenhado a determinado credor?

Exemplo URI Credor: `http://ontology.com.br/loa/resource/credor/1530461522`

``` sql
SELECT ((SUM(xsd:double(?valorTotal)) - SUM(xsd:double(?valorTotalAnulacao))) as ?valorEmpenhado) WHERE {
  	{
      ?empenho a loa:Empenho ;
             loa:favorece <http://ontology.com.br/loa/resource/credor/1530461522> ;
             loa:valorTotal ?valorTotal .
      MINUS {
          ?empenho a loa:EmpenhoAnulacao .  
      }
    } UNION {
      ?empenho a loa:EmpenhoAnulacao ;
             loa:favorece <http://ontology.com.br/loa/resource/credor/1530461522> ;
             loa:valorTotal ?valorTotalAnulacao .
    }
}
```

### QC10. Qual valor empenhado para determinado classificador de despesa?

``` sql
SELECT ?programa ((SUM(xsd:double(?valorTotal)) - SUM(xsd:double(?valorTotalAnulacao))) as ?valorEmpenhado) WHERE {
  	{
      ?empenho a loa:Empenho ;
             loa:conformidadeCom ?autorizacaoDespesa ;
             loa:valorTotal ?valorTotal .
      ?autorizacaoDespesa loa:prescrevePrograma/rdfs:label ?programa .
      MINUS {
          ?empenho a loa:EmpenhoAnulacao .  
      }
    } UNION {
      ?empenho a loa:EmpenhoAnulacao ;
             loa:conformidadeCom ?autorizacaoDespesa ;
             loa:valorTotal ?valorTotalAnulacao .
      ?autorizacaoDespesa loa:prescrevePrograma/rdfs:label ?programa .
    }
}
GROUP BY ?programa
ORDER BY DESC(?valorEmpenhado)
```

### QC11. Quais unidades gestoras empenharam recursos de uma determinada autorização da despesa?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490`

``` sql
SELECT DISTINCT ?unidadeGestora WHERE {
  ?unidadeGestoraURI loa:realiza ?empenho ;
  				  	 rdfs:label ?unidadeGestora .
  ?empenho a loa:Empenho ;
           loa:conformidadeCom <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490> .
}
```

### QC12. Qual unidade gestora teve maior volume de recursos empenhados?

``` sql
SELECT ?unidadeGestora ((SUM(xsd:double(?valorTotal)) - SUM(xsd:double(?valorTotalAnulacao))) as ?valorEmpenhado) WHERE {
  	{
      ?unidadeGestoraURI loa:realiza ?empenho ;
  				  	     rdfs:label ?unidadeGestora .
      ?empenho a loa:Empenho ;
             loa:valorTotal ?valorTotal .
      MINUS {
          ?empenho a loa:EmpenhoAnulacao .  
      }
    } UNION {
      ?unidadeGestoraURI loa:realiza ?empenho ;
  				  	     rdfs:label ?unidadeGestora .
      ?empenho a loa:EmpenhoAnulacao ;
             loa:valorTotal ?valorTotalAnulacao .
    }
}
GROUP BY ?unidadeGestora
ORDER BY DESC(?valorEmpenhado)
```

### QC13. Quais credores foram favorecidos por determinada autorização da despesa?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490`

``` sql
SELECT DISTINCT ?credor WHERE {
  ?empenho a loa:Empenho ;
           loa:favorece ?credorURI ;
           loa:conformidadeCom <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020RK0032123641200004490> .
  ?credorURI rdfs:label ?credor .
}
```

### QC14. Como um material prescrito em um determinado item de empenho é classificado? *

Exemplo URI Item de Empenho: `http://ontology.com.br/loa/resource/item-empenho/2016/30/7/153048152252016NE800027/7837969`

``` sql
SELECT ?classificador WHERE {
  <http://ontology.com.br/loa/resource/item-empenho/2016/30/7/153048152252016NE800027/7837969> loa:descreve ?material .
  ?material rdf:type/rdfs:label ?classificador .
}
```

### QC15. Qual é a unidade gestora e o credor de uma liquidação?

Exemplo URI Liquidação: `http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043`

``` sql
SELECT ?credor ?unidadeGestora WHERE {
  <http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043> loa:quita/rdfs:label ?credor .
  ?unidadeGestoraURI loa:realiza <http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043> ;
                     rdfs:label ?unidadeGestora .
}
```

### QC16. Quais os itens liquidados em uma liquidação e os valores associados a esses itens?

Exemplo URI Liquidação: `http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043`

``` sql
SELECT ?itemLiquidacao ?valorTotal WHERE {
  <http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043> loa:compostoDe ?itemLiquidacao .
  ?itemLiquidacao loa:valorTotal ?valorTotal .
}
```

### QC17. A quais empenhos uma liquidação e seus itens se referem?

Exemplo URI Liquidação: `http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043`

``` sql
SELECT ?empenho WHERE {
  <http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043> loa:depende ?empenho .
}
```

### QC18. Quais os materiais liquidados por um item de liquidação? *

Exemplo URI Liquidação: `http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043`

``` sql
SELECT ?materialLiquidado WHERE {
  <http://ontology.com.br/loa/resource/liquidacao/2016/153048152252016NS000043> loa:compostoDe ?itemLiquidacao .
  ?itemLiquidacao loa:liquida ?materialLiquidado .
}
```

### QC19. Quais liquidações foram feitas tendo como base uma determinada autorização de despesa da LOA?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390`

``` sql
SELECT ?liquidacao ?urlPortal WHERE {
    ?liquidacao rdf:type loa:Liquidacao ;
              loa:depende ?empenho ;
              owl:sameAs ?urlPortal .
    ?empenho rdf:type loa:Empenho ;
			 loa:conformidadeCom <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390> .
}
```

### QC20. Quanto foi liquidado a um determinado credor?

Exemplo URI Credor: `http://ontology.com.br/loa/resource/credor/1530461522`

``` sql
SELECT (SUM(xsd:double(?valorTotal)) as ?valorLiquidado) WHERE {
  ?liquidacao a loa:Liquidacao ;
              loa:quita <http://ontology.com.br/loa/resource/credor/1530461522> ;
              loa:compostoDe ?itemLiquidacao .
  ?itemLiquidacao loa:valorTotal ?valorTotal .
}
```

### QC21. Qual valor liquidado para determinado classificador de despesa?

Exemplo: Categoria Econômica

``` sql
SELECT ?categoriaEconomica (SUM(xsd:double(?valorTotal)) as ?valorLiquidado) WHERE {
  ?liquidacao a loa:Liquidacao ;
              loa:depende ?empenho ;
              loa:compostoDe ?itemLiquidacao .
  ?itemLiquidacao loa:valorTotal ?valorTotal .
  ?empenho loa:conformidadeCom ?autorizacaoDespesa .
  ?autorizacaoDespesa loa:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica .
}
GROUP BY ?categoriaEconomica
```

### QC22. Qual unidade gestora teve maior volume de recursos liquidados?

``` sql
SELECT ?unidadeGestora (SUM(xsd:double(?valorTotal)) as ?valorLiquidado) WHERE {
  ?unidadeGestoraURI loa:realiza ?liquidacao ;
                     rdfs:label ?unidadeGestora .
  ?liquidacao a loa:Liquidacao ;
                loa:compostoDe ?itemLiquidacao .
  ?itemLiquidacao loa:valorTotal ?valorTotal .
}
GROUP BY ?unidadeGestora
ORDER BY DESC(?valorLiquidado)
```

### QC23. Qual é a unidade gestora que realizou um pagamento e qual o credor favorecido por esse pagamento?

Exemplo URI Pagamento: `http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118`

``` sql
SELECT ?unidadeGestora ?credor WHERE {
  <http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118> loa:favorece/rdfs:label ?credor .
  ?unidadeGestoraURI loa:realiza <http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118> ;
                     rdfs:label ?unidadeGestora .
}
```

### QC24. A quais liquidações um pagamento se refere?

Exemplo URI Pagamento: `http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118`

``` sql
SELECT ?liquidacao WHERE {
  <http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118> loa:depende ?liquidacao .
  ?liquidacao rdf:type loa:Liquidacao .
}
```

### QC25. A que empenho se refere um item de pagamento?

Exemplo URI Pagamento: `http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118`

``` sql
SELECT ?empenho WHERE {
  <http://ontology.com.br/loa/resource/pagamento/2016/153048152252016OB800118> loa:compostoDe ?itemPagamento .
  ?itemPagamento loa:depende ?empenho .
  ?empenho rdf:type loa:Empenho .
}
```

### QC26. Quais pagamentos foram feitos tendo como base uma determinada autorização de despesa da LOA?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390`

``` sql
SELECT ?pagamento ?urlPortal WHERE {
    ?pagamento rdf:type loa:Pagamento ;
               loa:depende ?empenho ;
               owl:sameAs ?urlPortal .
    ?empenho rdf:type loa:Empenho ;
			 loa:conformidadeCom <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390> .
}
```

### QC27. Quanto do valor de uma autorização de despesa da LOA foi efetivamente objeto de pagamentos?

Exemplo URI Autorização: `http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390`

``` sql
SELECT (SUM(xsd:double(?valorTotalAD)) as ?valorAD) (SUM(xsd:double(?valorTotalPago)) as ?valorPago) WHERE {
    ?pagamento rdf:type loa:Pagamento ;
               loa:depende ?empenho ;
               loa:valorTotal ?valorTotalPago ;
               owl:sameAs ?urlPortal .
    ?empenho rdf:type loa:Empenho ;
			 loa:conformidadeCom <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390> .
    <http://ontology.com.br/loa/resource/autorizacao-despesa/2016/20161208020GK0032123645000003390> loa:valorDotacaoInicial ?valorTotalAD .
}
```

### QC28. Quanto foi pago a determinado credor?

Exemplo URI Credor: `http://ontology.com.br/loa/resource/credor/1530461522`

``` sql
SELECT (SUM(xsd:double(?valorTotal)) as ?valorPago) WHERE {
  ?pagamento a loa:Pagamento ;
             loa:favorece <http://ontology.com.br/loa/resource/credor/1530461522> ;
			 loa:valorTotal ?valorTotal .
}
```

### QC29. Qual unidade gestora teve maior volume de recursos pagos?

``` sql
SELECT ?unidadeGestora (SUM(xsd:double(?valorTotal)) as ?valorPago) WHERE {
  ?unidadeGestoraURI loa:realiza ?pagamento ;
                     rdfs:label ?unidadeGestora .
  ?pagamento a loa:Pagamento ;
                loa:compostoDe ?itemPagamento .
  ?itemPagamento loa:valorTotal ?valorTotal .
}
GROUP BY ?unidadeGestora
ORDER BY DESC(?valorPago)
```

### QC30. Qual valor pago para determinado classificador da despesa?

Exemplo: Categoria Econômica

``` sql
SELECT ?categoriaEconomica (SUM(xsd:double(?valorTotal)) as ?valorPago) WHERE {
  ?pagamento a loa:Pagamento ;
             loa:depende ?empenho ;
             loa:valorTotal ?valorTotal .
  ?empenho loa:conformidadeCom ?autorizacaoDespesa .
  ?autorizacaoDespesa loa:prescreveCategoriaEconomica/rdfs:label ?categoriaEconomica .
}
GROUP BY ?categoriaEconomica
```
