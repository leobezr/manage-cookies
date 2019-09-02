!function(){
    window.onload = init;
}()

function init(){
    const cookies = new CookieManager();
    
    const $input = document.querySelector('#input');
    const $btn = document.querySelector('#btn');

    $btn.onclick = cookies.generate('myName', 5);
    $input.addEventListener('input', e => {
        self = e.target;
        cookies.handleData('myName', self.value)
    })
}