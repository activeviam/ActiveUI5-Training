import {AWidgetState, MdxString} from "@activeviam/activeui-sdk";

export interface FxComponentWidgetState extends AWidgetState {
    query: MdxString
    baseCurrency: string
}

export type BaseCurrency = string;