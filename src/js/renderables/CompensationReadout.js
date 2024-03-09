import chroma from "chroma-js";
import { DATA_MAP } from "../common/dataMap";
import { RENDER_KEYS } from "./Renderables";
import SideReadout from "./SideReadout";
const ID = RENDER_KEYS.CLOSED_LOOP_COMP;
const CLOSED_LOOP_COMP = DATA_MAP.CLOSED_LOOP_COMP.id;
class CompensationReadout extends SideReadout {
  constructor({ renderer, theme }) {
    super(
      { renderer, theme },
      {
        readoutOptions: SideReadout.ReadoutOptions.comp,
      }
    );
    this._dashID = ID;
  }
  initialize() {
    this._initialize();
    this.bargraph.colors = {
      colors: [
        chroma(this.theme.gaugeActiveColor),
        chroma(this.theme.warningColor),
        chroma(this.theme.dangerColor),
      ],
      chromaDomain: [0, 10, 25],
    };
  }

  // the data store values we want to listen too
  get dataKey() {
    return CLOSED_LOOP_COMP;
  }
}

CompensationReadout.ID = ID;
export default CompensationReadout;
