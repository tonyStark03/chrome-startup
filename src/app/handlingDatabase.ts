import React from "react";
import { themeSliceProps } from "../features/theme/themeSlice";
import { resolve } from "path";

export const changeImageQualityTo144p = (
    imageData: ArrayBuffer
): Promise<ArrayBuffer | null> => {
    // returns a promise that resolves to the resized image data while maintaining aspect ratio
    return new Promise<ArrayBuffer | null>((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(new Blob([imageData]));
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (ctx === null) {
                resolve(null);
                return;
            }
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
            const newWidth = 256 * aspectRatio;
            const newHeight = 256;
            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            canvas.toBlob(
                (blob) => {
                    if (blob === null) {
                        resolve(null);
                        return;
                    }
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onloadend = () => {
                        const data = reader.result;
                        if (data === null || typeof data === "string") {
                            resolve(null);
                            return;
                        }
                        resolve(data);
                    };
                },
                "image/jpeg",
                0.8
            );
        };
    });
};

export const getFirstFrameOfVideo = (
    videoData: ArrayBuffer
): Promise<ArrayBuffer | null> => {
    return new Promise<ArrayBuffer | null>((resolve, reject) => {
        const videoBlob = new Blob([videoData], { type: "video/mp4" });
        const videoURL = URL.createObjectURL(videoBlob);

        const videoElement = document.createElement("video");
        videoElement.preload = "metadata";

        videoElement.addEventListener("canplaythrough", () => {
            const desiredResolution = { width: 256, height: 144 };

            const aspectRatio =
                videoElement.videoWidth / videoElement.videoHeight;
            const width = desiredResolution.width;
            const height = Math.floor(width / aspectRatio);

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext("2d");
            if (!context) {
                reject("Canvas context is not available.");
                return;
            }

            context.drawImage(videoElement, 0, 0, width, height);

            canvas.toBlob((blob) => {
                URL.revokeObjectURL(videoURL);
                resolve(blob ? blob.arrayBuffer() : null);
            }, "image/jpeg");
        });

        videoElement.src = videoURL;
        videoElement.play();
    });
};

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
        db.createObjectStore("lowResImages", { keyPath: "id" }).createIndex(
            "data",
            "data",
            { unique: true }
        );
    };
    req.onsuccess = () => {
        console.log("Database opened");
    };
};

export const deleteImageFromDatabase = (id: string) => {
    // delete image from database with given id (original image and 144p image)
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("images", "readwrite");
        let store = tx.objectStore("images");
        let reqDelete = store.delete(id);
        reqDelete.onsuccess = () => {
            console.log("Image deleted from DB");
        };
        reqDelete.onerror = () => {
            console.log("Error deleting image from DB");
        };
        let tx2 = db.transaction("lowResImages", "readwrite");
        let store2 = tx2.objectStore("lowResImages");
        let reqDelete2 = store2.delete(id);
        reqDelete2.onsuccess = () => {
            console.log("Image deleted from DB");
        };
        reqDelete2.onerror = () => {
            console.log("Error deleting image from DB");
        };
    };
};

export const deleteVideoFromDatabase = (id: string) => {
    // delete video from database with given id (original video and 144p video)
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("videos", "readwrite");
        let store = tx.objectStore("videos");
        let reqDelete = store.delete(id);
        reqDelete.onsuccess = () => {
            console.log("Video deleted from DB");
        };
        reqDelete.onerror = () => {
            console.log("Error deleting video from DB");
        };
        let tx2 = db.transaction("lowResVideos", "readwrite");
        let store2 = tx2.objectStore("lowResVideos");
        let reqDelete2 = store2.delete(id);
        reqDelete2.onsuccess = () => {
            console.log("Video deleted from DB");
        };
        reqDelete2.onerror = () => {
            console.log("Error deleting video from DB");
        };
    };
};

export const deleteColorFromDatabase = (id: string) => {
    // delete color from database with given id
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("colors", "readwrite");
        let store = tx.objectStore("colors");
        let reqDelete = store.delete(id);
        reqDelete.onsuccess = () => {
            console.log("Color deleted from DB");
        };
        reqDelete.onerror = () => {
            console.log("Error deleting color from DB");
        };
    };
};

export const deleteGradientFromDatabase = (id: string) => {
    // delete gradient from database with given id
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("gradients", "readwrite");
        let store = tx.objectStore("gradients");
        let reqDelete = store.delete(id);
        reqDelete.onsuccess = () => {
            console.log("Gradient deleted from DB");
        };
        reqDelete.onerror = () => {
            console.log("Error deleting gradient from DB");
        };
    };
};

export const addLocalImage144p = (
    id: string,
    imageData: ArrayBuffer | null
) => {
    // add image to database
    let req = indexedDB.open("backgroundData", 1);
    req.onsuccess = () => {
        let db = req.result;
        let tx = db.transaction("lowResImages", "readwrite");
        let store = tx.objectStore("lowResImages");
        let reqAdd = store.put({
            id: id,
            data: imageData,
        });
        reqAdd.onsuccess = () => {
            console.log("Image added to DB");
        };
        reqAdd.onerror = () => {
            console.log("Error adding image to DB");
        };
    };
};

export const getLocalImage144p = (id: string) => {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("lowResImages", "readonly");
            let store = tx.objectStore("lowResImages");
            let reqGet = store.get(id);
            reqGet.onsuccess = () => {
                if (reqGet.result === undefined) {
                    resolve(new ArrayBuffer(0));
                } else {
                    resolve(reqGet.result.data);
                }
            };
        };
    });
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
        reader.onload = async function (event) {
            let binaryData = event.target?.result;
            if (typeof binaryData === "string" || binaryData === undefined) {
                return;
            }
            if (binaryData === null) {
                return;
            }
            // resize image to 144p
            let bd = await changeImageQualityTo144p(binaryData);
            addLocalImage144p(file.name, bd);
            console.log(bd);
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
        reader.onload = async function (event) {
            const binaryData = event.target?.result;
            if (
                binaryData === null ||
                typeof binaryData === "string" ||
                binaryData === undefined
            ) {
                return;
            }
            let image = await getFirstFrameOfVideo(binaryData);
            addLocalImage144p(file.name, image);
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
};

export const addSolidColor = (color: string) => {
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
                reqAdd.onerror = (e) => {
                    console.log("Error adding color to DB");
                    console.log(e);
                };
            } else {
                console.log("Color already exists");
            }
        };
    };
};

export const getSolidColorList = () => {
    return new Promise<IDBValidKey[]>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("colors", "readonly");
            let store = tx.objectStore("colors");
            let reqGet = store.getAllKeys();
            reqGet.onsuccess = () => {
                resolve(reqGet.result);
            };
            reqGet.onerror = () => {
                reject(new Error("Failed to get solid color list"));
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
    return new Promise<IDBValidKey[]>((resolve, reject) => {
        let req = indexedDB.open("backgroundData", 1);
        req.onsuccess = () => {
            let db = req.result;
            let tx = db.transaction("gradients", "readonly");
            let store = tx.objectStore("gradients");
            let reqGet = store.getAllKeys();
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

export const storeThemeInLocalStorage = (theme: themeSliceProps) => {
    let id = "theme";
    let data = JSON.stringify(theme);
    localStorage.setItem(id, data);
};

export const getThemeFromLocalStorage = () => {
    let id = "theme";
    let data = localStorage.getItem(id);
    if (data === null) {
        return undefined;
    }
    return JSON.parse(data) as themeSliceProps;
};
