// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import {Script} from "forge-std/Script.sol";
import {FreelanceMarketplace} from "../src/MarketPlace.sol";

contract Deploy is Script {
    function run() external returns (FreelanceMarketplace) {
        vm.startBroadcast();
        FreelanceMarketplace freelanceMarketplace = new FreelanceMarketplace();
        vm.stopBroadcast();
        return freelanceMarketplace;
    }
}
