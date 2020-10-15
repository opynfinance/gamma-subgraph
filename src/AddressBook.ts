import { ProxyCreated } from "../generated/AddressBook/AddressBook"
import { Controller } from "../generated/schema"

import { Controller as ControllerContract } from '../generated/Controller/Controller'

export function handleProxyCreated(event: ProxyCreated): void {
  // proxy contract only created when Controller address is first set
  let controllerEntity = new Controller('1')
  let controllerContract = ControllerContract.bind(event.params.proxy)
  
  controllerEntity.owner = controllerContract.owner()
  controllerEntity.partialPauser = controllerContract.partialPauser()
  controllerEntity.fullPauser = controllerContract.fullPauser()
  controllerEntity.systemFullyPaused = controllerContract.systemFullyPaused()
  controllerEntity.systemPartiallyPaused = controllerContract.systemPartiallyPaused()
  controllerEntity.callRestricted = controllerContract.callRestricted();

  controllerEntity.save()
}