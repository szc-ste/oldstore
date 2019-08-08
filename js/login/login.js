var $ = function(id) {
    return document.getElementById(id)
}

$('login').addEventListener('click', function() {
    ajax({
        url:'/v1/api/login',
        method:'POST',
        async:true,
        data:{
            username:$('login-username').value,
            password:$('login-password').value
        },
        success: function(data) {
            let newdata = JSON.parse(data);
            localStorage.setItem('userid', JSON.parse(data).id)
            if(newdata.status === 0){
                location.href = newdata.redirect
            }
        }
    })
})
$('register').onclick = function() {
    ajax({
        url:'/v1/api/register',
        method:'POST',
        async:true,
        data:{
            username:$('login-username').value,
            password:$('login-password').value
        },
        success: function() {

        }
    })
}