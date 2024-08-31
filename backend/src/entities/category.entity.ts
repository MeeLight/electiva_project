export class Category{
    private constructor(
        public readonly coocat:         string,
        public readonly descripcion:    string,
    ){}

    static create(props: { [key: string]: any }): Category {
        let { coocat, descripcion } = props;
        return new Category(coocat, descripcion);
    }


}