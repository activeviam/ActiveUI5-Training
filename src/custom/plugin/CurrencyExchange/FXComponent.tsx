import {useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Spin, Table} from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios"
import React, {FC, useEffect, useState} from "react"
import {FxComponentWidgetState} from "./FxComponent.types";

const apiBaseURl = "http://api.frankfurter.app/"
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

export const FXComponent: FC<WidgetPluginProps<FxComponentWidgetState>> = (props) => {

    const [fxRates, setFxRates] = useState([]);
    const [baseCurrency, setbaseCurrency] = useState(props.widgetState.baseCurrency);
    const [isWaitingForAPI, setIsWaitingForAPI] = useState(true);

    let {data, error, isLoading} = useQueryResult({
        serverKey: "Ranch-5.10",
        queryId: props.queryId,
        query: {
            mdx: props.widgetState.query
        }
    });



    // makes the API call to retrieve fxRates, base and date, once we have the data from the cube
    useEffect(() => {
        if (data) {
            let [columnAxis, rowsAxis] = data.axes;
            let currencies = columnAxis.positions.map((position) => {
                if ( position[0].captionPath[1]) {
                    return position[0].captionPath[1]
                }
            });
            console.log(currencies);
            const updatedApiUrl = `${apiBaseURl}latest?from=${baseCurrency}&to=${currencies.join(",")}`
            axios.get(updatedApiUrl).then(result => {

                    let ratesTableData: any[] = Object.keys(result.data.rates).map(currency => {
                        let data = {
                            key: currency,
                            currency: currency,
                            rate: result.data.rates[currency]
                        }
                        return data;
                    });

                    setFxRates(ratesTableData)
                    setIsWaitingForAPI(false);
                }
            ).catch(()=>{
                alert("could not retrieve fx Rates")
            })
        }
    }, [data]);

    if (isLoading) {
        return <Spin/>
    }

    if (error) {
        return <p>{error.stackTrace}</p>
    }

    if (isWaitingForAPI) {
        return <Spin/>
    }



    return (
        <div style={{height:"100%", overflow: "auto" , padding: 5}}>
            <Title level={4}>{`Base Currency: ${baseCurrency}`}</Title>
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