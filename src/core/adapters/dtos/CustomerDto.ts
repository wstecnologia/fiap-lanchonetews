export type InputCustomerDto = {
  cpf: string
  name: string
  email: string
}

export interface OutputCustomerDto {
  id: string
  cpf: string
  email: string
  name: string
}
