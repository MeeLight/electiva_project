export class GetCategory {
  private constructor(
    public readonly coocat?: string,
    public readonly descripcion?: string
  ) {}

  static create(props: { [key: string]: any }): GetCategory {
    let { coocat, descripcion } = props
    return new GetCategory(coocat, descripcion)
  }
}
