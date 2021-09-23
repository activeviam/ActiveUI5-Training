import { WidgetPlugin } from "@activeviam/activeui-sdk";
import { FXComponent } from "./FXComponent";
import {IconWorld} from "./IconWorld";

const widgetKey = "fx-rates"

//TODO Ex2-1: Register the FxComponent to the FxWidget
export const pluginFxRateWidget: WidgetPlugin = {
    Component: "Insert component here",
    initialState: {
        widgetKey
    },
    key: widgetKey
}