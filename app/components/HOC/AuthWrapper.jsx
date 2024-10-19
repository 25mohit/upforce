'use client'

const AuthWrapper = props => {
    if (typeof window !== 'undefined') {

        const isUserValid = localStorage.getItem('token')
        
        console.log("localStorage", window, window.localStorage);
    
        
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
}

export default AuthWrapper