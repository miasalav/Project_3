 function validateForm(){
           // write the code that describes the steps to validate the form
           // i need to validate the email address
           // what is the criteria for valid email address
           // blah followed by an @ followed by blah follorwed by a do followed by two-four characters(for now)
           // todo: cosnider this dot that dot some extension

           //research : substr(), substring(), indexOf(), charAt() methods of
           //string object

           console.log("validateForm(): ");
           var emailFieldValue = document.getElementById("email").value;
           console.log("substr(0,4) = " + emailFieldValue.substr(0,4));
           console.log("substring(2,8) = " + emailFieldValue.substring(2,8));
           console.log("does email have 'mia' ? " + emailFieldValue.indexOf ("mia"));
           console.log("does email have 'sdfsd' ?" + emailFieldValue.indexOf ("sdfsd"));
           console.log("what character is found at position 5?" + emailFieldValue.charAt(5));
           
           var score = 0;
           if(emailFieldValue.indexOf("a")!=-1){
               score = score + 1;
               console.log("found an @!");
           }else{
               console.log('o dod not find an @ :(")');
           }

           console.log("the number of characters in my email field calue is");
           console.log(emailFieldValue.length);
           var lastCharPosition = emailFieldValue.length-1;
           if (emailFieldValue.charAt(lastCharPosition-2)=="." || emailFieldValue.charAt(lastCharPosition-3)=="." || emailFieldValue.charAt(lastCharPosition-4)=="."){
                console.log("you have a dot 2,3, or 4 chars from the end.");
                score = score + 1;
           }
           var badChars = ["!", "#", "&", "*"];
           
           var bad=0;
           for (var i=0; i<badChars.length; i++){
               var currentBadChar = badChars[i];
               for (var r=0; r<emailFieldValue.length; r++){
                   var currentgoodChar= emailFieldValue.charAt(r);
                   if(currentgoodChar == currentBadChar){
                       alert("email is invalid, try again");
                       bad = 1;
                       break;
                       
                   }
               }
           }

           if(bad == 0){
               score=score+1;
           }
           if(score == 3){
               alert('Thanks for subscribing!');
           }

       }


$(document).ready(function(){

     $('.product-container').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1080,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

/*
 
 $('#cart-num').hide();

function buildProduct(result){


   for(i in result.products){

    var clone = $('.product-div').eq(0).clone();

    var productName = (result.products[i].name);
    var productImg = (result.products[i].image);
    var regPrice = (result.products[i].regularPrice);
    var salePrice = (result.products[i].salePrice);

    $(clone).children('a').children('img').attr("src", productImg); 
       // $('article').children('img').attr("src", final_image);
    $(clone).children('a').children('h5').html(productName);
    $(clone).children('a').children('p').html(salePrice);
        
    $('.product-container').append(clone);

    //console.log(productName, productImg, regPrice, salePrice);

    

     }

     $('.product-div').on("click", function(e) {  
    e.preventDefault();

    console.log('click works');

    var sale = $(this).data("sale");
     var price = $(this).data("price");
     var discount = $(this).data("discount");
     var discountPrice = (price - discount);

     console.log('click works');
          
     if(sale == true){
         alert("this product is on sale original price: " + price + " discount price: " + discountPrice);
     }else
     {
         alert("this product is not on sale");
     };
  
     $('#cart-num').show();
     var currentTotal = parseInt($('#cart-num').html());
     var newTotal = currentTotal + 1;
     $('#cart-num').text(newTotal); 

     })


     $('.menu-img').on("click", function(e) { 
     })


}

 */    
 });

 