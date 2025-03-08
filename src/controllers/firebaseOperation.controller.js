import { firebaseDb } from "../db/FireBaseInit.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";

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

const getAllOtherServices = asyncHandler(async (req, res, next) => {
    const otherServiceDataRef = firebaseDb.collection('otherServices');
    const snapshot = await otherServiceDataRef.get();
    const otherServices = [];
    
    snapshot.forEach((doc) => {
        otherServices.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({
        success: true,
        otherServices,
    });
});

const loadVersionViseOtherServices = asyncHandler(async (req, res, next) => {

    const {appVersion, services} = req.body

    const versionedCollectionRef = firebaseDb.collection('other-services').doc(appVersion);
    const versionSnapshot = await versionedCollectionRef.get();
    if(!versionSnapshot.exists){
        await versionedCollectionRef.set({
            services: services
        })
    }else{
        await versionedCollectionRef.update({
            services: services
        })
    }

    res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, {message: "Data loaded successfully"}))

})

const getAllTopQuickServices = asyncHandler(async (req, res, next) => {
    const otherServiceDataRef = firebaseDb.collection('top_quick_links')
    const snapshot = await otherServiceDataRef.get();
    const otherServices = [];
    
    snapshot.forEach((doc) => {
        otherServices.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({
        success: true,
        otherServices,
    });
});

const loadVersionVisetopQuick = asyncHandler(async (req, res, next) => {

    const {appVersion, services} = req.body

    const versionedCollectionRef = firebaseDb.collection('top_quick_links').doc(appVersion);
    const versionSnapshot = await versionedCollectionRef.get();
    if(!versionSnapshot.exists){
        await versionedCollectionRef.set({
            services: services
        })
    }else{
        await versionedCollectionRef.update({
            services: services
        })
    }

    res.status(HTTP_STATUS_CODES.OK).json(new ApiResponse(HTTP_STATUS_CODES.OK, {message: "Data loaded successfully"}))

})


export {
    showAllUser,
    deleteAllUserHavingEmptyId,
    getAllOtherServices,
    loadVersionViseOtherServices,
    getAllTopQuickServices,
    loadVersionVisetopQuick
};
