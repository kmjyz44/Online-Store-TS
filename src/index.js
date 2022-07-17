//import { number } from "prop-types";

import Cars from "./Cars";

let variable =1;
const basket_car= {};
 const carcard = document.querySelector('.car_card');
 let cart:[];
 //________________
 $('document').ready(function(){
    loadcars();
    checkCart();
});
const  carr_array = [];

    function loadcars (){
    let out='';
    let option='';
    let option_collor ='';
     $.getJSON('cars.json', function(data){
    
        for(const key in data){
        carr_array.push(new Cars (key, data[key].carhref,data[key]['immage'], data[key].name, data[key].price,data[key].year, data[key]['collor'],data[key].producer,data[key].run,data[key].fuel,data[key].interior,data[key].engine,data[key].dispersal,data[key].transmission));

        }
        for(const key in data){
            out+='<li class = '+data[key].art+' data-price = '+data[key].price+' data-year = '+ data[key].year+'>';
            out+= '<button href="#" class = "drive" title="Buy" data-art = "'+data[key].art+'">'+"&#128465;"+'</button>';
            out+= '<a href='+data[key].carhref+' class = "link_car"><img src = "'+data[key].immage+'" alt="" class = "img_car"></img></a>';
            out+= '<div class="name_year">'+'<h2 class = "name">'+data[key].name+ '&nbsp'+'</h2>'+ '<h2>'+ data[key].year+ ' YEAR'+'</h2>'+'</div>';
            out+= '<h2 class = "carprice">'+"$"+data[key].price+'<h2>'
             out+='<p>'+ data[key].year+" /"+data[key].collor+" /"+data[key].run+"km /"+data[key].fuel+" /"+data[key].engine+"sec" + '</p>';
              out+='</li>'
              option+='<option>'+data[key].producer+'</option>'
              option_collor+= '<option>'+data[key].collor+'</option>'
        }
        $('#properties_list').html(out);
        $('#suggestions').html(option);
        $('#carcollor').html(option_collor);
        $('button.drive').on('click',addToCart);
        $('button.advanced_search_icon_clear').on('click',cleaning);
        $('button.advanced_search_icon_price').on('click', sortPr);
        $('button.advanced_search_icon_date').on('click', sortDate)
    })
    function showCart(){
        checkCart();
        
        let out = '';
        for(const cars in cart){
            out+= cart[cars];
        }
        $('a.logo').html(out);
       
        }
        function addToCart(){
            const articul = $(this).attr('data-art');
            if(basket_car[articul]==20){
                alert('Извините, все слоты заполнены');
            }
            else{
            if(basket_car[articul]!=undefined){
                basket_car[articul]++;
            }
            else{
                basket_car[articul]=1;  
            }
        }
            ((event.target) as HTMLInputElement).classList.add('blue');
            localStorage.setItem('cart',JSON.stringify(basket_car));
            showCart();
        }
        
}

function checkCart(){
    if(localStorage.getItem('cart')!=null){
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    
}

// фильтр єлементов
    const formSerach = document.getElementById('search_model') as HTMLFormElement;
    formSerach.addEventListener('submit', (e) => {
        e.preventDefault();
        const fData = new FormData(formSerach);
        //____________________________________________________________________________________________
        const search_m = fData.get('search').toString().toUpperCase();
        for(const cars of carr_array){
            if(search_m != cars.producer.toUpperCase()){
                document.querySelector('.'+cars.art).classList.add("active_prod") ;
                 
            }
            if(search_m == cars.producer.toUpperCase()){
                document.querySelector('.'+cars.art).classList.remove("active_prod")   
            }
            if(search_m == ''){
                document.querySelector('.'+cars.art).classList.remove("active_prod")   
            }
        }
    });
    const formElement = document.getElementById('form_filter')as HTMLFormElement;
    
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные_________________________________________________________________
  const first_date = formData.get('check_in_date'); 
  const last_date = formData.get('check_out_date');
  const min_price = formData.get('min_price');
  const max_price = formData.get('max_price');
  const collor:string = formData.get('collor').toString().toLowerCase();
  for(const cars of carr_array){
    if(collor !== '' && collor != cars.collor.toLowerCase()){
        document.querySelector('.'+cars.art).classList.add("active_col")
    }
    else
    if(collor == cars.collor.toLowerCase()){
        document.querySelector('.'+cars.art).classList.remove("active_col")
        
    }
    if(collor == ''){
        document.querySelector('.'+cars.art).classList.remove("active_col")
    }
    if(min_price !== '' && min_price > cars.price ){
        document.querySelector('.'+cars.art).classList.add("active")
    }
    if(min_price !== '' && min_price <= cars.price){
        document.querySelector('.'+cars.art).classList.remove("active")
    }
    if(min_price == ''){
        document.querySelector('.'+cars.art).classList.remove("active")
    }
    if(max_price !== '' && max_price < cars.price){ 
    document.querySelector('.'+cars.art).classList.add("active_max")
    }
    if(max_price !== '' && max_price >= cars.price){ 
        document.querySelector('.'+cars.art).classList.remove("active_max")
        }
        if(max_price == ''){ 
            document.querySelector('.'+cars.art).classList.remove("active_max")
            }

        if(first_date !== '' && first_date > cars.year){ 
            document.querySelector('.'+cars.art).classList.add("active_date")
            }
            if(first_date !== '' && first_date < cars.year){ 
                document.querySelector('.'+cars.art).classList.remove("active_date")
                }
                if(first_date == ''){ 
                    document.querySelector('.'+cars.art).classList.remove("active_date")
                    }

                if(last_date !== '' && last_date < cars.year){ 
                    document.querySelector('.'+cars.art).classList.add("active_datel")
                    }
                    if(last_date !== '' && last_date > cars.year){ 
                        document.querySelector('.'+cars.art).classList.remove("active_datel")
                        }
                        if(last_date == ''){ 
                            document.querySelector('.'+cars.art).classList.remove("active_datel")
                            }
}

});
function cleaning (){
    for(const cars of carr_array){
        document.querySelector('.'+cars.art).classList.remove("active_col");
        document.querySelector('.'+cars.art).classList.remove("active");
        document.querySelector('.'+cars.art).classList.remove("active_max");
        document.querySelector('.'+cars.art).classList.remove("active_date");
        document.querySelector('.'+cars.art).classList.remove("active_datel");
        document.querySelector('.'+cars.art).classList.remove("active_prod");
        (document.querySelector('#search')as HTMLInputElement).value = '';
        (document.querySelector('#check_in_date')as HTMLInputElement).value='';
        (document.querySelector('#check_out_date')as HTMLInputElement).value='';
        (document.querySelector('#min_price')as HTMLInputElement).value='';
        (document.querySelector('#max_price')as HTMLInputElement).value='';
        (document.querySelector('#keywords')as HTMLInputElement).value='';
        
        
        
    }
}

//window.onload = function () {
    function sortPrice (a:string){
const sortcar = document.querySelector('#properties_list') as HTMLElement;
variable++;
if(variable%2 == 0){
for(let i = 0; i< sortcar.children.length; i++){
    for(let j = 0; j<sortcar.children.length;j++){
        if(+(sortcar.children[i] as HTMLInputElement).getAttribute(a)>+(sortcar.children[j] as HTMLInputElement).getAttribute(a)){
            swapElements(sortcar.children[i] as HTMLElement, sortcar.children[j] as HTMLElement)
        }
    }
}
}
else{
    for(let i = 0; i< sortcar.children.length; i++){
        for(let j = 0; j<sortcar.children.length;j++){
            if(+(sortcar.children[i] as HTMLInputElement).getAttribute(a)<+(sortcar.children[j] as HTMLInputElement).getAttribute(a)){
                swapElements(sortcar.children[i] as HTMLElement,(sortcar.children[j]) as HTMLElement)
            }
        }
    }  
}

}

function swapElements(obj1:HTMLElement, obj2:HTMLElement) {
    //створити маркерний елемент і вставити його там, де obj1
    const temp = document.createElement("div");
    (obj1.parentNode as HTMLInputElement).insertBefore(temp, obj1);
    // перемістити obj1 праворуч перед obj2
    (obj2.parentNode as HTMLInputElement).insertBefore(obj1, obj2);
    // перемістіть obj2 прямо перед тим місцем, де раніше був obj1
    (temp.parentNode as HTMLInputElement).insertBefore(obj2, temp);
    // видалити тимчасовий вузол маркера
    (temp.parentNode as HTMLInputElement).removeChild(temp);
}
function sortPr (){
    sortPrice ('data-price')
}

function sortDate (){
    sortPrice ('data-year')
}
export{};