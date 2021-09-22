import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { CurrencyExchangeComponent } from "./CurrencyExchangeComponent";

const widgetKey = "currency-exchange"

export const CurrencyExchangeWidget: WidgetPlugin = {
    Component: CurrencyExchangeComponent,
    initialState: {
        widgetKey
    },
    key: widgetKey
}