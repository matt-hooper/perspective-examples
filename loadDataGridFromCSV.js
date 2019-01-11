const worker = perspective.worker(); 

(function() {

    document.addEventListener('DOMContentLoaded', function() {

        const gridDiv = document.querySelector('#myGrid');

        const gridOptions = {
            columnDefs: []
        };

        
        jsonLoad( function(colDefs, data) {
            gridOptions.columnDefs = colDefs;            
            new agGrid.Grid(gridDiv, gridOptions);
            gridOptions.api.setRowData(data);
        });
    });

})();


function jsonLoad(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/FL_insurance_sample.csv'); // by default async
    xhr.responseType = 'text'; // in which format you expect the response to be

    xhr.onload = function() {
        if(this.status == 200) {// onload called even on 404 etc so check the status
            const table = worker.table(this.response);

            table.schema().then(schema => {
                console.log(schema);
                const colDefs = getColumnDefinitionsFromSchema(schema);
                console.log(colDefs);
                
                table.view().to_json().then(data => {
                    callback(colDefs, data);
                });
            })            
        }
    };

    xhr.onerror = function() {
        console.log('loading data error');
    };

    xhr.send();
}

function getColumnDefinitionsFromSchema(schema) {
    const colDefs = [];
    for (let prop in schema) {
        const colDef = {headerName: prop, field: prop};
        colDefs.push(colDef);
    }

    return colDefs;
}