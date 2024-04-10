'use client'

const Authenticate = ({children}) => {
    const user = localStorage.getItem('user')


    return <div>
        {children}
    </div>
}

export default Authenticate