import {AWidgetState, MdxString} from "@activeviam/activeui-sdk";

// TODO: Ex5 - Change the baseCurrency type from string to Member
export interface FxComponentWidgetState extends AWidgetState {
    query: MdxString
    baseCurrency: string
}

export interface RatesTableData {
    key: string
    currency: string
    rate: number
}

export type BaseCurrency = string;