// !-- Cookie to JSON
function cookieRead() {
    return (
        document.cookie
            .split(';')
            .reduce((res, c) => {
                const [key, val] = c.trim().split('=').map(decodeURIComponent)
                const allNumbers = str => /^\d+$/.test(str);
                try {
                    return Object.assign(res, { [key]: allNumbers(val) ? val : JSON.parse(val) })
                } catch (e) {
                    return Object.assign(res, { [key]: val })
                }
            }, {})
    );
}

// !-- Creates and handles cookie
function createCookie(name, value, min) {
    if (min) {
        var date = new Date();
        date.setTime(date.getTime() + (min * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// !-- Scope manage
const scope = {
    cookieData: '',
};

function handleData(target){
    const value = target.value;
    scope.cookieData = value;
}

function generate(name, timestamp){
    createCookie(name, scope.cookieData, timestamp)
    const cookieJSON = cookieRead()
    console.log(cookieJSON)
    return (
        cookieJSON
    )
}