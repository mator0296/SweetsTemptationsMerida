var Prices = require("../Models/prices");
var xlsx = require('node-xlsx').default;
module.exports = function(next) {
  var workSheetsFromFile = xlsx.parse("./Public/data/tortas.xlsx")[4].data;
  for (var i = 5; i < workSheetsFromFile.length; i+=16) { 

        if(workSheetsFromFile[i][0] && workSheetsFromFile[i][1] && workSheetsFromFile[i][7]){
          var size = workSheetsFromFile[i][0];
          var prices = [];                
          for(var j = i ; j<i+15;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][1].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][7]});
          }
          var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }

          var price1 = new Prices({size:size,cases:'3-three', type:'cakes', Price:prices, minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          price1.save(function(err){

          });
        }
        
        if(workSheetsFromFile[i][9] && workSheetsFromFile[i][10] && workSheetsFromFile[i][16]){
        
          var size = workSheetsFromFile[i][9];
          var prices = [];
          for(var j = i ; j<i+15;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][10].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][16]});
          } 
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price2 = new Prices({size:size,cases:'3-two', type:'cakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          price2.save(function(err){

          }); 
        }

    
        if(workSheetsFromFile[i][18] && workSheetsFromFile[i][19] && workSheetsFromFile[i][25]){
      
          var size = workSheetsFromFile[i][18];
          var prices = [];
          for(var j = i ; j<i+15;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][19].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][25]});
          }
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price3 = new Prices({size:size,cases:'3-one', type:'cakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          price3.save(function(err){

          });           
        }

        if(workSheetsFromFile[i][27] && workSheetsFromFile[i][28] && workSheetsFromFile[i][34]){
          
          var size = workSheetsFromFile[i][27];
          var prices = [];
          for(var j = i ; j<i+15;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][28].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][34]});
          }
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price4 = new Prices({size:size,cases:'one', type:'cakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          price4.save(function(err){

          }); 
            
    
            
        }

      
        if(workSheetsFromFile[i][36] && workSheetsFromFile[i][37] && workSheetsFromFile[i][43]){
        
          var size = workSheetsFromFile[i][36];
          var prices = [];
          for(var j = i ; j<i+15;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][37].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][43]});
          }
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price5 = new Prices({size:size,cases:'two', type:'cakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          price5.save(function(err){

          }); 
        }

      
        if(workSheetsFromFile[i][45] && workSheetsFromFile[i][46] && workSheetsFromFile[i][52]){
          var size = workSheetsFromFile[i][45];
          var prices = [];
          for(var j = i ; j<i+15;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][46].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][52]});
          } 
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price6 = new Prices({size:size,cases:'3-four', type:'cakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          price6.save(function(err){

          });           
        }

         

  }
  for (var i = 5; i < workSheetsFromFile.length; i+=21) { 

    if(workSheetsFromFile[i][54] && workSheetsFromFile[i][55] && workSheetsFromFile[i][61]){
          var size = workSheetsFromFile[i][54];
          var prices = [];
          for(var j = i ; j<i+20;j++){
            var flavorCake_flavorCream = workSheetsFromFile[j][55].replace(" ", "").split('/');
            prices.push({flavorCake:flavorCake_flavorCream[0].replace(' ', ""), flavorCream:flavorCake_flavorCream[1].replace(' ', ""),price:workSheetsFromFile[j][61]});
          } 
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price7 = new Prices({size:size,cases:'one', type:'cupcakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
           var max = -9999999;
          var indexMax;
          var indexMin;
          var min = 9999999;
          for(var y in prices){
            if(Number(prices[y].price) > max){
              indexMax = y;
              max = Number(prices[y].price) 
            }
            if(Number(prices[y].price) < min){
              indexMin = y;
              min = Number(prices[y].price) 
            }
          }
          var price8 = new Prices({size:size,cases:'two', type:'cupcakes', Price:prices,  minPrices:prices[indexMin],maxPrices : prices[indexMax]})
          
          price7.save(function(err, pri){


          });
          price8.save(function(err, pri){

          });            
        }

  }
}