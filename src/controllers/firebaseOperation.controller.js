import { firebaseDb } from "../db/FireBaseInit.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const collectionName = "users";

const showAllUser = asyncHandler(async (req, res, next) => {
    try {
        const usersRef = firebaseDb.collection(collectionName);
        const snapshot = await usersRef.get();

        const users = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // Check the isempty query parameter
            if (req.query.isempty === "true") {
                // Only include users with empty id or email
                if (!data.id || !data.email) {
                    users.push({ id: doc.id, ...data });
                }
            } else {
                // Include all users
                users.push({ id: doc.id, ...data });
            }
        });

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
});

const deleteAllUserHavingEmptyId = asyncHandler(async (req, res, next) => {
    try {
        const usersRef = firebaseDb.collection(collectionName);
        const snapshot = await usersRef.get();
        
        const batch = firebaseDb.batch();
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (!data.id || !data.email) {
                batch.delete(doc.ref);
            }
        });

        await batch.commit();

        res.status(200).json({
            success: true,
            message: "All users with empty ID or email have been deleted",
        });
    } catch (error) {
        next(error);
    }
});


export {
    showAllUser,
    deleteAllUserHavingEmptyId
};
