document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;

    if (files.length > 0) {
        const gallery = document.getElementById('gallery');
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const mediaElement = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
                mediaElement.src = e.target.result;
                mediaElement.controls = true;
                gallery.appendChild(mediaElement);
            };
            reader.readAsDataURL(file);
        });

        fileInput.value = ''; // Réinitialiser le champ de fichier
    }
});
// Import des modules Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Configuration de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Ajout des fonctionnalités d'authentification et de stockage

document.getElementById('signup-button').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Inscription réussie:', userCredential.user);
        })
        .catch((error) => {
            console.error('Erreur lors de l\'inscription:', error);
        });
});

document.getElementById('login-button').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Connexion réussie:', userCredential.user);
        })
        .catch((error) => {
            console.error('Erreur lors de la connexion:', error);
        });
});
document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;

    if (files.length > 0) {
        Array.from(files).forEach(file => {
            const storageRef = ref(storage, 'media/' + file.name);
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Fichier téléchargé:', snapshot);
                getDownloadURL(snapshot.ref).then((url) => {
                    const mediaElement = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
                    mediaElement.src = url;
                    mediaElement.controls = true;
                    document.getElementById('gallery').appendChild(mediaElement);
                });
            });
        });

        fileInput.value = ''; // Réinitialiser le champ de fichier
    }
});
