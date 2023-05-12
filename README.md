# battery-swap-system
Electric motorcycles come to swap stations and they have their depleted batteries swapped out with charged batteries.

## Architecture design
The project's code implements a simplified version of a Battery Swap System. It follows a basic `object-oriented architecture design`.

Reason to use this appraoch is that it allows to decompose a problem into a collection of independent objects. For example the code defines several classes to represent different entities in the system: `Battery, Driver, Station and BatterySwapSystem`.

BatterySwapSystem acts as the central component of the system, managing batteries, drivers, and stations. It provides methods to add batteries, drivers, and stations, as well as perform battery swaps and optimize battery quantities at stations.

## Development
1. Clone this repository

2. Install dependencies
`yarn install`

3. Development
`yarn run watch`
Runs a dev server with autoreload.

4. Prod build
`yarn run build`
populates code to `dist/`.

## BatterySwapSystem
Swaps a battery for a driver at a station.
### Sample usage of `BatterySwapSystem`
```
<script src="../../dist/BatterySwapSystem.js"></script>
<script>
  const batterySwapSystem = new BatterySwapSystem(0.1);

  batterySwapSystem.addBattery("B1", 100);

  batterySwapSystem.addDriver("D1", "John");

  batterySwapSystem.addStation("StationA", 5);

  const swap = batterySwapSystem.swapBattery("B1", "D1", "StationA", 20, 10);
</script>
```
The output of the above code will be `Battery B1 swapped by Driver John at Station StationA. Energy used: 20 kWh. Distance traveled: 10. Cost: $2.`

## Unhandled logics/unanswered questions by coding
### How would you calculate the distance travelled by each driver?
To calculate the distance traveled by each driver, I would need additional information such as the location data from the telematics devices on the electric motorcycles. Without that data, it is not possible to accurately determine the distance traveled.

### What's a good way to predict and optimize for how many batteries should be at a given station?
To predict and optimize the number of batteries at a given station, we can consider the following factors:

1. Demand: Analyze historical data or forecast the demand for battery swaps at each station. Consider factors such as the number of drivers, their travel patterns, and the frequency of battery swaps. This analysis will give us an estimate of how many swaps a station is likely to handle within a specific time period.

2. Battery Life and Charging Time: Consider the battery life and charging time of the batteries used in the system. If the batteries have a short lifespan or take a long time to charge, we may need to have more batteries available at the station to accommodate the demand.

3. Swap Capacity: Each station has a swap capacity, which determines the maximum number of battery swaps it can handle simultaneously. Consider the swap capacity of the stations and ensure that it aligns with the expected demand. If the swap capacity is insufficient, drivers may experience delays or be unable to swap their batteries, leading to dissatisfaction.

4. Geographical Distribution: Analyze the geographical distribution of drivers and stations. If certain areas have a higher concentration of drivers or experience more battery swaps, we may need to allocate more batteries to stations in those areas to meet the demand.

5. Optimization Algorithms: We can employ optimization algorithms to determine the optimal number of batteries at each station. These algorithms take into account factors such as demand patterns, battery life, swap capacity, and geographical distribution to optimize the allocation of batteries. Various optimization techniques, such as mathematical modeling, simulation, or machine learning algorithms, can be utilized to solve this problem.

By considering these factors and utilizing optimization techniques, we can predict and optimize the number of batteries at each station, ensuring efficient and effective battery swap operations while meeting the drivers' needs.

## Examples
See the [examples](/examples/).
