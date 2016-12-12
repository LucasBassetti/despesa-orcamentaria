var api_url = "http://127.0.0.1:8888/api";

Meteor.methods({

    /**
     * getDetalhesCredor - função para pegar detalhes do credor
     * como: número de empenhos, valor empenhado, valor pago, etc.
     *
     * @param  {String} code
     * @return {Array}
     */
    getDetalhesCredor: function(codigo) {

        var url = api_url + "/credor/" + codigo;

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

                var detalhesCredor = {},
                    content = JSON.parse(response.result.content)
                    results = content.results.bindings;

                detalhesCredor = {
                    _id: codigo,
                    nome: results[0].nome.value,
                    nEmpenhos: results[0].nEmpenhos.value,
                    valorEmpenhado: Number(results[0].sumValorEmpTotal.value).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                    nPagamentos: results[0].nPagamentos.value,
                    valorPago: Number(results[0].sumValorPagTotal.value).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }

                return detalhesCredor;
            }
        }
    },

   /**
    * getCredorNumEmpenhos - função para pegar o número de empenhos de cada credor
    *
    * @param  {String} limit
    * @param  {String} offset
    * @return {Array}
    */
   getCredorNumEmpenhos: function(limit, offset) {

       var url = api_url + "/credores/num-empenhos";

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

               var credores = [],
                   content = JSON.parse(response.result.content)
                   results = content.results.bindings;

               for(var i = 0, len = results.length; i < len; i++) {
                   credores.push({
                       _id: results[i].codigo.value,
                       nome: results[i].nome.value,
                       nEmpenhos: results[i].nEmpenhos.value
                   });
               };

               return credores;
           }
       }
   }
});
