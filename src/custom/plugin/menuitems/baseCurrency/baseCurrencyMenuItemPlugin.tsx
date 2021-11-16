import {MenuItemPlugin} from "@activeviam/activeui-sdk";
import {BaseCurrencyMenuItemComponent} from "./BaseCurrencyMenuItemComponent";

// TODO:  Make the plugin a menu item plugin  and add a key  and component
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