import React from "react";
export const createDatabase = () => {
    // database to store images
    let req = indexedDB.open("backgroundData", 1);
    req.onerror = () => {
        console.log("Error opening database");
    };
    req.onupgradeneeded = () => {
        let db = req.result;
        db.createObjectStore("images", { keyPath: "id" }).createIndex(
            "data",
            "data",
            { unique: true }
        );
        db.createObjectStore("colors", { keyPath: "id" }).createIndex(
            "data",
            "data",
            { unique: true }
        );
        db.createObjectStore("gradients", { keyPath: "id" }).createIndex(
            "data",
            "data",
            { unique: true }
        );
        db.createObjectStore("videos", { keyPath: "id" }).createIndex(
            "data",
            "data",
            { unique: true }
        );
    };
    req.onsuccess = () => {
        console.log("Database opened");
    };
};

export const addLocalImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
        event === null ||
        event.target === null ||
        event.target.files === null
    ) {
        return;
    }
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (event) {
            const binaryData = event.target?.result;
            if (binaryData === null) {
                return;
            }
            let req = indexedDB.open("backgroundData", 1);
            req.onsuccess = () => {
                let db = req.result;
                let tx = db.transaction("images", "readwrite");
                let store = tx.objectStore("images");
                // check if image already exists
                let reqGet = store.get(file.name);
                reqGet.onsuccess = () => {
                    if (reqGet.result === undefined) {
                        console.log("Image does not exist");
                        // add image to database
                        let reqAdd = store.put({
                            id: file.name,
                            data: binaryData,
                        });
                        reqAdd.onsuccess = () => {
                            console.log("Image added to DB");
                        };
                        reqAdd.onerror = () => {
                            console.log("Error adding image to DB");
                        };
                    } else {
                        console.log("Image already exists");
                    }
                };
            };
        };
        reader.readAsArrayBuffer(file);
    }
};

export const getLocalImageList = () => {
    return new Promise<IDBValidKey[]>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("images", "readonly");
            let store = tx.objectStore("images");
            let reqGet = store.getAllKeys(); // Retrieve only the keys (IDs)
            reqGet.onsuccess = () => {
                resolve(reqGet.result);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get local image list"));
            };
        };
        req.onerror = () => {
            reject(new Error("Failed to open indexedDB"));
        };
    });
};

export const getLocalImage = (id: IDBValidKey) => {
    return new Promise<ArrayBuffer | null>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("images", "readonly");
            let store = tx.objectStore("images");
            let reqGet = store.get(id);
            reqGet.onsuccess = () => {
                resolve(reqGet.result?.data);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get local image"));
            };
        };
        req.onerror = () => {
            reject(new Error("Failed to open indexedDB"));
        };
    });
};

export const addColor = (color: string) => {
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("colors", "readwrite");
        let store = tx.objectStore("colors");
        // check if color already exists
        let reqGet = store.get(color);
        reqGet.onsuccess = () => {
            if (reqGet.result === undefined) {
                console.log("Color does not exist");
                // add color to database
                let reqAdd = store.put({
                    id: color,
                    data: color,
                });
                reqAdd.onsuccess = () => {
                    console.log("Color added to DB");
                };
                reqAdd.onerror = () => {
                    console.log("Error adding color to DB");
                };
            } else {
                console.log("Color already exists");
            }
        };
    };
};

export const getColorList = () => {
    return new Promise((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("colors", "readonly");
            let store = tx.objectStore("colors");
            let reqGet = store.getAll();
            reqGet.onsuccess = () => {
                resolve(reqGet.result);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get color list"));
            };
        };
        req.onerror = () => {
            reject(new Error("Failed to open indexedDB"));
        };
    });
};

export const addGradient = (gradient: string) => {
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("gradients", "readwrite");
        let store = tx.objectStore("gradients");
        // check if gradient already exists
        let reqGet = store.get(gradient);
        reqGet.onsuccess = () => {
            if (reqGet.result === undefined) {
                console.log("Gradient does not exist");
                // add gradient to database
                let reqAdd = store.put({
                    id: gradient,
                    data: gradient,
                });
                reqAdd.onsuccess = () => {
                    console.log("Gradient added to DB");
                };
                reqAdd.onerror = () => {
                    console.log("Error adding gradient to DB");
                };
            } else {
                console.log("Gradient already exists");
            }
        };
    };
};

export const getGradientList = () => {
    return new Promise((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("gradients", "readonly");
            let store = tx.objectStore("gradients");
            let reqGet = store.getAll();
            reqGet.onsuccess = () => {
                resolve(reqGet.result);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get gradient list"));
            };
        };
        req.onerror = () => {
            reject(new Error("Failed to open indexedDB"));
        };
    });
};

export const addLocalVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
        event === null ||
        event.target === null ||
        event.target.files === null
    ) {
        return;
    }
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (event) {
            const binaryData = event.target?.result;
            if (binaryData === null) {
                return;
            }
            let req = indexedDB.open("backgroundData", 1);
            req.onsuccess = () => {
                let db = req.result;
                let tx = db.transaction("videos", "readwrite");
                let store = tx.objectStore("videos");
                // check if video already exists
                let reqGet = store.get(file.name);
                reqGet.onsuccess = () => {
                    if (reqGet.result === undefined) {
                        console.log("Video does not exist");
                        // add video to database
                        let reqAdd = store.put({
                            id: file.name,
                            data: binaryData,
                        });
                        reqAdd.onsuccess = () => {
                            console.log("Video added to DB");
                        };
                        reqAdd.onerror = () => {
                            console.log("Error adding video to DB");
                        };
                    } else {
                        console.log("Video already exists");
                    }
                };
            };
        };
        reader.readAsArrayBuffer(file);
    }
};

export const getLocalVideoList = () => {
    return new Promise<IDBValidKey[]>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("videos", "readonly");
            let store = tx.objectStore("videos");
            let reqGet = store.getAllKeys();
            reqGet.onsuccess = () => {
                resolve(reqGet.result);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get local video list"));
            };
        };
        req.onerror = () => {
            reject(new Error("Failed to open indexedDB"));
        };
    });
};

export const getLocalVideo = (id: IDBValidKey) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("videos", "readonly");
            let store = tx.objectStore("videos");
            let reqGet = store.get(id);
            reqGet.onsuccess = () => {
                resolve(reqGet.result?.data);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get local video"));
            };
        };
        req.onerror = () => {
            reject(new Error("Failed to open indexedDB"));
        };
    });
}
