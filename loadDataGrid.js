(function() {

    document.addEventListener('DOMContentLoaded', function() {

        var gridDiv = document.querySelector('#myGrid');

        var gridOptions = {
            columnDefs: [
                {headerName: 'Name', field: 'name'},
                {headerName: 'Lat', field: 'lat'},
                {headerName: 'Long', field: 'long'},
                {headerName: 'Elevation', field: 'elevation'},
                {headerName: 'Date', field: 'value'},
                {headerName: 'Daily Max Temp', field: 'Dm'}
            ]
        };

        new agGrid.Grid(gridDiv, gridOptions);

        jsonLoad( function(data) {
            gridOptions.api.setRowData(data);
        });
    });

})();


function jsonLoad(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/areaForecasts.json'); // by default async
    xhr.responseType = 'json'; // in which format you expect the response to be

    xhr.onload = function() {
        if(this.status == 200) {// onload called even on 404 etc so check the status
            callback(this.response);
        }
    };

    xhr.onerror = function() {
        console.log('loading data error');
    };

    xhr.send();
}