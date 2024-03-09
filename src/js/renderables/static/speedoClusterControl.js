import * as PIXI from "pixi.js";
import { SCREEN } from "../../appConfig";
import Odometer from "../odometer";
import { RENDER_KEYS } from "../Renderables";
import RPMGauge from "../RPMGauge";
import SpeedoReadout from "../SpeedoReadout";
import SpeedoSweep from "../SpeedoSweep";
import Gear from "../GearReadout";
const NAME = "SpeedoCluster";
const speedoCluster = new PIXI.Container();
/**
 * @type {PIXI.BitmapText}
 */
let mphtext = null;
let odotext = null;
let geartext = null;

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
    /** @type {Gear} */
    const gear = renderables[RENDER_KEYS.GEAR];

    speedoCluster.x = rpmGauge.x + rpmGauge.gaugeWidth * 0.5; // magic fudge mumber
    speedoCluster.y = SCREEN.SPEEDO_CLUSTER_Y;

    speedoReadout.x = speedoSpeed.width - speedoReadout.width;
    speedoReadout.y = SCREEN.BOTTOM_CONTENT_Y - speedoReadout.height - SCREEN.ODOMETER_READOUT_HEIGHT;

    /**
     * @type {PIXI.BitmapText}
     */
    mphtext = new PIXI.BitmapText("MPH", {
      fontName: "Orbitron",
      fontSize: 60,
      align: "left",
    });
    mphtext.tint = theme.gaugeActiveColor;
    mphtext.angle = 180; // no idea what app is flipped??
    mphtext.x = speedoReadout.x - speedoReadout.width * .6   ; // fudge number lol
    mphtext.y = speedoReadout.y ; //+ speedoReadout.height * .55 ;

   

    odometer.x = SCREEN.SPEEDO_CLUSTER_WIDTH - odometer.width;
    odometer.y = SCREEN.BOTTOM_CONTENT_Y - odometer.gaugeHeight;
    /**
   * @type {PIXI.BitmapText}
   */
     odotext = new PIXI.BitmapText("Odometer", {
      fontName: "Orbitron",
      fontSize: 25,
      align: "left",
    });
    odotext.tint = theme.gaugeActiveColor;
    odotext.angle = 180; // no idea what app is flipped??
    odotext.x = odometer.x - odometer.width  * .75  ; // fudge number lol
    odotext.y = odometer.y ; //+ speedoReadout.height * .55 ;
    
    //postion the gear indicator below the MPH label
    gear.x = mphtext.x + gear.width;
    gear.y = mphtext.y + mphtext.height + 20;
    /**
     * @type {PIXI.BitmapText}
     */
    geartext = new PIXI.BitmapText("Gear", {
      fontName: "Orbitron",
      fontSize: 25,
      align: "left",
    });
    geartext.tint = theme.gaugeActiveColor;
    geartext.angle = 180; // no idea what app is flipped??
    geartext.x = gear.x - gear.height * 1.1   ; // fudge number lol
    geartext.y = gear.y ; //+ speedoReadout.height * .55 ;

   





    speedoCluster.addChild(speedoSpeed, speedoReadout, mphtext, odometer, odotext, gear, geartext);

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

    mphtext.tint = theme.gaugeActiveColor;
  },
};

export default speedoClusterControl;
