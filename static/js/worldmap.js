
d3.json("/suicide-rate-by-country", function(response ) {
// d3.json("/Data/suicide_rates_by_country.json", function(response ) {
    console.log('inside worldmap. response is');
    console.log(response);

    var width = 900;
    var height = 700;

    var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

    

    var format = function(d) {
        return d3.format(',.02f')(d) ;
     }
     
     var map = d3.geomap.choropleth()
         .geofile('https://d3-geomap.github.io//d3-geomap/topojson/world/countries.json')
         .colors(colorbrewer.PuRd[9])
         .column('suicide_rate')
         .format(format)
         .legend(true)
         .unitId('iso3')
     
     
    let map_data = response.filter(function (el) {
        return (el.Year == "2005");
    });
    
    console.log(map_data);
    
    
        var chart = d3.select('#map')
                      .append('svg')
                      .attr("width", width)
                      .attr("height", height)
                      .datum(map_data)

                      
                    
    map.draw(chart);
})
