import {WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Col, Row, Select, Table} from "antd";
import axios from "axios"
import React, {FC, useEffect, useState} from "react"

const apiURL = "http://api.frankfurter.app/latest?from=AUD&to=CNY,BRL,ISK"
const columns = [
    {
        title: 'Currency',
        dataIndex: 'currency',
        key: 'currency'
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        key: 'rate'
    }
]

export const FXComponent: FC<WidgetPluginProps> = () => {

    const [fxRates, setFxRates] = useState([]);
    //TODO: Ex3-1 Add baseCurrency as state and set it to dollars as initial state. We will use this in future exercises

    // makes the API call to retrieve fxRates, base and date

    // TODO:  Ex 3-2
    //  1/ use a pivot table to build the query that will allow you to retrieve the currencies from the cube
    //  2/ import the the useQueryResult hook and use it with your query to retrieve the currencies. Don't forget to
    //  3/ use the returned values to: display  a spin if the query has not returned, print the stacktrace of the error if there is one, and finally pass the returned currencies to the api call  to get the rates.

    useEffect(() => {
        axios.get(apiURL).then(result => {

            let ratesTableData: any[] = Object.keys(result.data.rates).map(currency => {
                let data = {
                    key: currency,
                    currency: currency,
                    rate: result.data.rates[currency]
                }
                console.log(data)
                return data;
            });

            console.log(ratesTableData)
            setFxRates(ratesTableData)
        }
        ).catch(()=>{
            alert("could not retrieve fx Rates")
        })
    }, []);



    return (
        <div style={{height:"100%", overflow: "auto" , padding: 5}}>
            <Table
                columns={columns}
                dataSource={fxRates}
                size="small"
                bordered
                pagination={false}
            />
        </div>
    )
}