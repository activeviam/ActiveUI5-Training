import {getAntMenuItemProps, MenuItemProps, useQueryResult} from "@activeviam/activeui-sdk";
import {Button, List, Modal, Spin} from "antd";
import Menu from "antd/lib/menu";
import React, {FC, useEffect, useState} from 'react';


export const BaseCurrencyMenuItemComponent:  FC<MenuItemProps> = (props) => {

    const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
    const [selectedBaseCurrency, setSelectedBaseCurrency] = useState(null);
    const [currencyList, setCurrencyList] = useState<Array<String>>([]);

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

    const handleSelectCurrency = (event: any) => {
        setSelectedBaseCurrency(event.currentTarget.value);
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