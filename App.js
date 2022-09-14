import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [imagelist,setImagelist]=useState([])
  const [type, setType] = useState(Camera.Constants.Type.back);useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');})();
  }, []);const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
       setImagelist((imagelist)=> [...imagelist , {image :data.uri}]);
       console.log(imagelist)
    }
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const display=()=>{
  }
  return (
   <View style={{ flex: 1, }}>
      <View style={styles.cameraContainer}>
            <Camera
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio}
            type={type}
            ratio={'1:1'} />
      </View>

     <View style={styles.flipScreen}>
      <Button
            title="Flip Screen"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
        </Button>
        </View>
      
      <View style={styles.takePic}>
       <Button title="Take Picture" onPress={() => takePicture()} 
   
       color="#003865"
        />
      
        </View>

        <ScrollView style={styles.scroll}>

       {imagelist.map ((img) =>(
  <Image style={{height: 150, width: 150,   shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation:5,
    float:'right',
    marginLeft:20,
    marginTop: 5 ,
    display: 'flex',
      flexDirection: 'row',
}} source={{ uri:img.image }} />
       ))}

       </ScrollView>

 </View>
  );
}
const styles = StyleSheet.create({

  ImageContainer: {
   marginHorizontal: 16,
   marginTop: 30,
   width: "100%",
   justifyContent:'center',
   alignItems:'center',
 },

 scroll:{
   height: '18%',
   wight: '100%'

 },

 takePic: {
   paddingBottom: 20,
   width: 140,
     justifyContent:'center',
   alignSelf:'center',
  
 },

  flipScreen: {
   paddingBottom: 20,
   width: 140,
     justifyContent:'center',
   alignSelf:'center',
 },


 pic:{ 
   width:80,
   height:80,
 },

 Image: {
   shadowColor: "black",
   shadowOffset: {
     width: -10,
     height: 9,
   },
   shadowOpacity: 0.5,
   shadowRadius: 2,
   elevation:5
 },
  cameraContainer: {
      flex: 1,
      flexDirection: 'row',
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  }
})