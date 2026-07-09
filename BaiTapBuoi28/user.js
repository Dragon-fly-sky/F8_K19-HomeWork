const getUser = async () => {
    try {
        let accessToken = localStorage.getItem('accessToken')

        let res = await fetch('https://dummyjson.com/auth/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (res.status === 401) {
            const newAccessToken = await refreshToken()

            if (!newAccessToken) {
                localStorage.clear()
                window.location.href = 'index.html'
                return
            }

            // gọi lại API
            res = await fetch('https://dummyjson.com/auth/me', {
                headers: {
                    Authorization: `Bearer ${newAccessToken}`
                }
            })
        }

        return await res.json()
    } catch (error) {
        console.log(error)
    }
}

const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    try {
        const res = await fetch(
            'https://dummyjson.com/auth/refresh',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refreshToken,
                    expiresInMins: 1
                }),

            }
        )

        if (!res.ok) {
            return null
        }

        const data = await res.json()

        localStorage.setItem(
            'accessToken',
            data.accessToken
        )

        return data.accessToken

    } catch (error) {
        console.log(error)
        return null
    }
}


const genderUser = async () => {
    const user = await getUser()
    document.body.innerHTML = `
            <img src = "${user.image}" alt = "${user.firstName}" >
            <h2>${user.firstName} ${user.lastName}</h2>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Gender: ${user.gender}</p>`
}

const checkToken = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) window.location.href = 'index.html'
}

genderUser()
checkToken()