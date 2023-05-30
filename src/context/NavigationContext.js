import React, {useContext, useState} from "react";

const NavigationContext = React.createContext(null);

export function useNavigationContext() {
    const context = useContext(NavigationContext)
    if (context === undefined) {
        throw new Error('Context must be used within a provider')
    }
    return context
}

export default function NavigationProvider({children}){

    const [page, setPage] = useState('home')

    return <NavigationContext.Provider value={{page, setPage}}>
        {children}
    </NavigationContext.Provider>
}