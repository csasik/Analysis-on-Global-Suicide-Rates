var format = function(d) {
    return d3.format(',.02f')(d) ;
 }

function init() {
    console.log('Inside init');
    
    populateCountries();

    let country = 'USA';
    
    
    
    //d3.json("./Data/convertcsv.json", function(response) {
    d3.json("/suicide-rate-by-age", function(response ) {
        console.log(country);
        console.log('response is');
        console.log(response);

        let year =[];
        let all_ages = [];
        let seventy_plus = [];
        let age_standardized = [];
        let fifty_sixtynine = [];
        let country_name =[] ;
        let fifteen_fortynine = [];
        let five_forteen = [];
        let data_filter = [];  

        
        data_filter = response.filter(function (el) {
            return (el.iso3 === country);
        });

        
        data_filter.map(function(data, index){
            
            year[index] = data["Year"];
            all_ages[index] = format( data["all_ages"]) ;
            seventy_plus[index] = format( data["seventy_plus"]);
            age_standardized[index] = format( data["age_standardized"]);
            fifty_sixtynine[index] = format( data["fifty_sixtynine"]);
            fifteen_fortynine[index] = format( data["fifteen_fortynine"]);
            five_forteen[index] = format( data["five_forteen"]);
            country_name[index] =  data["Entity"];

        });
        console.log(country_name);
        console.log(year);

         buildChart( year, all_ages, seventy_plus, age_standardized,
            fifty_sixtynine, fifteen_fortynine, five_forteen, country_name);
    });

    

}

function buildChart( year, all_ages, seventy_plus, age_standardized,
                        fifty_sixtynine, fifteen_fortynine, five_forteen, country_name){

       // console.log(country_name);

        let trace1 = {
          type:"scatter",
          text: "Age : All Ages",
          name:"All Ages",
          x: year,
          y: all_ages,
          mode : 'lines+markers'
                    }    

        let trace2  = {
            type:"scatter",
            text: "Age : Seventy Plus",
            name:"Seventy Plus",
            x: year,
            y: seventy_plus,
            mode : 'lines+markers'
            }

        let trace3  = {
            type:"scatter",
            text: "Age : 50 to 69",
            name:"50 - 69",
            x: year,
            y: fifty_sixtynine,
            mode : 'lines+markers'
            }  
            
        let trace4  = {
            type:"scatter",
            text: "Age : 15 to 49",
            name:"15 - 49",
            x: year,
            y: fifteen_fortynine,
            mode : 'lines+markers'
            }     
            
        let trace5  = {
            type:"scatter",
            text: "Age : 5 to 14",
            name:"5 - 14",
            x: year,
            y: five_forteen,
            mode : 'lines+markers'
            }   

        let trace6 = {
            type:"scatter",
            text: "Age Standardized",
            name:"Age Standardized",
            x: year,
            y: age_standardized,
            mode : 'lines+markers'
            }    
  
        let chart_data = [trace1, trace2, trace3, trace4, trace5, trace6];

        //console.log(chart_data);
        
    let layout = {
        title: `Suicide Rates by Ages for ${country_name[0]}`,
        xaxis:{title:'Year'},
        yaxis:{title:'Suicide Rate'}
       };
    
    
    Plotly.newPlot("plot", chart_data, layout);
    
   
};

// function to populate the drop down with countries
function populateCountries() {
    console.log("Inside populate drop down");

    var country_names = [];
    var iso3s = [];
    var select = document.getElementById("country_list");
    
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

function getCountry(newCountry) {
    console.log('newCountry');
    
 //d3.json("./Data/convertcsv.json").then(function (new_response) {
 d3.json("/suicide-rate-by-age").then( function(new_response ) {
            console.log('new response is');
            console.log(new_response);

             let new_year =[];
             let new_all_ages = [];
             let new_seventy_plus = [];
             let new_age_standardized = [];
             let new_fifty_sixtynine = [];
             let new_country_name =[] ;
             let new_fifteen_fortynine = [];
             let new_five_forteen = [];
            
            new_data_filter = new_response.filter(function (el) {
                return (el.iso3 === newCountry);
            });

            new_data_filter.map(function(data, index){
                
                    new_year[index] = data["Year"];
                    new_all_ages[index] = format(data["all_ages"]);
                    new_seventy_plus[index] = format(data["seventy_plus"]);
                    new_age_standardized[index] = format(data["age_standardized"]);
                    new_fifty_sixtynine[index] = format(data["fifty_sixtynine"]);
                    new_fifteen_fortynine[index] = format(data["fifteen_fortynine"]);
                    new_five_forteen[index] = format(data["five_forteen"]);
                    new_country_name[index] = data["Entity"];
                
            });
             
            console.log(new_country_name);

            buildChart(new_year,new_all_ages,new_seventy_plus, new_age_standardized,
                        new_fifty_sixtynine, new_fifteen_fortynine, new_five_forteen, new_country_name);
    
            });

  };
  

  init();


