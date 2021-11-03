import {useQueryResult, WidgetPluginProps} from "@activeviam/activeui-sdk";
import {Spin} from "antd";
import React, {FC} from 'react'

export const QueryComponent: FC<WidgetPluginProps> = (props) => {

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

    console.log(isLoading, data);
;

    if (isLoading) {
        return <Spin/>
    }

    if (error) {
        return <p>{error.stackTrace}</p>
    }

    const [columnsAxis, rowsAxis] = data.axes;
    console.log("axes");
    console.log(columnsAxis);
    console.log(rowsAxis);
    const numberOfColumns = columnsAxis.positions.length;

    return (
        <div>
            <table>
                <tr>
                    <th/>
                    {columnsAxis.positions.map((position, columnIndex) => (
                        <th key={columnIndex}>{position[0].captionPath[1]}</th>
                    ))}
                </tr>
                {/*{rowsAxis.positions.map((position, rowIndex) => {*/}
                {/*    const tableCells: JSX.Element[] = [];*/}

                {/*    // the first column represents the members of the rows axis (the countries)*/}
                {/*    tableCells.push(<td key={0}>{position[0].captionPath[2]}</td>);*/}

                {/*    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {*/}
                {/*        const cellIndex = rowIndex * numberOfColumns + columnIndex;*/}
                {/*        // HERE we use data.cells!*/}
                {/*        const dataCell = data.cells[cellIndex];*/}

                {/*        tableCells.push(*/}
                {/*            <td key={columnIndex + 1}>{dataCell?.formattedValue}</td>,*/}
                {/*        );*/}
                {/*    }*/}

                {/*    return <tr key={rowIndex}>{tableCells}</tr>;*/}
                {/*})}*/}
            </table>
        </div>
    )
}