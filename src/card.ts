let variable =1;
let basket_car = {};
 let carcard = document.querySelector('.car_card');
 
 $('document').ready(function(){
    loadcars();
    checkCart();
});
let  carr_array:[] = [];

    function loadcars (){
    let out='';
    let option='';
    let option_collor ='';
     $.getJSON('cars.json', function(data){
    
        for(let key in data){
        carr_array.push(new Cars (key, data[key].carhref,data[key]['immage'], data[key].name, data[key].price,data[key].year, data[key]['collor'],data[key].producer,data[key].run,data[key].fuel,data[key].interior,data[key].engine,data[key].dispersal,data[key].transmission));

        }
        for(let key in data){
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
        
        let out = 0;
        for(let cars in cart){
            out+= cart[cars];
        }
        $('a.logo').html(out);
       
        }
        function addToCart(){
            let articul = $(this).attr('data-art');
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
            event.target.classList.add('blue');
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
    const formSerach = document.getElementById('search_model');
    formSerach.addEventListener('submit', (e) => {
        e.preventDefault();
        const fData = new FormData(search_model);
        const search_m = fData.get('search').toUpperCase();
        for(let cars of carr_array){
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
    const formElement = document.getElementById('form_filter');
    
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form_filter); // создаём объект FormData, передаём в него элемент формы
  // теперь можно извлечь данные
  const first_date = formData.get('check_in_date'); 
  const last_date = formData.get('check_out_date');
  const min_price = formData.get('min_price');
  const max_price = formData.get('max_price');
  const collor = (formData.get('collor')).toLowerCase();
  for(let cars of carr_array){
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
    for(let cars of carr_array){
        document.querySelector('.'+cars.art).classList.remove("active_col");
        document.querySelector('.'+cars.art).classList.remove("active");
        document.querySelector('.'+cars.art).classList.remove("active_max");
        document.querySelector('.'+cars.art).classList.remove("active_date");
        document.querySelector('.'+cars.art).classList.remove("active_datel");
        document.querySelector('.'+cars.art).classList.remove("active_prod");
        document.querySelector('#search').value = '';
        document.querySelector('#check_in_date').value='';
        document.querySelector('#check_out_date').value='';
        document.querySelector('#min_price').value='';
        document.querySelector('#max_price').value='';
        document.querySelector('#keywords').value='';
        
        
        
    }
}

//window.onload = function () {
    function sortPrice (a){
let sortcar = document.querySelector('#properties_list');
variable++;
if(variable%2 == 0){
for(let i = 0; i< sortcar.children.length; i++){
    for(let j = 0; j<sortcar.children.length;j++){
        if(+sortcar.children[i].getAttribute(a)>+sortcar.children[j].getAttribute(a)){
            swapElements(sortcar.children[i],sortcar.children[j])
        }
    }
}
}
else{
    for(let i = 0; i< sortcar.children.length; i++){
        for(let j = 0; j<sortcar.children.length;j++){
            if(+sortcar.children[i].getAttribute(a)<+sortcar.children[j].getAttribute(a)){
                swapElements(sortcar.children[i],sortcar.children[j])
            }
        }
    }  
}

}

function swapElements(obj1, obj2) {
    //створити маркерний елемент і вставити його там, де obj1
    let temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);
    // перемістити obj1 праворуч перед obj2
    obj2.parentNode.insertBefore(obj1, obj2);
    // перемістіть obj2 прямо перед тим місцем, де раніше був obj1
    temp.parentNode.insertBefore(obj2, temp);
    // видалити тимчасовий вузол маркера
    temp.parentNode.removeChild(temp);
}
function sortPr (){
    sortPrice ('data-price')
}

function sortDate (){
    sortPrice ('data-year')
}

