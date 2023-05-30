import {PopulationsProvider} from "./PopulationsContext";
import Population from "./Population";
import ObservingPopulation from "./ObservingPopulation";
import { Card, Col, Row} from "react-bootstrap";
import {ObservablePopulationsProvider} from "./ObservablePopulationsContext";

export default function PopulationsWrapper(props) {

    const populations = ["Hamburg", "Paris", "Toronto", "New York"]

    function renderContext() {
        const components = populations.map(id =>
            <Col><Population name={id}/></Col>
        )

        return <>
            <Card key={props.name} style={{color: "#000"}}>
                <Card.Body>
                    <Card.Title>
                        React Context usage
                    </Card.Title>
                    <Card.Text>
                        normally every component rerenders once the context changes <br/> no matters if they are
                        affected by the changes or not.
                    </Card.Text>

                    <div className={"example-list"}>
                        <Row>
                            {components}
                        </Row>
                    </div>

                </Card.Body>
            </Card>
        </>
    }

    function renderObservedContext() {
        const components = populations.map(id =>
            <Col><ObservingPopulation name={id}/></Col>
        )

        return <>
            <Card key={props.name} style={{color: "#000", marginTop: "15px"}}>
                <Card.Body>
                    <Card.Title>
                        Observed Context usage
                    </Card.Title>
                    <Card.Text>
                        observing a context gives the decision whether to rerender or not to the components that are using<br /> the context in order to rerender only if they were affected by the changes.
                    </Card.Text>

                    <div className={"observing-example-list"}>
                        <Row>
                            {components}
                        </Row>
                    </div>

                </Card.Body>
            </Card>
        </>
    }

    return <>
        <Row>
            <Col>
                <PopulationsProvider>
                    {renderContext()}
                </PopulationsProvider>
            </Col>
            <Col>
                <ObservablePopulationsProvider>
                    {renderObservedContext()}
                </ObservablePopulationsProvider>
            </Col>
        </Row>


    </>
}