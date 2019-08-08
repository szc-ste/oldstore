var $ = function (id) {
    return document.getElementById(id)
}

let form = new FormData();
// console.log(form);
$('gogo').onchange = function () {

    let readfiler = new FileReader();
    form.set('productImages', this.files[0]);
    // 监听资源加载完成
    readfiler.onload = function () {
        console.log(readfiler.result)
        $('imag').src = readfiler.result;
    }
    // 把你的文件对象传给这个读文件的实例
    readfiler.readAsDataURL(this.files[0]);

}

$('addproduct').onclick = function () {
    let obj = {
        date: $('date').value,  //到期日期
        unit: $('unit').value,    //库存单位
        product: $('product').value,   //产品名称
        weee: $('weee').value,   //产品描述
    }
    form.set('productInfor',JSON.stringify(obj));

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.responseText)
        }
    }
    xhr.open('POST','/v1/api/product');

    xhr.send(form);
}

// ajax({
//     url:'v1/api/product',
//     method:'POST',
//     async:true,
//     data:{
//         date:$('date').value,  //到期日期
//         unit:$('unit').value,    //库存单位
//         product:$('product').value,   //产品名称
//         desc:$('desc').value,   //产品描述

//     },
//     success:function(data){
//         console.log(data)
//     }
// })