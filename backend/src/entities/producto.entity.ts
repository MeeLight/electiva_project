export class Product{
    private constructor(
        public readonly codigo:         string,
        public readonly nombre:         string,
        public readonly descripcion:         string,
        public readonly cantidad:         number,
        public readonly stockmax:         number,
        public readonly stockmin:         number,
        public readonly precio:         number,
        public readonly codcat:         string,
    ){}

    static create(props: { [key: string]: any }): Product {
        let { codigo,nombre,descripcion,cantidad,stockmax, stockmin,precio,codcat } = props;
        return new Product(codigo,nombre,descripcion,cantidad,stockmax, stockmin,precio,codcat);
    }


}
