var format = function(d) {
    return d3.format(',.02f')(d) ;
 }

function init() {
    console.log('Inside init');
    
    //d3.json("./Data/suicide_factors.json", function(response) {
    d3.json("/suicide-factors", function(response ) {
        let factors = [];
        let male_death_count = [];
        let female_death_count = [];
        let init_data_array = [];

        
        init_data_array = response.filter(function (el) {
            return (el.code == 'C1');
        });

        console.log(init_data_array);
    
        init_data_array.map(function(data, index){
            factors[index] = data["circumstance"];
            male_death_count[index] = data["male_death_count"] ;
            female_death_count[index] = data["female_death_count"] ;

        });

        console.log(factors);
        console.log(male_death_count);

        buildBars(factors,male_death_count, female_death_count);

    });
};

function buildBars(factors, male_death_count, female_death_count) {
        let male_data_trace = {
          type:"bar",
          orientation: 'h',
          name:"Male",
          x: factors,
          y: male_death_count  ,
          marker: {
            color : 'blue',
            line :{
                color : 'dark blue',
                width : 1
                }      
           }     
           }    

        let female_data_trace = {
            type:"bar",
            orientation: 'h',
            name:"Female",
            x: factors,
            y: female_death_count ,
            marker: {
                color : 'pink',
                line :{
                    color : 'black',
                    width : 1                    }      
               }         
            }         
                           
              
        let bar_data = [female_data_trace, male_data_trace];

        //console.log(chart_data);
        
    let layout = {
        title: "Factors Leading to Suicide in US (2016)",
        xaxis:{title:'Factors'},
        yaxis:{title:'Death Count'},
        barmode: 'stack'
               };
    
    
    Plotly.newPlot("bar", bar_data, layout);
    
   
};



function getFactor(code) {
    console.log('new factor');

    //d3.json("./Data/suicide_factors.json").then (function(response) {
    d3.json("/suicide-factors").then(function(response ) {
        let factors = [];
        let male_death_count = [];
        let female_death_count = [];
        let data_array = [];

        // data_array = data.filter( row => row.code ==code);
        console.log(response);
        
        data_array = response.filter(function (el) {
            return (el.code == code);
        });
        data_array.map(function(d, index){
            factors[index] = d["circumstance"];
            male_death_count[index] = d["male_death_count"] ;
            female_death_count[index] = d["female_death_count"] ;

        });

        console.log(factors);
        console.log(male_death_count);
    

    buildBars(factors, male_death_count, female_death_count);
    
    });
  }
  

  init();


