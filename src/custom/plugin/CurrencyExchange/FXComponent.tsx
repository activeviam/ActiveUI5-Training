import {WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Select, Table} from "antd";
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

export const FXComponent: FC<WidgetPluginProps> = (props) => {

    const [fxRates, setFxRates] = useState([]);

    // makes the API call to retrieve fxRates, base and date
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