export default class BBProductAPIService{
    constructor(){
        console.log('intializing best buy api service');
        this.bbURL = "https://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=8ccddf4rtjz5k5btqam84qak&format=json&show=image,thumbnailImage,shortDescription,name,regularPrice,salePrice,sku";
       // this.loadDataUsingJS();
    }

    loadDataUsingJS(){
        let _promiseFn = (_success, _reject) => {
        let req = new XMLHttpRequest();
        req.onload = () => {
            switch(req.status){
                case 200:
                    _success(req.response);
                break;
                case 404:
                    console.log('error: service url not found');
                    _reject(Error(rew.statusText));
                    break;
                default:
                    console.log('error');
                    break;
            }
       
        };

        req.open('GET', this.bbURL);
        req.onerror = function(){
            _reject(Error("Network Error"));
        };

        req.send();
      };
      let promise = new Promise(_promiseFn);
      return promise;

    }

}