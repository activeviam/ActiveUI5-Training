import { WidgetPlugin } from "@activeviam/activeui-sdk";
import {QueryComponent} from "../queryWidget/QueryComponent";
import { FXComponent } from "./FXComponent";
import {IconWorld} from "./IconWorld";
import {SelectComponent} from "./SelectComponent";

const widgetKey = "fx-rates"

//TODO Ex2-1: Register the FxComponent to the FxWidget
// Add Translations
export const pluginFxRateWidget: WidgetPlugin = {
    Component: FXComponent,
    Icon: IconWorld,
    initialState: {
        widgetKey
    },
    key: widgetKey,
    translations: {
        "en-US": {
            key: widgetKey,
            defaultName: "Fx Rates"
        }
    }
}