import AppErrors from "../error/AppErrors"
import ErrosMessage from "../error/ErrosMessage"

export default class Cpf {
  value: string
  constructor(readonly cpf: string) {
    this.value = this.validate(cpf)
  }

  private validate(cpf: string): string {
    const strCpf = cpf.replace(/\D/g, "")

    if (strCpf.length !== 11) {
      throw new AppErrors(ErrosMessage.NUMBER_OF_CPF_MUST_CONTAIN_DIGITS)
    }

    if (!strCpf.toString().trim()) {
      throw new AppErrors(ErrosMessage.ENTER_VALID_NUMBER)
    }
    return strCpf.trim()
  }
}
