class CookieManager {
    constructor() {
        this.scope = {}
        this.clean();
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

            return this.scope[sortByName]
            
        }
    }

    // !-- Generates cookie
    create = function (value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }

        for(let i = 0; i < Object.keys(this.scope).length; i++){
            if ( Object.values(this.scope)[i] == this.scope[value] ){
                document.cookie = Object.keys(this.scope)[i] + "=" + this.scope[value] + expires + "; path=/";
            }
        }

        this.read('myName');
    }

    // !-- This is the event listener
    handleData = function (name, reader) {
        this.value = reader;
        this.scope[name] = this.value;
    }

    // !-- Calls Create Cookie
    generate = function (name, timestamp) {
        for (let i = 0; i < Object.keys(this.scope).length; i++ ) {
            if (Object.keys(this.scope)[i] === name) {
                this.create( Object.keys(this.scope)[i], timestamp )
            }
        }
        const cookieJSON = this.read();
        return (
            cookieJSON
        )
    }

    // !-- Cleans all cookies
    clean = function () {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}