import {WidgetPlugin} from "@activeviam/activeui-sdk";
import {FXComponent} from "./FXComponent";
import {IconWorld} from "./IconWorld";

const widgetKey = "fx-rates"

//TODO: Ex2-1 Register the FxComponent to the FxWidget
// Add Translations
// TODO: Ex4 - Add the baseCurrency,  the query and the widget key to the initial state.
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