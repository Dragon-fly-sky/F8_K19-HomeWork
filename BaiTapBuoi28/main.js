const postLogin = async (username, password) => {
    try {
        const req = await fetch('https://dummyjson.com/auth/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 1
            })
        })
        const data = await req.json()
        return data
    } catch (error) {
        console.log('Lỗi:' + error)
    }
}


const onLogin = async () => {
    const username = document.querySelector('#username').value.trim()
    const password = document.querySelector('#password').value.trim()
    console.log(username, password)
    const token = await postLogin(username, password)
    if (token.accessToken) {
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
        window.location.href = 'user.html'
    }


}


const btnLogin = document.querySelector('.btn-login')
btnLogin.addEventListener('click', onLogin)