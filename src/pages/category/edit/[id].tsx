import { useRouter } from "next/router";

const EditCategory = () => {
    const router = useRouter()

    console.log(router.query.id)

    return <div>Edit Category</div>;
}

export default EditCategory;
