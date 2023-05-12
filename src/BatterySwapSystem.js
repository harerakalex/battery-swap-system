class Battery {
  /**
   * Represents a battery.
   * @param {string} id - The ID of the battery.
   * @param {number} energyLevel - The energy level of the battery.
   */
  constructor(id, energyLevel = 0) {
    this.id = id;
    this.energyLevel = energyLevel;
    this.driverId = null;
    this.stationId = null;
  }

  /**
   * Assigns the battery to a driver and station.
   * @param {string} driverId - The ID of the driver.
   * @param {string} stationId - The ID of the station.
   */
  assignToDriver(driverId, stationId) {
    this.driverId = driverId;
    this.stationId = stationId;
  }

  /**
   * Updates the energy level of the battery.
   * @param {number} energyUsed - The amount of energy used.
   */
  updateEnergyLevel(energyUsed) {
    this.energyLevel -= energyUsed;
  }
}

class Driver {
  /**
   * Represents a driver.
   * @param {string} id - The ID of the driver.
   * @param {string} name - The name of the driver.
   */
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.totalEnergyConsumed = 0;
    this.totalTheoreticalEnergyConsumed = 0;
    this.distanceTraveled = 0;
  }

  /**
   * Updates the total energy consumed by the driver.
   * @param {number} energy - The energy consumed.
   */
  updateEnergyConsumed(energy) {
    this.totalEnergyConsumed += energy;
  }

  /**
   * Updates the total theoretical energy consumed by the driver.
   * @param {number} energy - The theoretical energy consumed.
   */
  updateTheoreticalEnergyConsumed(energy) {
    this.totalTheoreticalEnergyConsumed += energy;
  }

  /**
   * Updates the distance traveled by the driver.
   * @param {number} distance - The distance traveled.
   */
  updateDistanceTraveled(distance) {
    this.distanceTraveled += distance;
  }
}

class Station {
  /**
   * Represents a station.
   * @param {string} id - The ID of the station.
   * @param {number} swapCapacity - The swap capacity of the station.
   */
  constructor(id, swapCapacity) {
    this.id = id;
    this.swapCapacity = swapCapacity;
  }
}

export default class BatterySwapSystem {
  /**
   * Represents a battery swap system.
   * @param {number} conversionRate - The conversion rate from energy units to dollars.
   */
  constructor(conversionRate = 0.1) {
    this.batteries = [];
    this.drivers = [];
    this.stations = [];
    this.conversionRate = conversionRate;
  }

  /**
   * Adds a new battery to the system.
   * @param {string} id - The ID of the battery.
   * @param {number} energyLevel - The energy level of the battery.
   */
  addBattery(id, energyLevel) {
    const battery = new Battery(id, energyLevel);
    this.batteries.push(battery);
  }

  /**
   * Adds a new driver to the system.
   * @param {string} id - The ID of the driver.
   * @param {string} name - The name of the driver.
   */
  addDriver(id, name) {
    const driver = new Driver(id, name);
    this.drivers.push(driver);
  }

  /**
   * Adds a new station to the system.
   * @param {string} id - The ID of the station.
   * @param {number} swapCapacity - The swap capacity of the station.
   */
  addStation(id, name) {
    const station = new Station(id, name);
    this.stations.push(station);
  }

  /**
   * Swaps a battery for a driver at a station.
   * @param {string} batteryId - The ID of the battery.
   * @param {string} driverId - The ID of the driver.
   * @param {string} stationId - The ID of the station.
   * @param {number} energyUsed - The amount of energy used.
   * @param {number} distanceTraveled - The distance traveled.
   * @returns {string} - A message indicating the swap details.
   */
  swapBattery(batteryId, driverId, stationId, energyUsed, distanceTraveled) {
    const battery = this.batteries.find((battery) => battery.id === batteryId);
    const driver = this.drivers.find((driver) => driver.id === driverId);
    const station = this.stations.find((station) => station.id === stationId);

    if (!battery || !driver || !station) {
      throw new Error('Invalid battery, driver, or station!');
    }

    battery.updateEnergyLevel(energyUsed);
    battery.assignToDriver(driverId, stationId);

    const cost = energyUsed * this.conversionRate;

    driver.updateEnergyConsumed(energyUsed);
    driver.updateTheoreticalEnergyConsumed(battery.energyLevel);
    driver.updateDistanceTraveled(distanceTraveled);

    const message = `
      Battery ${batteryId} swapped by Driver ${driver.name} at Station ${stationId}.
      Energy used: ${energyUsed} kWh.
      Distance traveled: ${driver.distanceTraveled}.
      Cost: $${cost}.
    `;
    console.log(message);

    return message;
  }
}
