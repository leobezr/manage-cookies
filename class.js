class CookieManager {
    constructor(){
        this.scope = {}
    }

    // !-- Reads and Parse
    read = function (sortByName) {
        if (sortByName === undefined) {
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
        } else {
            const cookie = document.cookie
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

            const data = []
            for ( let i in cookie ){
                data.push(cookie[i])
            }
            return (
                data,
                cookie.sortByName
            )
        }
    }

    // !-- Generates cookie
    create = function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // !-- This is the event listener
    handleData = function(name, reader){debugger
        this.value = reader;
        this.scope += {name: this.value};
    }

    generate = function(name, value, timestamp){
        createCookie(name, value, timestamp)
        const cookieJSON = cookieRead()
        console.log(cookieJSON)
        return (
            cookieJSON
        )
    }
}