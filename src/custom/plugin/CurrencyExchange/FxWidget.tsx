import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { FXComponent } from "./FXComponent";

const widgetKey = "currency-exchange"

export const FxWidget: WidgetPlugin = {
    Component: FXComponent,
    initialState: {
        widgetKey
    },
    key: widgetKey
}