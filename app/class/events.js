!function(){
    window.onload = init;
}()

function init(){
    const cookies = new CookieManager();
    
    const $input = document.querySelector('#input');
    const $btn = document.querySelector('#btn');

    $btn.addEventListener('click', e => {
        e.preventDefault();
        cookies.generate('myName', 5);

        const cookie = cookies.read('myName');
        console.log(cookie);
    })
    $input.addEventListener('input', e => {
        self = e.target;
        cookies.handleData('myName', self.value);
    })
}