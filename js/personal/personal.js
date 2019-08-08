let file = document.getElementById('file');
let userPicture = document.getElementById('userPic');
var $ = function(id) {
    return document.getElementById(id)
}
file.onchange = function() {
    let form = new FormData();
    //添加表单数据
    form.append('userpic', this.files[0]);
    form.append('userid',localStorage.getItem('userid'));

    filePost('/v1/api/upload', form, function(data) {
        let picData = JSON.parse(data);
        setTimeout(() => {
            userPicture.src = picData.imgSrc;        
        }, 1000);
        
    })
}
ajax({
    url:'/v1/api/picture',
    method:'POST',
    async:true,
    data:{
        id: localStorage.getItem('userid')
    },
    success:function(data) {
        // console.log(data);
        userPicture.src = data;
    }
})



// 一进入信息页就要请求ajax，
ajax({
    url:'/v1/api/userinfor',
    method:'POST',
    async:true,
    data:{},
    success:function(data) {
        let newdata = JSON.parse(data);
        var vdata = newdata.datamsg[0];
        $('username').value = vdata.username;
        $('password').value = vdata.password;
        $('tel').value =vdata.tel;
        $('email').value = vdata.email;
        $('marry').value = vdata.marry

    }
})

$('mine').onclick = function(){
ajax({
    url:'/v1/api/repair',
    method:'POST',
    async:true,
    data:{
        username:$('username').value,
        password:$('password').value,
        tel: $('tel').value,
        email:$('email').value,
        marry:$('marry').value
    },
    success:function(data) {
        console.log(data);
        var newdata = JSON.parse(data);
        location.href = newdata.redirect
    }
})
}

$('delete').onclick = function(){
    ajax({
        url:'/v1/api/delete',
        method:'POST',
        async:true,
        data:{},
        success:function(data) {
            console.log(data)
            var newdata = JSON.parse(data);
            if(newdata.static === 0){
                location.href = newdata.redirect
            }
        }
    })
}


