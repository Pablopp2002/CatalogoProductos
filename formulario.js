
    // seleccionar todo
    function selectAll(){
        var obj = document.getElementsByClassName("selectOne");
        var btSelectAll = document.getElementById("allCheck").checked;
        for(inputCheck of obj){
            inputCheck.checked = btSelectAll;
        }
    }
    // eliminación única
    function deleteChild(obj){
        var nowtr = obj.parentElement.parentElement;
        var nowtable = nowtr.parentElement;
        nowtable.removeChild(nowtr);
        // Precio total
        allShopPriceTotal();
        // puntos totales
        allIntegralTotal();
    }
    // eliminación por lotes
    function selectDelete(){
        var obj = document.getElementsByClassName("selectOne");
        for (var i = obj.length - 1;i >= 0;i--){
            var nowCheck = obj[i];
            if (nowCheck.checked == true){
                deleteChild(nowCheck);
            }
        }
        // Precio total
        allShopPriceTotal();
        // puntos totales
        allIntegralTotal();
    }

    // Añadir al carrito
    function addToCart(obj){
        var result = confirm('¿Añadir este producto al carrito de la compra? ');
        if (result == false){
            return;
        }
        // Formulario de carrito de compras
        var cartBox = document.getElementById("mytable");
        // Objeto de mercancía
        var shop = {
            shopImg:obj.children[0].src,
            shopIntegral:parseInt(eval(obj.children[2].innerHTML + "/20")),
            shopPrice:obj.children[2].innerHTML
        }
        // Determine si el producto existe
        var img = document.getElementsByClassName("imgbackground");
        var result = "-1";
        for (var i = 0;i < img.length;i++){
            if (shop.shopImg == img[i].children[0].src){
                result = i;
            }
        }
        if (result != "-1"){
            var count = img[result].parentElement.children[4].children[1];
            count.value = eval(count.value + "+1");
            // Recalcular el subtotal
            singleAllSubTotal();
        }else{
            // Crea un objeto de carrito de compras
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML = '<input type="checkbox"  class="selectOne" />';
            var td2 = document.createElement("td");
            td2.className = "imgbackground";
            td2.innerHTML = '<img src="'+ shop.shopImg +'" height="100" width="100"/>';
            var td3 = document.createElement("td");
            td3.className = "integral";
            td3.innerHTML = shop.shopIntegral;
            var td4 = document.createElement("td");
            td4.innerHTML = shop.shopPrice;
            var td5 = document.createElement("td");
            td5.innerHTML = '<button οnclick="reduce(this)">-</button>&nbsp;'
                        + '<input type="text" size="1" readonly="true" value="1"/>'
                        + '&nbsp;<button οnclick="plus(this)">+</button>';
            var td6 = document.createElement("td");
            td6.className = "shopCount";
            td6.innerHTML = parseInt(shop.shopPrice);
            var td7 = document.createElement("td");
            td7.innerHTML = '<a href="#" class="delete" οnclick="deleteChild(this)"> Eliminar </a>';
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            // Añadir al carrito
            cartBox.appendChild(tr);
        }
        
        // Precio total
        allShopPriceTotal();
        // puntos totales
        allIntegralTotal();
        // cambiar de color
        changeBackground();
    }
    



