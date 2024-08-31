export class Product{
    private constructor(
        public readonly codigo:         string,
        public readonly nombre:         string,
        public readonly descripcion:         string,
        public readonly cantidad:         number,
        public readonly stockmax:         number,
        public readonly srockmin:         number,
        public readonly precio:         number,
        public readonly coocat:         string,
    ){}

    static create(props: { [key: string]: any }): Product {
        let { codigo,nombre,descripcion,cantidad,stockmax, srockmin,precio,coocat } = props;
        return new Product(codigo,nombre,descripcion,cantidad,stockmax, srockmin,precio,coocat);
    }


}