import {AWidgetState, MdxString} from "@activeviam/activeui-sdk";

export interface FxComponentWidgetState extends AWidgetState {
    baseCurrency: string,
    query: MdxString
}