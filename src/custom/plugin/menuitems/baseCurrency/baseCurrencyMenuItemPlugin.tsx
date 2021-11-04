import {MenuItemPlugin} from "@activeviam/activeui-sdk";
import {BaseCurrencyMenuItemComponent} from "./BaseCurrencyMenuItemComponent";

export const pluginMenuItemBaseCurrency: MenuItemPlugin = {
    key: "base-currency",
    // @ts-ignore
    Component: BaseCurrencyMenuItemComponent,
    translations: {
        "en-US": {
            caption: "select base currency",
        }
    },
};