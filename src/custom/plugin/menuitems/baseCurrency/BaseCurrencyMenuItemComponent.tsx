import {getAntMenuItemProps, MenuItemProps, useQueryResult} from "@activeviam/activeui-sdk";
import {Button, List, Modal, Spin} from "antd";
import Menu from "antd/lib/menu";
import React, {FC, useEffect, useState} from 'react';
import {FxComponentWidgetState} from "../../CurrencyExchange/FxComponent.types";


export const BaseCurrencyMenuItemComponent:  FC<MenuItemProps<FxComponentWidgetState>> = (props) => {

    const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
    const [currencyList, setCurrencyList] = useState<Array<String>>([]);

    let {data, error, isLoading} = useQueryResult({
        serverKey: "Ranch-5.11",
        queryId: props.queryId,
        query: {
            mdx: "SELECT\n" +
                "  NON EMPTY Hierarchize(\n" +
                "    Descendants(\n" +
                "      {\n" +
                "        [Contracts (static)].[Currency].[AllMember]\n" +
                "      },\n" +
                "      1,\n" +
                "      SELF_AND_BEFORE\n" +
                "    )\n" +
                "  ) ON ROWS\n" +
                "  FROM [IFRS9]\n" +
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

    let currencies = [];
    if (data){
        let [columnAxis, rowsAxis] = data.axes;
        currencies = columnAxis.positions.reduce((results, position) => {
            if (position[0].captionPath[1]) {
                results.push(position[0].captionPath[1])
            }
            return results;
        }, [])
    }

    useEffect(() => {
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
                    dataSource={currencyList}
                    size="small"
                    style={{ width: 200 }}
                    renderItem={(item: string) => (
                        <List.Item>
                            <div>
                                <Button
                                    type="text"
                                    id={item}
                                    value={item}
                                    onClick={handleSelectCurrency}
                                >
                                    {item}
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>


        )
};