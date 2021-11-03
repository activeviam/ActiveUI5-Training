import {useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Spin} from "antd";
import React, {FC} from 'react'

export const QueryComponent: FC<WidgetPluginProps> = (props) => {

    let {data, error, isLoading} = useQueryResult({
        serverKey: "sandbox-5.10",
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

    console.log("hello world");
    console.log(error);
    console.log(isLoading, data);
    console.log(data);

    if (isLoading) {
        return <Spin/>
    }

    if (error) {
        return
    }

    return (
        <div>
            {'placeholder for QueryComponent'}
        </div>
    )
}