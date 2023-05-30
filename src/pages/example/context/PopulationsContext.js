import React, {useContext, useState} from "react";

const PopulationsContext = React.createContext(null);

export function usePopulationContext() {
    const context = useContext(PopulationsContext)
    if (context === undefined) {
        throw new Error('Context must be used within a provider')
    }
    return context
}

const initialValues = [
    ["Paris", 2],
    ["Toronto", 2],
    ["Hamburg", 1],
    ["New York", 8]
];

export function PopulationsProvider({children}){

    const [populations, setPopulations] = useState(new Map(initialValues))

    const setPopulation = function(id, population){
        const lPopulations = new Map([...populations])

        lPopulations?.set(id, population)
        setPopulations(lPopulations)
    }

    return <PopulationsContext.Provider
            value={{populations, setPopulation}}>
            {children}
        </PopulationsContext.Provider>
}