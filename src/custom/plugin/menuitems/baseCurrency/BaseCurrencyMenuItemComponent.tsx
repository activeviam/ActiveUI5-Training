import {getAntMenuItemProps, MenuItemProps, useQueryResult} from "@activeviam/activeui-sdk";
import {Button, List, Modal, Spin} from "antd";
import Menu from "antd/lib/menu";
import React, {FC, useEffect, useState} from 'react';
import {FxComponentWidgetState} from "../../CurrencyExchange/FxComponent.types";


export const BaseCurrencyMenuItemComponent:  FC<MenuItemProps<FxComponentWidgetState>> = (props) => {

    const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
    const [currencyList, setCurrencyList] = useState<Array<string>>([]);

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
        if (props.onClick) {
            props.onClick(param)
        }
        setCurrencyModalVisible(true)
    }

    // TODO: EX5 -the currency list now has to be passed to the event handler
    const handleSelectCurrency = (event: any) => {
        props.onWidgetChange({
            ...props.widgetState,
            baseCurrency: event.currentTarget.value
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

    // TODO:  Ex5 -  reflect the change of type for the base currency in the useEffect hook
    useEffect(() => {
    let currencies: string[] = [];
    if (data){
        let [columnAxis, rowsAxis] = data.axes;
        currencies = columnAxis.positions.reduce((results, position) => {
            if (position[0].captionPath[1]) {
                results.push(position[0].captionPath[1])
            }
            return results;
        }, currencies)
    }

    setCurrencyList(currencies);
    }, [data]);


    // TODO: Ex5 -  reflect the change in the currency List type in the List
    // The signature of the handleSelectedCurrency handler has also changed
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
                    dataSource={currencyList}
                    size="small"
                    style={{ width: 200 }}
                    renderItem={(item: string) => (
                        <List.Item>
                                <Button
                                    type="text"
                                    id={item}
                                    value={item}
                                    onClick={handleSelectCurrency}
                                >
                                    {item}
                                </Button>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>


        )
};