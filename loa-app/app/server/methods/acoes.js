var api_url = "http://127.0.0.1:8888/api";

Meteor.methods({

    /**
     * getDetalhesAcao - função para pegar detalhes da acao
     * como: número de empenhos, valor empenhado, valor pago, etc.
     *
     * @param  {String} code
     * @return {Array}
     */
    getDetalhesAcao: function(codigo) {

        var url = api_url + "/acao/" + codigo;

        console.log(url);

        var response = Async.runSync(function(done) {

            HTTP.call("GET", url, function(error, result) {
                if(result) {
                    done(false, result);
                }
            });
        });

        if(response.error) {
            console.log(response.error);
        }
        else {
            if(response.result) {

                var detalhesAcao = {},
                    content = JSON.parse(response.result.content)
                    results = content.results.bindings;

                detalhesAcao = {
                    _id: codigo,
                    nome: results[0].acao.value,
                    nEmpenhos: results[0].nEmpenhos.value,
                    valorEmpenhado: Number(results[0].sumValorEmpTotal.value).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                    nPagamentos: results[0].nPagamentos.value,
                    valorPago: Number(results[0].sumValorPagTotal.value).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }

                return detalhesAcao;
            }
        }
    },

   /**
    * getAcoesNumEmpenhos - função para pegar o número de empenhos de cada acao
    *
    * @param  {String} limit
    * @param  {String} offset
    * @return {Array}
    */
   getAcoesNumEmpenhos: function(limit, offset) {

       var url = api_url + "/acoes/num-empenhos";

       if(limit && offset) {
           url += '?limit=' + limit + '&offset' + offset;
       }
       else if(limit) {
           url += '?limit=' + limit;
       }
       else if(offset) {
           url += '?offset=' + offset;
       }

       var response = Async.runSync(function(done) {

           HTTP.call("GET", url, function(error, result) {
               if(result) {
                   done(false, result);
               }
           });
       });

       if(response.error) {
           console.log(response.error);
       }
       else {
           if(response.result) {

               var acoes = [],
                   content = JSON.parse(response.result.content)
                   results = content.results.bindings;

               for(var i = 0, len = results.length; i < len; i++) {
                   acoes.push({
                       _id: results[i].codigo.value,
                       nome: results[i].acao.value,
                       nEmpenhos: results[i].nEmpenhos.value
                   });
               };

               console.log(acoes);

               return acoes;
           }
       }
   }
});
