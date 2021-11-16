import {AWidgetState, MdxString, MemberCoordinates, Tuple} from "@activeviam/activeui-sdk";

export interface FxComponentWidgetState extends AWidgetState {
    query: MdxString
    baseCurrency: MemberCoordinates
}

export type BaseCurrency = string;