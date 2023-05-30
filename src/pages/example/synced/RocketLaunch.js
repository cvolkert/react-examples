import {useEffect, useState} from "react";
import {Alert, Button, Card} from "react-bootstrap";

let entries = []
export default function RocketLaunch(props) {

    const [countdown, setCountdown] = useState(10)

    const [rocketStarted, setRocketStarted] = useState(false)

    const [processLogs, setProcessLogs] = useState([])

    const getCurrentCountdown = () => {
        return countdown
    }

    async function processLog(message) {
        entries.push(message)
        setProcessLogs(entries.length > 10 ? entries.slice(entries.length - 10) : entries)
    }

    useEffect(() => {
        if (props.countDownStarted) {
            startCountDown().then()
        }
    }, [props.countDownStarted])

    useEffect(() => {
        if (!props.countDownStarted) return
        async function doCountdown(countdown) {
            await delay(1000)
            if (countdown > 0) {
                setCountdown(countdown - 1)
            }
        }

        doCountdown(countdown).then()
    }, [countdown, props.countDownStarted])


    const startCountDown = async function () {

        async function checkCountdown(){

            const currentCountdown = getCurrentCountdown();
            await processLog('...reading current countdown: ' + currentCountdown)
            if (currentCountdown > 0){
                return false
            }

            return true
        }

        while (!await checkCountdown()) {
            //do nothing
            await delay(1000)
        }
        await processLog('...launching rocket...')
        setRocketStarted(true)
    }



    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function renderLogOutput() {
        if (!processLogs?.length) return
        return <><h3>async function logs:</h3><Alert key={"danger"} variant={"danger"}>
            {processLogs.map(message => <div>{message}</div>)}
        </Alert></>
    }

    function renderCountDownInfo() {
        if (rocketStarted) {
            return <Alert key={"success"} variant={"success"}>rocket launched</Alert>
        }
        if (props.countDownStarted) {
            return <Alert key={"danger"} variant={"danger"}>
                current countdown: {countdown}
            </Alert>
        }
        return null
    }

    return <>

        <Card key={"without-callback"} style={{ width: '40rem', color: "#000" }}>
            <Card.Body>
                <Card.Title>Without 'useCallback'</Card.Title>
                <Card.Text>
                    asynchronous function can't access current state because of CallByValue.
                    All variables values are being locally stored async functions
                </Card.Text>
                <div>
                    {renderCountDownInfo()}
                </div>
                <br/>
                <div>
                    {renderLogOutput()}
                </div>
            </Card.Body>
        </Card>
    </>
}