import {axisIds, CellSetSelection, useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
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

export const FXComponent: FC<WidgetPluginProps<FxComponentWidgetState,CellSetSelection>> = (props) => {

    const [fxRates, setFxRates] = useState<Array<any>>([]);
    const [baseCurrency, setbaseCurrency] = useState(props.widgetState.baseCurrency);
    const [isWaitingForAPI, setIsWaitingForAPI] = useState(true);

    const { onSelectionChange } = props;


    let {data, error, isLoading} = useQueryResult({
        serverKey: "Ranch-5.10",
        queryId: props.queryId,
        query: {
            mdx: props.widgetState.query
        }
    });

    useEffect(() => {
        if (!data || !onSelectionChange) {
            return;
        }

        const selectedCurrency: CellSetSelection = {
            axes: [
                {
                    id: axisIds.rows,
                    positions: [[{
                        dimensionName: "Currency",
                        hierarchyName: "Currency",
                        ...baseCurrency

                    }]]
                }
            ]
        }
        onSelectionChange(selectedCurrency);

    }, [data, onSelectionChange, baseCurrency]);


    useEffect(() => {
        setbaseCurrency(props.widgetState.baseCurrency);
    }, [props.widgetState.baseCurrency]);


    // makes the API call to retrieve fxRates, base and date, once we have the data from the cube
    useEffect(() => {
        if (data) {
            let [columnAxis, rowsAxis] = data.axes;
            let currencies = columnAxis.positions.map((position) => {
                if ( position[0].captionPath[1]) {
                    return position[0].captionPath[1]
                }
            });
            let apiBaseCurrency  = baseCurrency.captionPath[1]
            const updatedApiUrl = `${apiBaseURl}latest?from=${apiBaseCurrency}&to=${currencies.join(",")}`
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
    }, [data,baseCurrency]);

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
            <Title level={4}>{`Base Currency: ${baseCurrency.captionPath[1]}`}</Title>
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