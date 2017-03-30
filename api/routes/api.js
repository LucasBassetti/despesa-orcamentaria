var express = require('express'),
	stardog = require('stardog'),
	router = express.Router();

var conn = new stardog.Connection();

conn.setEndpoint("http://dev.nemo.inf.ufes.br:5820");
conn.setCredentials("nemo", "nemo");
// conn.setReasoning(true);

router.get('/credores/num-empenhos', function(req, res) {
	var limit = req.query['limit'],
		offset = req.query['offset']
		query = 'SELECT ?nome ?codigo (count(?empenho) as ?nEmpenhos) WHERE {'
		  + ' ?empenho a ordp:Empenho ;'
		  + ' 	ordp:favorece ?credor .'
		  + ' ?credor rdfs:label ?nome ;'
		  + ' 	ordp:codigo ?codigo .'
		  + ' }'
		  + ' GROUP BY ?nome ?codigo'
		  + ' ORDER BY DESC(?nEmpenhos)';

	if(limit) {
		query += ' LIMIT ' + limit;
	}

	if(offset) {
		query += ' OFFSET ' + offset;
	}

	executeQuery(query, function (data) {
        res.send(data);
	});
});

router.get('/credor/:codigo', function(req, res) {
	var codigo = req.params.codigo,
		query =   ' SELECT ?nome (count(?empenho) as ?nEmpenhos) (SUM(xsd:double(?valorEmpTotal)) as ?sumValorEmpTotal) (count(?pagamento) as ?nPagamentos) (SUM(xsd:double(?valorPagTotal)) as ?sumValorPagTotal) WHERE {{'
				+ '  ?credor rdfs:label ?nome ;'
				+ '  		  ordp:codigo "' + codigo + '" .'
				+ '  ?empenho a ordp:Empenho ;'
				+ '       ordp:valorTotal ?valorEmpTotal ;'
				+ '       ordp:favorece ?credor .'
				+ ' }'
				+ ' UNION'
				+ ' {'
				+ '  ?credor rdfs:label ?nome ;'
				+ '  		  ordp:codigo "' + codigo + '" .'
				+ '  ?pagamento a ordp:Pagamento ;'
				+ '       ordp:valorTotal ?valorPagTotal ;'
				+ '       ordp:favorece ?credor .'
				+ ' }}'
				+ ' GROUP BY ?nome';

	executeQuery(query, function (data) {
        res.send(data);
	});
});

router.get('/acoes/num-empenhos', function(req, res) {
	var limit = req.query['limit'],
		offset = req.query['offset']
		query = 'SELECT ?acao ?codigo (count(?empenho) as ?nEmpenhos) WHERE {'
		  + ' ?empenho a ordp:Empenho ;'
		  + ' 	ordp:refereSe ?itemLoa .'
		  + ' ?itemLoa ordp:prescreveAcao ?acaoURI .'
		  + ' ?acaoURI rdfs:label ?acao ;'
		  + ' 	ordp:codigo ?codigo .'
		  + ' }'
		  + ' GROUP BY ?acao ?codigo'
		  + ' ORDER BY DESC(?nEmpenhos)';

	if(limit) {
		query += ' LIMIT ' + limit;
	}

	if(offset) {
		query += ' OFFSET ' + offset;
	}

	executeQuery(query, function (data) {
        res.send(data);
	});
});

router.get('/acao/:codigo', function(req, res) {
	var codigo = req.params.codigo,
		query =   ' SELECT ?acao (count(?empenho) as ?nEmpenhos) (SUM(xsd:double(?valorEmpTotal)) as ?sumValorEmpTotal) (count(?pagamento) as ?nPagamentos) (SUM(xsd:double(?valorPagTotal)) as ?sumValorPagTotal) WHERE {{'
			  	+ ' ?itemLoa ordp:prescreveAcao ?acaoURI .'
			  	+ ' ?acaoURI rdfs:label ?acao ;'
			  	+ ' 	ordp:codigo  "' + codigo + '" .'
				+ ' ?empenho a ordp:Empenho ;'
			  	+ ' 	ordp:refereSe ?itemLoa .'
				+ '  ?empenho a ordp:Empenho ;'
				+ '       ordp:valorTotal ?valorEmpTotal .'
			  	+ ' }'
				+ ' UNION'
				+ ' {'
				+ ' ?itemLoa ordp:prescreveAcao ?acaoURI .'
			  	+ ' ?acaoURI rdfs:label ?acao ;'
			  	+ ' 	ordp:codigo  "' + codigo + '" .'
				+ ' ?pagamento a ordp:Pagamento ;'
				+ '       ordp:valorTotal ?valorPagTotal ;'
				+ '       ordp:depende/ordp:refereSe ?itemLoa .'
				+ ' }}'
				+ ' GROUP BY ?acao ?pagamento';

	executeQuery(query, function (data) {

		var acao = "",
			nEmpenhos = 0,
			sumValorEmpTotal = 0,
			nPagamentos = 0,
			sumValorPagTotal = 0,

			results = data.results.bindings;

		for(var i = 0, len = results.length; i < len; i++) {

			acao = results[i].acao.value;

			if(results[i].nPagamentos.value > 0) {
				nPagamentos++;
				sumValorPagTotal += results[i].sumValorPagTotal.value / results[i].nPagamentos.value
			}
			else {
				nEmpenhos = results[i].nEmpenhos.value;
				sumValorEmpTotal = results[i].sumValorEmpTotal.value;
			}
		}

		var result = {
			"head": {
				"vars": [
					"acao",
					"nEmpenhos",
					"sumValorEmpTotal",
					"nPagamentos",
					"sumValorPagTotal"
				]
			},
			"results": {
				"bindings": [
					{
						"acao": {
							"type": "literal",
							"value": acao
						},
						"nEmpenhos": {
							"datatype": "http:\/\/www.w3.org\/2001\/XMLSchema#integer",
							"type": "literal",
							"value": nEmpenhos
						},
						"sumValorEmpTotal": {
							"datatype": "http:\/\/www.w3.org\/2001\/XMLSchema#double",
							"type": "literal",
							"value": sumValorEmpTotal
						},
						"nPagamentos": {
							"datatype": "http:\/\/www.w3.org\/2001\/XMLSchema#integer",
							"type": "literal",
							"value": nPagamentos
						},
						"sumValorPagTotal": {
							"datatype": "http:\/\/www.w3.org\/2001\/XMLSchema#double",
							"type": "literal",
							"value": sumValorPagTotal
						}
					}
				]
			}
		}

        res.send(result);
	});
});


// router.get('/:classifier/:id', function(req, res) {
// 	var classifier = req.params.classifier,
// 		id = req.params.id,
//
// 	executeQuery(query, function (data) {
//         res.send(data);
// 	});
// });


function executeQuery(query, callback) {

	console.log(query);

	conn.query({
    	database: "ordp",
    	query: query,
    	//'query.timeout': '20m'
	}, callback);
}

module.exports = router;
