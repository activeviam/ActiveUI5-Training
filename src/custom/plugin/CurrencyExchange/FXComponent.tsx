import {set} from "lodash";
import React, {FC, useEffect, useState} from "react"
import axios from "axios"
import { WidgetPluginProps } from "@activeviam/activeui-sdk";

const apiURL = "http://api.frankfurter.app/latest?from=AUD&to=CNY"

export const FXComponent: FC<WidgetPluginProps> = (props) => {

    const [base, setBase] = useState("");
    const [date, setDate] = useState(null);
    const [fxRates, setFxRates] = useState({});

    // makes the API call to retrieve fxRates, base and date
    useEffect(() => {
        axios.get(apiURL).then(result => {
            console.log("result.data")
            setBase(result.data.base)
            setDate(result.data.date)
            setFxRates(result.data.rates)
        }
        ).catch(()=>{
            alert("could not retrieve fx Rates")
        })
    }, []);



    return (
        <div>
            <p>${base}</p>
            <p>${date}</p>
            <li>
                {Object.keys(fxRates).map(rate => {
                    return (<ul>${rate}:${fxRates[rate]}</ul>)
                })}
            </li>
        </div>
    )
}