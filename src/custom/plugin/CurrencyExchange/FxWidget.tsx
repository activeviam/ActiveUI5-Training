import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { FXComponent } from "./FXComponent";

const widgetKey = "fx-rates"

//TODO Ex2: Register the FxComponent to the FxWidget
export const pluginFxRateWidget: WidgetPlugin = {
    Component: "Insert component here",
    initialState: {
        widgetKey
    },
    key: widgetKey
}