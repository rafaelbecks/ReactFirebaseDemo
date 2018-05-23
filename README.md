#Dumbledore ReactNative Firebase Demo

Para iniciar este proyecto en Android, **es necesario tener JDK en la última versión y el SDK de Android instalado y configurado**. Además, debe existir una variable en el PATH referenciando al directorio del sdk llamada **ANDROID_HOME**.

Puedes seguir las instrucciones para Ubuntu en el siguiente enlace: https://github.com/uw-it-aca/spacescout-android/wiki/1.-Setting-Up-Android-Studio-on-Ubuntu

Este proyecto es un fork del starter de firebase para react native (https://github.com/invertase/react-native-firebase-starter), para mayor información de configuración e issues, consultar el repositorio original

##Build de proyecto (Android)

    npm install
    npm install -g react-native-cli
    npm run android

Si el comando ``npm run android``` retorna el siguient error:

    unable to load script from assets index.android.bundle

Sustituir el último paso por: 

    npm install run andy
