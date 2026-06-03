export interface CategoryProps {
    id: string
    name: string
    slug: string
}

export class Category {
    readonly id: string
    readonly name: string
    readonly slug: string

    constructor(props: CategoryProps) {
        this.id = props.id
        this.name = props.name
        this.slug = props.slug
    }
}
