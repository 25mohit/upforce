'use client'

const AuthWrapper = props => {
    const isUserValid = localStorage.getItem('token')
    

    if(isUserValid !== undefined && isUserValid !== null){
        return (
          <>{props.children}</>
        )
    } else {
        localStorage.clear()
        window.location.reload()
        window.location.href = '/'
    }
}

export default AuthWrapper