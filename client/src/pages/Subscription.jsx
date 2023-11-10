import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { 
    ADD_SUBSCRIPTION, 
    REMOVE_SUBSCRIPTION 
} from "../utils/actions";

import { idbPromise } from "../utils/helpers";

function SubscriptionPage() {

    const [state, dispatch] = useStoreContext(); // get the current global state object and the dispatch method from the useStoreContext() custom React Hook.

    const { id } = useParams(); // get the id from the url

    const [currentSubscription, setCurrentSubscription] = useState({}); // local state to hold subscription data to display
    const [loading, setLoading] = useState(true); // loading state for button

    useEffect(() => {

        if (id) {
            const loadSubscription = async () => {
                try {

                    const result = await idbPromise('get', { _id: id }); // get subscription from idb
                    setCurrentSubscription(result); // set subscription to state
                } catch (error) {
                        console.error("Error loading subscription from IndexedDB", error);
                } finally {
                        setLoading(false); // set loading to false
                }
            };

            loadSubscription();
        }
    }, [id]);

    const addSubscriptionToCart = () => {
        dispatch({
            type: ADD_SUBSCRIPTION,
            subscription: currentSubscription,
        });
        idbPromise('put', currentSubscription);
    };

    const removeSubscriptionFromCart = () => {
        dispatch({
            type: REMOVE_SUBSCRIPTION,
            _id: currentSubscription._id,
        });
        idbPromise('delete', { _id: currentSubscription._id});
    }

    if (loading) return <p>Laoding subscription...</p>;

    return (
        <div>
            <h2>{currentSubscription.name}</h2>
            <p>{currentSubscription.description}</p>
            <p>Price: ${currentSubscription.price}</p>
            <button onClick={addSubscriptionToCart}>Add to Cart</button>
            <button onClick={removeSubscriptionFromCart}>Remove from Cart</button>
        </div>
    );
}

export default SubscriptionPage;