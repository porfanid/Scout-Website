/**
 * Google Drive API integration utility
 * Provides functionality to authenticate with Google Drive and select files
 */

// Google Drive API configuration - handle both Vite and test environments
const getEnvVar = (key) => {
    // In Jest/Node environment
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key];
    }
    // In Vite/browser environment  
    if (typeof window !== 'undefined' && window.__ENV) {
        return window.__ENV[key];
    }
    // Fallback for test mocking
    if (typeof global !== 'undefined' && global.__meta && global.__meta.env) {
        return global.__meta.env[key];
    }
    // Default (this will be replaced by Vite at build time)
    try {
        return import.meta.env[key];
    } catch {
        return undefined;
    }
};

const GOOGLE_DRIVE_API_KEY = getEnvVar('VITE_GOOGLE_DRIVE_API_KEY');
const GOOGLE_DRIVE_CLIENT_ID = getEnvVar('VITE_GOOGLE_DRIVE_CLIENT_ID');
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';

let isGoogleAPILoaded = false;
let isGoogleAPIInitialized = false;

/**
 * Load Google API script
 */
export const loadGoogleAPI = () => {
    return new Promise((resolve, reject) => {
        if (isGoogleAPILoaded) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            isGoogleAPILoaded = true;
            resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
    });
};

/**
 * Initialize Google API
 */
export const initializeGoogleAPI = async () => {
    if (isGoogleAPIInitialized) {
        return;
    }

    if (!GOOGLE_DRIVE_API_KEY || !GOOGLE_DRIVE_CLIENT_ID) {
        throw new Error('Google Drive API credentials not configured');
    }

    await loadGoogleAPI();
    
    return new Promise((resolve, reject) => {
        window.gapi.load('auth2:picker', async () => {
            try {
                await window.gapi.client.init({
                    apiKey: GOOGLE_DRIVE_API_KEY,
                    clientId: GOOGLE_DRIVE_CLIENT_ID,
                    discoveryDocs: [DISCOVERY_DOC],
                    scope: SCOPES
                });
                isGoogleAPIInitialized = true;
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
};

/**
 * Check if user is signed in to Google
 */
export const isUserSignedIn = () => {
    if (!isGoogleAPIInitialized) {
        return false;
    }
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
};

/**
 * Sign in to Google
 */
export const signInToGoogle = async () => {
    if (!isGoogleAPIInitialized) {
        await initializeGoogleAPI();
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
    }
};

/**
 * Open Google Drive file picker
 */
export const openDrivePicker = () => {
    return new Promise((resolve, reject) => {
        if (!isGoogleAPIInitialized) {
            reject(new Error('Google API not initialized'));
            return;
        }

        const accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        
        const picker = new window.google.picker.PickerBuilder()
            .addView(window.google.picker.ViewId.DOCS)
            .setOAuthToken(accessToken)
            .setDeveloperKey(GOOGLE_DRIVE_API_KEY)
            .setCallback((data) => {
                if (data.action === window.google.picker.Action.PICKED) {
                    const files = data.docs.map(doc => ({
                        id: doc.id,
                        name: doc.name,
                        mimeType: doc.mimeType,
                        url: doc.url,
                        downloadUrl: `https://drive.google.com/uc?id=${doc.id}&export=download`,
                        viewUrl: doc.url,
                        size: doc.sizeBytes,
                        thumbnailUrl: doc.iconUrl
                    }));
                    resolve(files);
                } else if (data.action === window.google.picker.Action.CANCEL) {
                    resolve([]);
                } else {
                    reject(new Error('Picker error'));
                }
            })
            .build();
            
        picker.setVisible(true);
    });
};

/**
 * Get file metadata from Google Drive
 */
export const getFileMetadata = async (fileId) => {
    if (!isGoogleAPIInitialized) {
        throw new Error('Google API not initialized');
    }

    try {
        const response = await window.gapi.client.drive.files.get({
            fileId: fileId,
            fields: 'id,name,mimeType,size,webViewLink,webContentLink,thumbnailLink'
        });
        return response.result;
    } catch (error) {
        throw new Error(`Failed to get file metadata: ${error.message}`);
    }
};