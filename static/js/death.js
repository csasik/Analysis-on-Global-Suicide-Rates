

function init() {
    console.log('Inside death.js');

    var format = function(d) {
        return d3.format(',.02f')(d) ;
     }
    
    populateCountries2();

    let country = 'USA';
    
    var filtered_data = [];
    
    //d3.json("./Data/csvjson.json", function(response) {
        d3.json("/gender", function(responses) {
        console.log("response from death chart")
        console.log(responses);
        let year =[];
        let male_suicide = [];
        let female_suicide = [];
        let country_name =[];
       
        

        //filtered_data = responses.filter( row => row.Code ==country);
        filtered_data = responses.filter(function (el) {
            return (el.Code == country);
        });

        //console.log(`filtered data below ${filtered_data}`);
        
        filtered_data.map(function(data, index){
            year[index] = data["Year"];
            male_suicide[index] = format( data["Male suicide rate "]) ;
            female_suicide[index] = format( data["Female suicide rate "]);
            country_name[index] =  data["Entity"];
        });
        console.log(year);
        console.log(male_suicide);
        let trace1 = {
          type:"scatter",
          text: "Male Suicide Rate",
          name:"Male Suicide Rate",
          x: year,
          y: male_suicide,
          mode : 'lines+markers'
                    }    

        let trace2  = {
            type:"scatter",
            text:  "Female Suicide Rate",
            name:"Male Suicide Rate",
            x: year,
            y: female_suicide,
            mode : 'lines+markers'
            }

  
        let chart2_data = [trace1, trace2];

        //console.log(chart_data);
        
    let layout = {
        title: `Male and Female Suicide Rate in  ${country_name[0]}`,
        xaxis:{title:'Year'},
        yaxis:{title:'Suicide Rate'}
       };
    
    
    Plotly.newPlot("death", chart2_data, layout);
    
    });
};

// function to populate the drop down with countries
function populateCountries2() {
    console.log("Inside populate drop down");

    var country_names = [];
    var iso3s = [];
    var select = document.getElementById("list2");
    
    // country_names = ['United States','Mexico','Canada','India','China','Japan','Singapore']    ;
    // iso3s = ['USA','MEX','CAN','IND','CHN','JPN','SGP'];
      
    //d3.csv("./Data/countries.csv", function(data) {
    d3.json("/countries", function(data ) {
       data.map(function(d, index) {
            country_names[index] = d.Entity;
            iso3s[index] = d.iso3;
            //console.log(d.Entity);

            select.options[select.options.length] = new Option(d.Entity, d.iso3);
        });

        console.log(data);
    });
   
}

function replotCharts(country) {
       
    //d3.json("./Data/csvjson.json").then (function(new_response2) {
    d3.json("/gender").then(function (new_response2) {

        let new_year2 =[];
        let newmale_suicide2 = [];
        let newfemale_suicide2 = [];
        let newcountry_name2 =[];
       
        //let new_filtered_data2 = new_response2.filter( row => row.Code == country);
        let new_filtered_data2 = new_response2.filter(function (el) {
            return (el.Code == country);
        });

        //console.log(new_filtered_data);

        new_filtered_data2.map(function(data, index){
            
            new_year2[index] = data["Year"];
            newmale_suicide2[index] = format(data["Male suicide rate "]);
            newfemale_suicide2[index] = format(data["Female suicide rate "]);
            newcountry_name2[index] =  data["Entity"];
         });
        
        //console.log(new_year);
       
        
        let trace1 = {
          type:"scatter",
          text: "Male Suicide Rate",
          name:"Male Suicide Rate",
          x: new_year2,
          y: newmale_suicide2,
          mode : 'lines+markers'
                    }    

        let trace2  = {
            text: "Female Suicide Rate",
          name:"Female Suicide Rate",
            x: new_year2,
            y: newfemale_suicide2,
            mode : 'lines+markers'
            }

        
  
        let new_chart_data2 = [trace1, trace2];
        
    let layout2 = {
        title: `Male and Female Suicide Rates in ${newcountry_name2[0]}`,
        xaxis:{title:'Year'},
        yaxis:{title:'Suicide Rate'}
       };
    
    
    var new_div2 = document.getElementById("death");
    var update = '';

    Plotly.newPlot("death", new_chart_data2, layout2);  
    
    });
};

function optionChanged2(newCountry2) {
    console.log('option changed');
    replotCharts(newCountry2);
    
  }
  

  init();


