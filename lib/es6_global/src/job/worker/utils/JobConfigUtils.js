// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as Caml_array                from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as JobConfigService$Wonderjs from "../../../service/primitive/JobConfigService.js";

function getOperateType(flags) {
  return Caml_array.caml_array_get(JobConfigService$Wonderjs.unsafeGetFlags(flags), 0);
}

export {
  getOperateType ,
  
}
/* JobConfigService-Wonderjs Not a pure module */