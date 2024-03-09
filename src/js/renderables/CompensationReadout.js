import { DATA_MAP } from "../common/dataMap";
import chroma from "chroma-js";
import SideReadout from "./SideReadout";
import { RENDER_KEYS } from "./Renderables";
const ID = RENDER_KEYS.CLOSED_LOOP_COMP;
const MAP_KEY = DATA_MAP.CLOSED_LOOP_COMP.id;

class compensationReadout extends SideReadout {
  constructor({ renderer, theme }) {
    super(
      { renderer, theme },
      {
        readoutOptions: SideReadout.ReadoutOptions.vac,
      }
    );
    this._dashID = ID;
  }
  initialize() {
    this._initialize();
    this.bargraph.colors = {
      colors: [
        chroma(this.theme.dangerColor),
        chroma(this.theme.warningColor),
        chroma(this.theme.gaugeActiveColor),
      ],
      chromaDomain: [0, 5, 7],
    };
  }

  // the data store values we want to listen too
  get dataKey() {
    return MAP_KEY;
  }

  set value(newValue) {
    // turn kpa into inHG
    newValue = Math.abs((newValue * 0.2961) - 29.61);
    
    this.readout.value = newValue;
    this.bargraph.value = newValue;
  }
}

compensationReadout.ID = ID;
export default compensationReadout;
