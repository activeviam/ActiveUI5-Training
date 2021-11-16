import {CellSetSelection, WidgetPlugin} from "@activeviam/activeui-sdk";
import {FXComponent} from "./FXComponent";
import {BaseCurrency, FxComponentWidgetState} from "./FxComponent.types";
import {IconWorld} from "./IconWorld";

const widgetKey = "fx-rates"

//TODO Ex2-1: Register the FxComponent to the FxWidget
// Add Translations
export const pluginFxRateWidget: WidgetPlugin<FxComponentWidgetState, CellSetSelection> = {
    Component: FXComponent,
    Icon: IconWorld,
    initialState: {
        widgetKey,
        baseCurrency: {
            namePath: [
                "AllMember",
                "EUR"
            ],
            captionPath: [
                "AllMember",
                "EUR"
            ],
            properties: {
                "DISPLAY_INFO": 0
            }
        },
        query: "SELECT\n" +
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
    },
    key: widgetKey,
    translations: {
        "en-US": {
            key: widgetKey,
            defaultName: "Fx Rates"
        }
    }
}