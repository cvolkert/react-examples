import {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {usePopulationContext} from "./PopulationsContext";

export default function Population(props){
    const [rerenders, setRerenders] = useState(0)
    const {populations, setPopulation} = usePopulationContext()

    useEffect(() => {
        if (!populations) return
        setRerenders(rerenders + 1)
    }, [populations])

    const increasePopulation = function(){
        setPopulation(props.name, populations.get(props.name) + 1)
    }

    return <Card key={props.name} style={{ width: '18rem', color: "#000" }}>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                <div>Population: {populations.get(props.name)}</div>
                <div>Rerenders: {rerenders}</div>
            </Card.Text>
            <Button onClick={increasePopulation} variant="primary">Increase</Button>
        </Card.Body>
    </Card>}