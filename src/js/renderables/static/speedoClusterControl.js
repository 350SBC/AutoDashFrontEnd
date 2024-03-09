import * as PIXI from "pixi.js";
import { SCREEN } from "../../appConfig";
import Odometer from "../odometer";
import { RENDER_KEYS } from "../Renderables";
import RPMGauge from "../RPMGauge";
import SpeedoReadout from "../SpeedoReadout";
import SpeedoSweep from "../SpeedoSweep";
const NAME = "SpeedoCluster";
const speedoCluster = new PIXI.Container();
/**
 * @type {PIXI.BitmapText}
 */
let text = null;

/**
 * @returns {StaticObject}
 */
const speedoClusterControl = {
  name: NAME,
  /**
   * Creates the RPM cluster logo and houses the PedalGauge and RpmGauge
   * @returns {Array<PIXI.Container>}
   */
  create: ({ stage, renderer, theme, renderables }) => {
    /** @type {RPMGauge} */
    const rpmGauge = renderables[RENDER_KEYS.RPM_GAUGE];
    /** @type {SpeedoReadout} */
    const speedoReadout = renderables[RENDER_KEYS.SPEEDO_READOUT];
    /** @type {SpeedoSweep} */
    const speedoSpeed = renderables[RENDER_KEYS.SPEEDO_SWEEP];
    /** @type {Odometer} */
    const odometer = renderables[RENDER_KEYS.ODOMETER];

    speedoCluster.x = rpmGauge.x + rpmGauge.gaugeWidth * 0.5; // magic fudge mumber
    speedoCluster.y = SCREEN.SPEEDO_CLUSTER_Y;

    speedoReadout.x = speedoSpeed.width - speedoReadout.width;
    speedoReadout.y = SCREEN.BOTTOM_CONTENT_Y - speedoReadout.height - SCREEN.ODOMETER_READOUT_HEIGHT;

    /**
     * @type {PIXI.BitmapText}
     */
    text = new PIXI.BitmapText("MPH", {
      fontName: "Orbitron",
      fontSize: 60,
      align: "left",
    });
    text.tint = theme.gaugeActiveColor;
    text.angle = 180; // no idea what app is flipped??
    text.x = speedoReadout.x - speedoReadout.width * .6   ; // fudge number lol
    text.y = speedoReadout.y ; //+ speedoReadout.height * .55 ;

    odometer.x = SCREEN.SPEEDO_CLUSTER_WIDTH - odometer.width;
    odometer.y = SCREEN.BOTTOM_CONTENT_Y - odometer.gaugeHeight;

    speedoCluster.addChild(speedoSpeed, speedoReadout, text, odometer);

    speedoCluster.name = NAME;
    return [speedoCluster];
  },
  // i think this gets called during theme changes
  refresh: ({ renderables, theme, renderer }) => {
    /** @type {SpeedoReadout} */
    const speedoReadout = renderables[RENDER_KEYS.SPEEDO_READOUT];
    /** @type {SpeedoSweep} */
    const speedoSpeed = renderables[RENDER_KEYS.SPEEDO_SWEEP];
    /** @type {Odometer} */
    const odometer = renderables[RENDER_KEYS.ODOMETER];
    speedoReadout.x = speedoSpeed.width - speedoReadout.width;
    speedoReadout.y = SCREEN.BOTTOM_CONTENT_Y - speedoReadout.height - SCREEN.ODOMETER_READOUT_HEIGHT ;
    odometer.x = SCREEN.SPEEDO_CLUSTER_WIDTH - odometer.width;
    odometer.y = SCREEN.BOTTOM_CONTENT_Y - odometer.gaugeHeight;

    text.tint = theme.gaugeActiveColor;
  },
};

export default speedoClusterControl;
