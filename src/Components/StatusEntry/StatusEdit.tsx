import { StatusCreate } from './StatusCreate'
import { updateStatus } from '../../Actions/post'

export class StatusEdit extends StatusCreate {
  public title: string;
  public actionName: string;
  public description: string;

  constructor (props) {
    super(props)
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
