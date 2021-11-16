import {AWidgetState, MdxString, Member, MemberCoordinates, Tuple} from "@activeviam/activeui-sdk";

export interface FxComponentWidgetState extends AWidgetState {
    query: MdxString
    baseCurrency: Member
}

export type BaseCurrency = string;