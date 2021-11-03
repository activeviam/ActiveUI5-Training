import {Dropdown, Select, Table, TableProps} from "antd";
import React, {FC, useEffect, useState} from "react"
import axios from "axios"
import {useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";

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

export const FXComponent: FC<WidgetPluginProps> = (props) => {

    const [base, setBase] = useState("USD");
    const [date, setDate] = useState("latest");
    const [fxRates, setFxRates] = useState([]);

    // makes the API call to retrieve fxRates, base and date
    useEffect(() => {
        axios.get(`${apiURL}${date}?from=${base}&to=GBP,EUR,AUD`).then(result => {

            let ratesTableData: any[] = Object.keys(result.data.rates).map(currency => {
                let data = {
                    key: currency,
                    currency: currency,
                    rate: result.data.rates[currency]
                }
                return data;
            });

            setBase(result.data.base)
            setDate(result.data.date)
            setFxRates(ratesTableData)
        }
        ).catch(()=>{
            alert("could not retrieve fx Rates")
        })
    }, []);

    let baseCurrencyOptions = possibleBaseCurrencies.map(currency => {
        return (
            <Select.Option value={currency}>{currency}</Select.Option>
        );
    });

    return (
        <div style={props.style}>
            <Select
                defaultValue={base}
                style={{ width: 120 }}
                placeholder="select base currency"
            >
                {
                    possibleBaseCurrencies.map(currency => (
                            <Option value={currency}>{currency}</Option>
                        )
                    )
                }
            </Select>
            <Select
                defaultValue={date}
                style={{ width: 120 }}
                placeholder="select a date"
            >
                {
                    possibleDates.map(date => (
                            <Option value={date}>{date}</Option>
                        )
                    )
                }
            </Select>
            <p></p>
            <Table
                columns={columns}
                dataSource={fxRates}
                size="small"
                bordered
            />
        </div>
    )
}