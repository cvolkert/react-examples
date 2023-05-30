import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";
import SyncedRocketLaunch from "./SyncedRocketLaunch";
import RocketLaunch from "./RocketLaunch";
import SyncedExample from "./SyncedExample";

export default function RocketLauncherWrapper(props) {

    const [countDownStarted, setCountDownStarted] = useState(false)

    return <>
        <div className={"rocketLauncherWrapper"}>
            <Row>
                <Col>{
                    countDownStarted ? null : <Button onClick={() => setCountDownStarted(true)}>
                        start countdown
                    </Button>
                }</Col>
            </Row>
            <Row>
                <Col>
                   <RocketLaunch countDownStarted={countDownStarted} />
                </Col>
                <Col>
                    <SyncedRocketLaunch countDownStarted={countDownStarted}/>
                </Col>
            </Row>
            <Row>
                <SyncedExample />
            </Row>
        </div>

    </>
}