import React, {useContext, useEffect, useState} from 'react';
import {useObservable} from "react-observable-context";

export const ObservedContext = React.createContext(null);

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

export function ObservablePopulationsProvider({children}){

    const [populations, setPopulations] = useState(new Map(initialValues))
    const {notify, subscribe} = useObservable(notifyListener)


    useEffect(() => {
        notifyListener()
    }, [populations])

    /** notify all dependend components on relevant data changes
     *  @param index if null or undefined, all components get notified
     *  otherwise online the component with the given index will be notified
     **/
    function notifyListener(index){
        notify(populations, index)
    }

    const setPopulation = function(id, population){
        const lPopulations = new Map([...populations])

        lPopulations?.set(id, population)
        setPopulations(lPopulations)
    }

    return <ObservedContext.Provider value={subscribe}>
        <PopulationsContext.Provider
            value={{setPopulation}}>
            {children}
        </PopulationsContext.Provider>
    </ObservedContext.Provider>
}