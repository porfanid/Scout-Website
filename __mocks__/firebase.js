export const functions = {
    httpsCallable: () => () => Promise.resolve(),
};

export const getAuth = () => ({
    currentUser: null,
});


export const getFirestore = () => Promise.resolve();
export const getAnalytics = () => Promise.resolve();
export const initializeApp = () => Promise.resolve();
