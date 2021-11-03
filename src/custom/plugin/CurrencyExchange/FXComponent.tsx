import {WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Col, Row, Select, Table} from "antd";
import axios from "axios"
import React, {FC, useEffect, useState} from "react"

const apiURL = "http://api.frankfurter.app/"
const possibleBaseCurrencies=["USD","EUR"]
const possibleDates=["latest", "2021-09-22"]
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

    const [base, setBase] = useState("USD");
    const [date, setDate] = useState("latest");
    const [fxRates, setFxRates] = useState([]);

    // makes the API call to retrieve fxRates, base and date
    useEffect(() => {
        axios.get(`${apiURL}${date}?from=${base}&to=GBP,EUR,AUD`).then(result => {
            console.log("result.data")

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

            setBase(result.data.base)
            setDate(result.data.date)
            setFxRates(ratesTableData)
        }
        ).catch(()=>{
            alert("could not retrieve fx Rates")
        })
    }, []);

    const baseCurrencyOptions = possibleBaseCurrencies.map(currency => {
        console.log(currency);
        return (
            <Select.Option value={currency}>{currency}</Select.Option>
            // {label: currency, value: currency}
        );
    });

    const handleChange = (event: any) => {
        console.log(event.currentTarget.value);
        setBase(event.currentTarget.value)
    }

    return (
        <div style={{height:"100%", overflow: "auto"}}>
            {/*<Select*/}
            {/*    defaultValue={date}*/}
            {/*    style={{ width: 120 }}*/}
            {/*    placeholder="select a date"*/}
            {/*>*/}
            {/*    {*/}
            {/*        possibleDates.map(date => (*/}
            {/*                <Option value={date}>{date}</Option>*/}
            {/*            )*/}
            {/*        )*/}
            {/*    }*/}
            {/*</Select>*/}
            {/*<Table*/}
            {/*    columns={columns}*/}
            {/*    dataSource={fxRates}*/}
            {/*    size="small"*/}
            {/*    bordered*/}
            {/*    pagination={false}*/}
            {/*/>*/}
                <Select
                    style={{ padding: "4px 4px", width: 120 }}
                    // options={baseCurrencyOptions}
                >
                    <Select.Option value={1}>test1</Select.Option>
                    <Select.Option value={2}>test2</Select.Option>
                </Select>

        </div>
    )
}