open StateDataRenderWorkerType;

let execJob = (_, e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let viewportData = data##viewportData;
    state.deviceManagerRecord =
      state.deviceManagerRecord
      |> DeviceManagerService.setViewportOfGl(
           DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
           viewportData,
         );
    StateRenderWorkerService.setState(stateData, state);
    e;
  });