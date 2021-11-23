import {getAntMenuItemProps, MenuItemProps, useQueryResult} from "@activeviam/activeui-sdk";
import {Button, List, Modal, Spin} from "antd";
import Menu from "antd/lib/menu";
import React, {FC, useEffect, useState} from 'react';
import {FxComponentWidgetState} from "../../CurrencyExchange/FxComponent.types";


export const BaseCurrencyMenuItemComponent:  FC<MenuItemProps<FxComponentWidgetState>> = (props) => {

    const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
    const [currencyList, setCurrencyList] = useState<Array<any>>([]);

    let {data, error, isLoading} = useQueryResult({
        serverKey: "Ranch-5.10",
        queryId: props.queryId,
        query: {
            mdx: "SELECT\n" +
                "  NON EMPTY Hierarchize(\n" +
                "    Descendants(\n" +
                "      {\n" +
                "        [Currency].[Currency].[AllMember]\n" +
                "      },\n" +
                "      1,\n" +
                "      SELF_AND_BEFORE\n" +
                "    )\n" +
                "  ) ON ROWS\n" +
                "  FROM [EquityDerivativesCube]\n" +
                "  CELL PROPERTIES VALUE, FORMATTED_VALUE, BACK_COLOR, FORE_COLOR, FONT_FLAGS"
        }
    });

    const handleChangebaseCurrency: MenuItemProps["onClick"] = (param) => {
        // the props.onClick will make the custom menuItem disappear when the modal opens
        if (props.onClick) {
            props.onClick(param)
        }
        setCurrencyModalVisible(true)
    }

    const handleSelectCurrency = (event: any, currencyList: Array<any>) => {
        const newBaseCurrency = currencyList.find(currency => currency.captionPath[1] === event.currentTarget.value);
        props.onWidgetChange({
            ...props.widgetState,
            baseCurrency: newBaseCurrency
        })
    }

    const handleCancel =() => {
        setCurrencyModalVisible(false);
    }

    const handleOnOk = () => {
        setCurrencyModalVisible(false);
        console.log(props.selection)
    }
    if (isLoading) {
        return <Spin/>
    } else if (error) {
        return <p>error.stackTrace</p>
    }

    useEffect(() => {
        let currencies: string[]= [];
        if (data){
            let [columnAxis, rowsAxis] = data.axes;
            currencies = columnAxis.positions.reduce((results, position) => {
                if (position[0]) {
                    results.push(position[0])
                }
                return results;
            }, currencies)
    }
        setCurrencyList(currencies);
    }, [data]);


    return (
        <div>
            <Menu.Item {...getAntMenuItemProps(props)} onClick={handleChangebaseCurrency}>
                Change base currency
            </Menu.Item>

            <Modal
                visible={currencyModalVisible}
                onCancel={handleCancel}
                onOk={handleOnOk}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={currencyList.filter(currency => currency.captionPath[1] !== undefined)}
                    size="small"
                    style={{ width: 200 }}
                    renderItem={(item: any) => (
                        <List.Item>
                                <Button
                                    type="text"
                                    id={item.captionPath[1]}
                                    value={item.captionPath[1]}
                                    onClick={e => handleSelectCurrency(e, currencyList)}
                                >
                                    {item.captionPath[1]}
                                </Button>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>


        )
};