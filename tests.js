class Test {
    static My01() {
        console.log('My 1')
    }
    static My02() {
        console.log('My 2')
    }

    static get My03() {
        return "GET My"
    }
}

//console.log(Test['My03'])

v = "My01"



if (typeof Test[v] === 'function')
    Test[v]()
else 
    console.log( Test[v])