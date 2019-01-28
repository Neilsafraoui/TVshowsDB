/***** VUE *****/

var vm = new Vue({
    el: '#app',
    data: {
        hasRequested: false,
        request: '',
        lastRequest: '',
        resultSet: [],
        resultNb: 0
    },
    methods: {
        SendRequest(){

        var self = this;    

        // Init request    
        var request = new XMLHttpRequest();

        // On request succeed
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                // Si la réponse n'est pas vide
                if(request.responseText.length > 0){

                var jsonData = JSON.parse(request.responseText);

                    if(jsonData != null && jsonData.length > 0){
                        
                        self.resultSet = jsonData;
                        self.resultNb = self.resultSet.length;
                    }

                self.hasRequested = true;
                self.request = '';
                }
            }
        };

        // Construire la requete selon l'API
        // Preparing request
        self.lastRequest = "http://api.tvmaze.com/search/shows?q="+ self.request;

        request.open("GET", self.lastRequest, true); 

        // Sending request
        request.send();
        }
    }
})