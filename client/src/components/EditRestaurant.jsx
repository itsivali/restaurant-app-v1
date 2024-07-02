import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchRestaurantById, updateRestaurant } from "../api";

function EditRestaurant() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const history = useHistory();

    useEffect(() => {
        async function loadRestaurant() {
            try {
                const data = await fetchRestaurantById(id);
                setRestaurant(data);
                setName(data.name);
                setAddress(data.address);
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            }
        }
        loadRestaurant();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await updateRestaurant(id, { name, address });
            history.push(`/restaurants/${id}`);
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    }

    if (!restaurant) return <p>Loading...</p>;

    return (
        <div className="card">
            <h1>Edit Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>
                </div>
                <div>
                    <label>
                        Address:
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Update Restaurant</button>
            </form>
        </div>
    );
}

export default EditRestaurant;
