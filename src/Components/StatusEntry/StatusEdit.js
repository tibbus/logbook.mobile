import { StatusCreate } from './StatusCreate'
import { updateStatus } from '../../Actions/status'

export class StatusEdit extends StatusCreate {

  constructor () {
    super(...arguments)
    this.title = 'Edit Status'
    this.actionName = 'Save'
  }

  doStatusAction () {
    const { carInfoId, statusId, dispatch } = this.props
    dispatch(updateStatus(
      statusId,
      carInfoId,
      { description: this.description }
    ))
  }

}
