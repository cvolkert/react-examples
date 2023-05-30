import {useEffect, useState} from "react";
import useFun from "react-use-fun/src/useFun";

export default function SyncedExample(props){
    const [start, setStart] = useState(true)

    const checkCondition = useFun(  () => {
        return start
    }, [start]);

    useEffect(() => {

        async function longRunning(){
            console.log('processing started')
            while(checkCondition()){
                //do some weird processing
                await delay(1000)
                console.log('processing...')
            }
            console.log('processing ended.')
        }

        if (start) {
            longRunning().then()
            setStart(false)
        }
        else{
            console.log('processing aborted')
        }
    }, [start])

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }


    return <div>check console logs</div>
}