export class GetProduct {
  private constructor(
    public readonly codcat?: string,
    public readonly codigo?: string
  ) {}

  static create(props: { [key: string]: any }): GetProduct {
    let { codcat, codigo } = props
    return new GetProduct(codcat, codigo)
  }
}
