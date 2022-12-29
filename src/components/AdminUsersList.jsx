import { useAuthStore } from "../hooks/useAuthStore"

export const AdminUsersList = () => {

    const { startGetUser, usuarios } = useAuthStore()

    const deleteUser = () => {
        console.log('asd')
    }

    return (
        <ol className="list-group list-group m-4">
            <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    Content for list item
                </div>
                <span type='button' className="badge bg-danger rounded-pill p-2" title="Eliminar" onClick={deleteUser}><i className="bi bi-trash-fill"></i></span>
            </li>
        </ol>
    )
}
