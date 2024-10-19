const AuthWrapper = props => {
    const isUserValid = localStorage.getItem('token') 

    if(isUserValid !== undefined && isUserValid !== null){
        
        function decrypt() {
        
            const parts = isUserValid.split('.');
        
            if (parts.length !== 3) {
            return null;
            }
        
            const payload = parts[1];
        
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        
            try {

                return JSON.parse(atob(base64));
            } catch (error) {
                console.error('Error decoding token:', error);
            return null;
            }
        }  
        function removeUser(){
            localStorage.clear()
            window.location.reload()
            window.location.href = '/'
        }
        const descrpted = decrypt()
        if(descrpted.exp < (Date.now() / 1000)){
            return removeUser()
        }
        console.log("descrpted", descrpted, descrpted.exp < (Date.now() / 1000));
    
        return (
        <>{props.children}</>
        )
    } else {
        removeUser()
    }
}

export default AuthWrapper