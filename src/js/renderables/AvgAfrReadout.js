import { DATA_KEYS } from "../common/dataMap";
import MediumReadout from "./MediumReadout";
import { RENDER_KEYS } from "./Renderables";

const ID = RENDER_KEYS.AVERAGE_AFR_READOUT;
class AvgAfrReadout extends MediumReadout {
  constructor({ renderer, theme }) {
    super({ renderer, theme });
    this._dashID = ID;
  }

  // the data store values we want to listen too
  get dataKey() {
    return DATA_KEYS.AFR_AVERAGE;
  }
}

AvgAfrReadout.ID = ID;
export default AvgAfrReadout;
