import Role from "./Role";

export default class Block extends Role {
  constructor(path) {
    super(path)
    this.width = 50
    this.height = 20
  }
}
