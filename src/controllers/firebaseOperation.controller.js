import { firebaseDb } from "../db/FireBaseInit.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PastMonthCollection } from "../utils/constants.js";
import { HTTP_STATUS_CODES } from "../utils/ErrorConstant.js";
import { FIREBASE_COLLECTIONS } from "../utils/FireBaseCollectionsConstants.js";
import { generateCsv, generateCsvAndSendMail } from "../utils/Utils.js";


const showAllUser = asyncHandler(async (req, res, next) => {
    try {
        const usersRef = firebaseDb.collection(FIREBASE_COLLECTIONS.USERS);
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
        const usersRef = firebaseDb.collection(FIREBASE_COLLECTIONS.USERS);
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
    const otherServiceDataRef = firebaseDb.collection(FIREBASE_COLLECTIONS.OTHER_SERVICES);
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

    const versionedCollectionRef = firebaseDb.collection(FIREBASE_COLLECTIONS.OTHER_SERVICES).doc(appVersion);
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
    const otherServiceDataRef = firebaseDb.collection(FIREBASE_COLLECTIONS.TOP_QUICK_LINKS)
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

    const versionedCollectionRef = firebaseDb.collection(FIREBASE_COLLECTIONS.TOP_QUICK_LINKS).doc(appVersion);
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

const deletePastYearBudgetData = asyncHandler(async (req, res, next) => {
    try {
        const usersRef = firebaseDb.collection(FIREBASE_COLLECTIONS.USERS);
        const snapshot = await usersRef.get();
        const deleteData = {};

        for (const doc of snapshot.docs) {
            const data = doc.data();
            const userDoc = firebaseDb.collection(FIREBASE_COLLECTIONS.USERS).doc(data.id);

            for (const month of PastMonthCollection) {
                const monthDoc = userDoc.collection("monthly_data").doc(month);
                const monthSnapshot = await monthDoc.get();

                if (monthSnapshot.exists) {
                    deleteData[data.email] = [...(deleteData[data.email] || []), ...(monthSnapshot.data().transactions || [])];
                    monthSnapshot.ref.delete();
                }
            }
        }

        // Generate CSV
        for (const email in deleteData) {
            if(!deleteData[email] || deleteData[email].length === 0) continue;
            if(email == "shivamthakurcool01@gmail.com"){
                generateCsvAndSendMail(deleteData[email], `past_year_data-${email}.csv`, email);
            }
        }

        res.status(200).json({
            success: true,
            message: "All past year budget data have been deleted",
        });
    } catch (error) {
        next(error);
    }
});

export {
    showAllUser,
    deleteAllUserHavingEmptyId,
    getAllOtherServices,
    loadVersionViseOtherServices,
    getAllTopQuickServices,
    loadVersionVisetopQuick,
    deletePastYearBudgetData
};
