import { WidgetPlugin } from "@activeviam/activeui-sdk";
import {IconWorld} from "../CurrencyExchange/IconWorld";
import {QueryComponent} from "./QueryComponent";

const widgetKey = "Query-widget"

export const pluginQueryWidget: WidgetPlugin = {
    Component: QueryComponent,
    Icon: IconWorld,
    initialState: {
        widgetKey
    },
    key: widgetKey,
    translations: {
        "en-US": {
            key: widgetKey,
            defaultName: "Query Widget"
        }
    }
}