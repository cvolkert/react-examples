import {useEffect, useState} from "react";
import {useObservedContext} from "react-observable-context";
import {ObservedContext, usePopulationContext} from "./ObservablePopulationsContext";
import {Button, Card} from "react-bootstrap";

export default function ObservingPopulation(props){

    const [rerenders, setRerenders] = useState(0)
    const [myPopulation, setMyPopulation] = useState()

    useEffect(() => {
        if (!myPopulation) return
        setRerenders(rerenders + 1)
    }, [myPopulation])

    useObservedContext((populations) => {
        console.log('received populations: ', populations)
        if (!populations?.has(props.name)) return
        if (populations.get(props.name) === myPopulation) return
        setMyPopulation(populations.get(props.name))
    }, ObservedContext, [])

    const {setPopulation} = usePopulationContext()

    const increasePopulation = function(){
        setPopulation(props.name, myPopulation + 1)
    }

    return <Card key={props.name} style={{ width: '18rem', color: "#000" }}>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                <div>Population: {myPopulation}</div>
                <div>Rerenders: {rerenders}</div>
            </Card.Text>
            <Button onClick={increasePopulation} variant="primary">Increase</Button>
        </Card.Body>
    </Card>
}