// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Contract$WonderLog               from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs            from "../../atom/ArrayService.js";
import * as MainStateData$Wonderjs           from "../../state/main/data/MainStateData.js";
import * as IsDebugMainService$Wonderjs      from "../../state/main/state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib     from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DisposeComponentService$Wonderjs from "../../primitiive/component/DisposeComponentService.js";

function isAlive(cameraView, param) {
  return DisposeComponentService$Wonderjs.isAlive(cameraView, param[/* disposedIndexArray */2]);
}

function _disposeData(cameraView, record) {
  return /* record */[
          /* index */record[/* index */0],
          /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(cameraView, record[/* gameObjectMap */1]),
          /* disposedIndexArray */record[/* disposedIndexArray */2]
        ];
}

function handleDisposeComponent(cameraView, record) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAlive(cameraView, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return _disposeData(cameraView, /* record */[
              /* index */record[/* index */0],
              /* gameObjectMap */record[/* gameObjectMap */1],
              /* disposedIndexArray */ArrayService$Wonderjs.push(cameraView, record[/* disposedIndexArray */2])
            ]);
}

function handleBatchDisposeComponent(cameraViewArray, _, record) {
  Contract$WonderLog.requireCheck((function () {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(cameraViewArray, isAlive, record);
        }), IsDebugMainService$Wonderjs.getIsDebug(MainStateData$Wonderjs.stateData));
  return ArrayService$WonderCommonlib.reduceOneParam((function (record, cameraView) {
                return _disposeData(cameraView, record);
              }), /* record */[
              /* index */record[/* index */0],
              /* gameObjectMap */record[/* gameObjectMap */1],
              /* disposedIndexArray */record[/* disposedIndexArray */2].concat(cameraViewArray)
            ], cameraViewArray);
}

export {
  isAlive                     ,
  _disposeData                ,
  handleDisposeComponent      ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */