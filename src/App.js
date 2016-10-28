import ShoppingCart from './ShoppingCart';
import BBProductAPIService from './BBProductAPIService';
import BBProductData from './model/BBProductData';

//import Catalog from './Catalog'

export default class App {
    constructor(){
        console.log('creating app');
        this.data = [];
        this.getTheData();
        this.shoppingCart = new ShoppingCart();
        this.initModal();
    }

    getTheData(){
        console.log('getting the data...');
        //load the data
        this.bbAPIService = new BBProductAPIService();
        let context = this;
        this.successCallback = function (response){
      //     console.log('response = \n' + response);
            context.data = JSON.parse(response);
            context.processResultsIntoUsableData(context.data);
        };

        this.failCallback = function(error){
            console.error('failed! \n', error);
        }
        this.bbAPIService.loadDataUsingJS(context).then(this.successCallback, this.failCallback)
    }

    processResultsIntoUsableData(result){
        //from here, extract only the product info
        this.rawData = new BBProductData(result);
        this.products = this.rawData.products;
   //      console.log('PRODUCTS ONLY = ' + this.products); 
        this.createTableOfItems(this.products);

       
        
    }
  
    initModal(){
        // Get the modal
        
    this.modal = document.getElementById('viewModal');
        console.log(this.modal);
    this.span = document.getElementsByClassName("close")[0];   
    this.span.addEventListener('click', function(event){
          $('#viewModal').css('display','none')
     });    

    }

      createTableOfItems(products){

     for( var i=0; i < products.length; i++){
    let currentItem = products[i];
    let currentSku = currentItem['sku'];
    let currentName = currentItem['name'];
    let currentImage = currentItem['image'];
    let currentSalePrice = currentItem['salePrice'];

     console.log('this is' + products.length);
    
    let clone = $('.product-wrapper').eq(0).clone();
/*
    let productName = (result.products[i].name);
    let productImg = (result.products[i].image);
    let regPrice = (result.products[i].regularPrice);
    let salePrice = (result.products[i].salePrice);
*/
    $(clone).css('margin-left', i*300);
    $(clone).children('img').attr({"src": currentImage, 'alt': currentName});  
       // $('article').children('img').attr("src", final_image);
    $(clone).children('h3').html(currentName);
    $(clone).children('p').html(currentSalePrice);
    $(clone).children('.button-view').attr({"id": "quick-view"+ currentSku, "data-sku": currentSku});
    $(clone).children('.button-add').attr({"id": currentSku, "data-sku": currentSku});
        
    $('.flickity-slider').append(clone);

     }
  
    for (let btnCount = 0; btnCount<products.length; btnCount++){
        let currentItem = products[btnCount];
     //   console.log(currentItem);
        let context = this;
         $('#'+currentItem['sku']).on('click', null, {context:context}, function(event){
                context.modal.style.display = "block";
                context.prepareItemToAddToCart(event, context);
                context.displayAddToCart(event, context);
            });
        
        $('#quick-view'+currentItem['sku']).on('click', null, {context:context}, function(event){
                context.modal.style.display = 'block';
                context.displayQuickView(event, context);
            });


        document.getElementById(currentItem['sku']).addEventListener('click',(this));
        document.getElementById('quick-view'+currentItem['sku']).addEventListener('click',(this));
      //  document.getElementById(currentItem['sku']).addEventListener('click', this.prepareItemToAddToCart);
    }
    //add event listeners to all the delete buttons to make them respond
     for (let delBtnCount = 0; delBtnCount<products.length; delBtnCount++){         
         let currentItem = products[delBtnCount];
         let currentSku = currentItem['sku'];
    //     console.log('creating click events for delete button');
         let deleteSku = 'delete-' + currentSku;
      //   console.log('currentSKu is' + deleteSku);
         let prepToDeleteItemFromCart = function(evt, context){
             let delSkuNum = $(evt.target).attr('id');
             console.log('hello from prepToDelete');
             context.shoppingCart.deleteItemFromCart(skuNum, 1);
         };
         let currentObject = "#" + deleteSku;
         let context = this;
         $(currentObject).on('click', null, {context:context}, function(event){
            console.log(event);
             console.log(event.data);
             console.log(event.target);
             console.log(event.data.context); 
             event.data.context.prepItemToDeleteFromCart(event,event.data.context);
         });
     }
    
 }


  prepareItemToAddToCart(evt, context){
      if(evt==null || typeof (evt) === 'undefined'){
            return;
        }
      let skuNum = $(evt.target).attr('data-sku');
  //    console.log(skuNum);
    //  console.log(this.parentNode);      
      context.shoppingCart.addItemToCart(skuNum, 1);
      //context.displayAddToCart(event, context);

    }

    prepItemToDeleteFromCart(evt, context){
        if(evt==null || typeof (evt) === 'undefined'){
            return;
        }
        let skuNum = $(evt.target).attr('data-sku');
        context.shoppingCart.deleteItemFromCart(skuNum, 1);
    }

 
   displayQuickView(event, context){
    //    console.log('here are the ' + products.length);
        
      //  for (var i = 0; i < this.products.length; i++){
        let currentID = $(event.target).attr('data-sku');   
        console.log('this is the id' + currentID);  
        let itemInView = this.getProductBySku(currentID); 
        
       // let currentPrice = currentItem['salePrice'];
        $('#modalContent').last().html("<div>"+'<img src="' + itemInView['thumbnailImage'] + '"/>' + '<h3>' + itemInView['name'] + '</h3>' + '<p>' + itemInView['shortDescription'] + '</p>' + '<button id="' + itemInView['sku'] + '">Add to Cart</button>' + "</div>");            
        
     //  }
        
    } 

    displayAddToCart(event, context){
        console.log('hiaddtocart');
        let currentID = $(event.target).attr('data-sku');
        let itemToAdd = this.getProductBySku(currentID); 
         $('#modalContent').last().html("<img src='" + itemToAdd['thumbnailImage'] + "'/>" + "<p>The item " + itemToAdd['name'] + " has been added to your cart!</p>");
       // $("#viewModal").append(addedToCartMessage); 
 }

    getProductBySku(sku=0){
        if (sku==0){ return; };
        //console.log(this.products);
        let criteriaFn = function(product){
            return product['sku'] == sku;
        };
        let result = this.products.filter(criteriaFn);
        // result is an array of potential products.
        // but one product should be returned only.
        // so return the first element;
        return result[0];

    }


}