import NotImplementedException from '../notImplementedException.mjs'

export default class ViewFactory {
  createTable(_data) {
    throw new NotImplementedException(this.createTable.name)
  }
}