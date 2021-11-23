import {AWidgetState, MdxString} from "@activeviam/activeui-sdk";

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