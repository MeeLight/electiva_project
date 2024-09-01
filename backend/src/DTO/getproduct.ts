export class GetProduct {
  private constructor(
    public readonly coocat?: string,
    public readonly codigo?: string
  ) {}

  static create(props: { [key: string]: any }): GetProduct {
    let { coocat, codigo } = props
    return new GetProduct(coocat, codigo)
  }
}
