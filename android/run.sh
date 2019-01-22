#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.akshayeanithapradeep.humanrobotteamobserverapp/host.exp.exponent.MainActivity
