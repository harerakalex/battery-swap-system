export default class BatterySwapSystem {
  constructor(conversionRate) {
    this.batteries = [];
    this.drivers = [];
    this.stations = [];
    this.conversionRate = conversionRate;
  }

  swapBattery(energyUsed) {
    const cost = energyUsed * this.conversionRate;

    console.log(`Cost: $${cost}.`);
  }
}
