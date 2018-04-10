/* TODO duplicate */
open StateDataMainType;

open RenderType;

open Js.Typed_array;

let _getBasicMaterialRenderArray = (renderArray, state: StateDataMainType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let execJob = (_, stateData) =>
  MostUtils.callFunc(
    () => {
      let {gameObjectRecord, meshRendererRecord} as state =
        StateDataMainService.unsafeGetState(stateData);
      RecordRenderMainService.getRecord(state).basicRenderObjectRecord =
        state
        |> SetRenderObjectBufferDataMainService.setData(
             state
             |> _getBasicMaterialRenderArray(
                  meshRendererRecord |> RenderArrayMeshRendererService.getRenderArray
                ),
             (
               GetComponentGameObjectService.unsafeGetBasicMaterialComponent,
               ShaderIndexBasicMaterialMainService.getShaderIndex
             ),
             state
             |> RecordRenderMainService.getRecord
             |> RecordBasicRenderObjectMainService.getRecord
           );
      None
    }
  );