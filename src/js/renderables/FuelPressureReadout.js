import chroma from "chroma-js";
import { DATA_MAP } from "../common/dataMap";
import { RENDER_KEYS } from "./Renderables";
import SideReadout from "./SideReadout";
const ID = RENDER_KEYS.FUEL_PRESSURE;
const FUEL_PRESSURE_KEY = DATA_MAP.FUEL_PRESSURE.id;
class FuelPressureReadout extends SideReadout {
  constructor({ renderer, theme }) {
    super(
      { renderer, theme },
      {
        readoutOptions: SideReadout.ReadoutOptions.fuel,
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
      chromaDomain: [0, 20, 25],
    };
  }

  // the data store values we want to listen too
  get dataKey() {
    return FUEL_PRESSURE_KEY;
  }
}

FuelPressureReadout.ID = ID;
export default FuelPressureReadout;
